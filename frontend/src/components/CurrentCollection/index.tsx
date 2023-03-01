import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Button, Divider, Typography } from '@mui/material';

import { filters } from '../../constants/filters';
import { useOwner } from '../../hooks/useOwner';
import { useGetOneCollectionQuery } from '../../redux/api/collection';
import { useAppSelector } from '../../redux/hooks';
import { getItemAdditionalField } from '../../utils/mappers';
import { CollectionItem } from '../CollectionItem';
import { CreateItemPopup } from '../CreateItemPopup';
import { FiltersBlock } from '../FiltersBlock';
import Loader from '../Loader';

import { FlexWrapper, RowItem, RowWrapper, TableWrapper } from './styled';

export const CurrentCollection = () => {
  const { pathname } = useLocation();
  const collectionId = pathname.replace(/\D/g, '');
  const { role } = useAppSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [sort, setSort] = useState<string[]>(filters.sort[0].value);
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

  const fields = Object.values(additionalFields).flat(1);

  const handleButtonClick = () => setIsOpen(prev => !prev);

  return isLoading ? (
    <Loader />
  ) : (
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
        {data && data.items.length > 0 ? (
          data.items.map(item => (
            <CollectionItem
              key={item.id}
              item={item}
              additionalFields={additionalFields}
              collectionId={data.id}
              userId={data.userId}
            />
          ))
        ) : (
          <Typography textAlign="center" fontSize={22}>
            {t('item.empty_table')}
          </Typography>
        )}
      </TableWrapper>
    </FlexWrapper>
  );
};
