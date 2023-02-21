import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';

import { useGetOneCollectionQuery } from '../../redux/api/collection';
import { getItemAdditionalField } from '../../utils/mappers';
import { CollectionItem } from '../CollectionItem';
import { CreateItemPopup } from '../CreateItemPopup';
import Loader from '../Loader';

import { FlexWrapper, RowItem, RowWrapper, TableWrapper } from './styled';

export const CurrentCollection = () => {
  const { pathname } = useLocation();
  const collectionId = pathname.replace(/\D/g, '');
  const { t } = useTranslation();

  const { data, isLoading } = useGetOneCollectionQuery(+collectionId);
  console.log('data: ', data);

  const additionalFields = useMemo(() => {
    if (data) {
      return getItemAdditionalField(data);
    }
    return {};
  }, [data, isLoading]);

  const fields = Object.values(additionalFields).flat(1);

  return isLoading ? (
    <Loader />
  ) : (
    <FlexWrapper>
      <CreateItemPopup additionalFields={additionalFields} collectionId={collectionId} />
      <Divider sx={{ mt: 1, mb: 1 }} />
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
