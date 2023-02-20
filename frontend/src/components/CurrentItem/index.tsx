import { useLocation } from 'react-router-dom';

import { useGetOneItemQuery } from '../../redux/api/item';
import { extractIds } from '../../utils/helpers';

export const CurrentItem = () => {
  const { pathname } = useLocation();
  const [collectionId, itemId] = extractIds(pathname);
  const { data } = useGetOneItemQuery([collectionId, itemId]);
  console.log('data: ', data);

  return <div>CurrentItem</div>;
};
