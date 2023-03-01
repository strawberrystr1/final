import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Masonry } from '@mui/lab';
import { Box, Typography } from '@mui/material';

import { useGetUserCollectionQuery } from '../../redux/api/collection';
import { extractIds } from '../../utils/helpers';
import { CollectionCard } from '../CollectionCard';
import Loader from '../Loader';

export const CollectionList = () => {
  const { pathname } = useLocation();
  const [id] = extractIds(pathname);
  const { data, isLoading } = useGetUserCollectionQuery(id);
  const { t } = useTranslation();
  console.log(data);
  return (
    <Box sx={{ pt: 2 }}>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <Masonry columns={3} spacing={1}>
          {data.map(item => (
            <CollectionCard
              collection={item}
              key={item.id + item.name + item.description + item.theme}
            />
          ))}
        </Masonry>
      ) : (
        <Typography>{t('collection.empty')}</Typography>
      )}
    </Box>
  );
};
