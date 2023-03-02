import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Backdrop, Button, CircularProgress, Divider, Typography } from '@mui/material';

import { filters } from '../../constants/filters';
import { useOwner } from '../../hooks/useOwner';
import { useGetOneCollectionQuery } from '../../redux/api/collection';
import { useAppSelector } from '../../redux/hooks';
import { getItemAdditionalField } from '../../utils/mappers';
import { applyBoolean, applyTags, sortItems } from '../../utils/sort';
import { CollectionItem } from '../CollectionItem';
import { CreateItemPopup } from '../CreateItemPopup';
import { FiltersBlock } from '../FiltersBlock';

import { FlexWrapper, RowItem, RowWrapper, TableWrapper } from './styled';

export const CurrentCollection = () => {
  const { pathname } = useLocation();
  const collectionId = pathname.replace(/\D/g, '');
  const { role } = useAppSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [sort, setSort] = useState<string>(filters.sort[0].value);
  const [bool, setBool] = useState('all');
  const [tagsAmount, setTagsAmount] = useState(0);

  const { data, isLoading } = useGetOneCollectionQuery(+collectionId);
  const isOwner = useOwner(data?.userId, role);

  const additionalFields = useMemo(() => {
    if (data) {
      return getItemAdditionalField(data);
    }
    return {};
  }, [data, isLoading]);

  const sortedData = useMemo(() => {
    if (data) {
      const { items, numbers, dates } = data;

      const sortedItems = applyTags(
        applyBoolean(sortItems(items, sort, numbers, dates), bool),
        tagsAmount
      );

      return {
        ...data,
        items: sortedItems,
      };
    }
  }, [data, sort, bool, tagsAmount]);

  const fields = Object.values(additionalFields).flat(1);

  const handleButtonClick = () => setIsOpen(prev => !prev);

  return (
    <FlexWrapper>
      {isOwner && (
        <>
          <Button onClick={handleButtonClick} variant="contained" sx={{ width: 'max-content' }}>
            <Typography sx={{ textTransform: 'none' }}>{t('item.create')}</Typography>
          </Button>
          <CreateItemPopup
            additionalFields={additionalFields}
            collectionId={collectionId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      )}
      <Divider sx={{ mt: 1, mb: 1 }} />
      <FiltersBlock
        sort={sort}
        setSort={setSort}
        bool={bool}
        setBool={setBool}
        tagsAmount={tagsAmount}
        setTagsAmount={setTagsAmount}
        checkboxes={data?.checkboxes}
      />
      <TableWrapper>
        <RowWrapper>
          <RowItem>ID</RowItem>
          <RowItem>Item name</RowItem>
          {fields.map(field => (
            <RowItem key={field}>{field}</RowItem>
          ))}
          <RowItem>Tags</RowItem>
        </RowWrapper>
        {sortedData && sortedData.items.length > 0 ? (
          sortedData.items.map(item => (
            <CollectionItem
              key={item.id}
              item={item}
              additionalFields={additionalFields}
              collectionId={sortedData.id}
              userId={sortedData.userId}
            />
          ))
        ) : (
          <Typography textAlign="center" fontSize={22}>
            {t('item.empty_table')}
          </Typography>
        )}
      </TableWrapper>
      <Backdrop sx={{ color: '#fff', zIndex: 22 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </FlexWrapper>
  );
};
