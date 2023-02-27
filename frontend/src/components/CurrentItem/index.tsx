import { Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';

import { API_URL, SSE_STREAM } from '../../constants/api';
import { additionalTypes } from '../../constants/base';
import { useOwner } from '../../hooks/useOwner';
import { useGetItemCommentsQuery } from '../../redux/api/comment';
import { useDeleteItemMutation, useGetOneItemQuery } from '../../redux/api/item';
import { ModalTypes } from '../../types/base';
import { IComment } from '../../types/comment';
import { IItem } from '../../types/item';
import { ILike } from '../../types/like';
import { AdditionalFieldPluralKeys, extractIds, revertFieldName } from '../../utils/helpers';
import { getItemAdditionalField } from '../../utils/mappers';
import { CommentsSection } from '../CommentsSection';
import { ConfirmationModal } from '../ConfirmationModal';
import { CreateItemPopup } from '../CreateItemPopup';
import { itemsAdditionalFieldViews } from '../ItemAdditionalViews';
import { LikesSection } from '../LikesSection';

import { ItemRow, Wrapper } from './styled';

export const CurrentItem = () => {
  const { pathname, state } = useLocation();
  const { t } = useTranslation();
  const [collectionId, itemId] = extractIds(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState<ModalTypes>();
  const [title, setTitle] = useState('');

  const [likesCount, setLikesCount] = useState(0);
  const [currentLikeId, setCurrentLikeId] = useState(-1);

  const [commentsData, setCommentsData] = useState<IComment[]>([]);
  const { data: comments } = useGetItemCommentsQuery([collectionId, itemId]);
  const isOwner = useOwner(state?.userId);

  useEffect(() => {
    if (comments) {
      setCommentsData(comments);
    }
  }, [comments]);

  const navigate = useNavigate();

  const { data, isLoading } = useGetOneItemQuery([collectionId, itemId]);
  const [deleteItem, { isSuccess, isUninitialized }] = useDeleteItemMutation();

  const additionalFields = useMemo(() => {
    if (data) {
      return getItemAdditionalField(data.collection);
    }
    return {};
  }, [data, isLoading]);

  useEffect(() => {
    if (!isUninitialized && !isLoading) {
      setIsOpen(false);
      navigate(-1);
    }
  }, [isSuccess, isUninitialized]);

  useEffect(() => {
    const sse = new EventSource(`${API_URL}${SSE_STREAM(collectionId, itemId)}`);

    sse.onmessage = e => {
      const parsed: ILike | IComment = JSON.parse(e.data);
      if ('count' in parsed) {
        setLikesCount(parsed.count);
        setCurrentLikeId(parsed.id);
      } else {
        setCommentsData(prev => [...prev, parsed]);
      }
    };

    return () => {
      sse.close();
    };
  }, []);

  const closeHandler = () => setIsOpen(false);
  const handleConfirm = () => {
    deleteItem([collectionId, itemId]);
  };
  const handleEditClick = () => {
    setOpenType(ModalTypes.CREATE);
    setIsOpen(true);
  };
  const handleDeleteClick = () => {
    setIsOpen(true);
    setOpenType(ModalTypes.CONFIRM);
    setTitle(t('collection.delete_confirmation') as string);
  };

  return (
    <Wrapper>
      {data && (
        <>
          <ItemRow sx={{ justifyContent: 'space-between' }}>
            <ItemRow sx={{ maxWidth: '90%' }}>
              <Typography fontSize={18} fontWeight={600}>
                {t('item.name')}:
              </Typography>
              <Typography sx={{ pl: 1, wordBreak: 'break-word' }}>{data.name}</Typography>
            </ItemRow>
            {isOwner && (
              <Box>
                <Tooltip title={t('item.edit')}>
                  <IconButton onClick={handleEditClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('item.delete')}>
                  <IconButton onClick={handleDeleteClick}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </ItemRow>
          <Divider />
          {additionalTypes.map(key =>
            additionalFields[key]?.map((field, i) => {
              const dbField = revertFieldName(key as AdditionalFieldPluralKeys) + (i + 1);
              const Component = itemsAdditionalFieldViews[key];
              return (
                <Fragment key={field}>
                  <ItemRow>
                    <Component
                      key={field}
                      field={field}
                      value={data[dbField as keyof Omit<IItem, 'tags' | 'comments' | 'likes'>]}
                    />
                  </ItemRow>
                  <Divider />
                </Fragment>
              );
            })
          )}
          <LikesSection
            collectionId={collectionId}
            itemId={itemId}
            likesCount={likesCount}
            currentLikeId={currentLikeId}
            setLikesCount={setLikesCount}
            setCurrentLikeId={setCurrentLikeId}
            isOwner={isOwner}
          />
          <CommentsSection
            collectionId={collectionId}
            itemId={itemId}
            commentsData={commentsData}
            isOwner={isOwner}
          />
        </>
      )}
      {isOwner && (
        <>
          <ConfirmationModal
            title={title}
            isOpen={isOpen && openType === ModalTypes.CONFIRM}
            cancelHandler={closeHandler}
            confirmHandler={handleConfirm}
          />
          {openType === ModalTypes.CREATE && (
            <CreateItemPopup
              additionalFields={additionalFields}
              isOpen={isOpen}
              collectionId={collectionId}
              setIsOpen={setIsOpen}
              currentItem={data}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};
