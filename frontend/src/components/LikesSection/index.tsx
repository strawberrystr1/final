import { FC } from 'react';

import { useGetItemLikesQuery } from '../../redux/api/likes';

import { Wrapper } from './styled';

interface IProps {
  collectionId: string;
  itemId: string;
}

export const LikesSection: FC<IProps> = ({ collectionId, itemId }) => {
  const { data } = useGetItemLikesQuery([collectionId, itemId]);
  console.log('data: ', data);

  return <Wrapper>LikesSection</Wrapper>;
};
