import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';

import {
  COLLECTION_CARD_DESCRIPTION_HEIGHT,
  COLLECTION_CARD_IMAGE_HEIGHT,
  COLLECTION_CARD_WIDTH,
} from '../../constants/base';
import { useDeleteCollectionMutation } from '../../redux/api/collection';
import { IUserCollectionsResponse } from '../../types/collection';
import { ConfirmationModal } from '../ConfirmationModal';
import { CreateCollectionPopup } from '../CreateCollectionPopup';

interface IProps {
  collection: IUserCollectionsResponse;
}

enum ModalTypes {
  CONFIRM,
  CREATE,
}

export const CollectionCard: FC<IProps> = ({ collection }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState<ModalTypes>();
  const [title, setTitle] = useState('');
  const [deleteCollection, { isLoading, isUninitialized }] = useDeleteCollectionMutation();

  const { name, image, description, theme, id } = collection;

  const closeHandler = () => setIsOpen(false);
  const handleConfirm = () => {
    deleteCollection(id);
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

  useEffect(() => {
    if (!isUninitialized && !isLoading) {
      setIsOpen(false);
    }
  }, [isLoading, isUninitialized]);

  return (
    <Card sx={{ width: COLLECTION_CARD_WIDTH, display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        action={
          <Box>
            <Tooltip title={t('collection.edit')}>
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('collection.delete')}>
              <IconButton onClick={handleDeleteClick}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        }
        title={name}
        titleTypographyProps={{ fontSize: 18 }}
        subheader={theme}
      />
      <Divider />
      {image && (
        <CardMedia
          component="img"
          height={COLLECTION_CARD_IMAGE_HEIGHT}
          image={image}
          alt={`${name} image`}
        />
      )}
      <CardContent sx={{ maxHeight: COLLECTION_CARD_DESCRIPTION_HEIGHT, overflow: 'auto' }}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </CardContent>
      <Divider />
      <Link to={`/collection/${id}`} style={{ alignSelf: 'flex-end', width: 'max-content' }}>
        <Tooltip title={t('collection.open')}>
          <IconButton>
            <KeyboardDoubleArrowRightIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Link>
      <ConfirmationModal
        title={title}
        isOpen={isOpen && openType === ModalTypes.CONFIRM}
        cancelHandler={closeHandler}
        confirmHandler={handleConfirm}
      />
      {openType === ModalTypes.CREATE && (
        <CreateCollectionPopup
          isOpen={isOpen}
          currentCollection={collection}
          setIsOpen={setIsOpen}
        />
      )}
    </Card>
  );
};
