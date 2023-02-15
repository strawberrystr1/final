import { useTranslation } from 'react-i18next';
import { Masonry } from '@mui/lab';
import { Box, Typography } from '@mui/material';

import { useGetUserCollectionQuery } from '../../redux/api/collection';
import { CollectionCard } from '../CollectionCard';
import Loader from '../Loader';

export const CollectionList = () => {
  const { data, isLoading } = useGetUserCollectionQuery();
  const { t } = useTranslation();

  return (
    <Box sx={{ pt: 2 }}>
      <Typography component="h2" fontSize={30}>
        Your collections
      </Typography>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <Masonry columns={3} spacing={1}>
          {data.map(item => (
            <CollectionCard collection={item} key={item.id} />
          ))}
        </Masonry>
      ) : (
        <Typography>{t('collection.empty')}</Typography>
      )}
    </Box>
  );
};
