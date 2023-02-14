import { Box, Typography } from '@mui/material';

import { useGetUserCollectionQuery } from '../../redux/api/collection';
import { useAppSelector } from '../../redux/hooks';
import { CollectionItem } from '../CollectionItem';

export const CollectionList = () => {
  const { id } = useAppSelector(state => state.user);
  const { data } = useGetUserCollectionQuery(id);

  return (
    <>
      <Typography component="h2" fontSize={30}>
        Your collections
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {data?.map(item => (
          <CollectionItem collection={item} key={item.id} />
        ))}
      </Box>
    </>
  );
};
