import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetOneCollectionQuery } from '../../redux/api/collection';
import { getItemAdditionalField } from '../../utils/mappers';
import { CreateItemPopup } from '../CreateItemPopup';
import Loader from '../Loader';

import { FlexWrapper } from './styled';

export const CurrentCollection = () => {
  const { pathname } = useLocation();
  const collectionId = pathname.replace(/\D/g, '');

  const { data, isLoading } = useGetOneCollectionQuery(+collectionId);

  const additionalFields = useMemo(() => {
    return getItemAdditionalField(data);
  }, [data, isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <FlexWrapper>
      <CreateItemPopup additionalFields={additionalFields} collectionId={collectionId} />
    </FlexWrapper>
  );
};
