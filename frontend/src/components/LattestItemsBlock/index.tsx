import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

import { useGetLattestItemsQuery } from '../../redux/api/item';
import { useAppSelector } from '../../redux/hooks';

export const LattestItemsBlock = () => {
  const { t } = useTranslation();
  const { theme } = useAppSelector(state => state.user);
  const { data, isLoading } = useGetLattestItemsQuery(null, { refetchOnMountOrArgChange: true });

  const border = theme === 'dark' ? '1px solid white' : '1px solid black';
  return (
    <Box sx={{ p: '10px', border, borderRadius: 2, mt: 2 }}>
      <Typography fontWeight={600} fontSize={28}>
        {t('item.lattest')}
      </Typography>
      {data && (
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {data.map(el => (
            <Link
              key={el.id}
              to={`/collection/${el.collectionId}/${el.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  p: 1,
                  border: `1px solid ${theme === 'dark' ? 'white' : 'black'}`,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <Typography>Item: {el.id}</Typography>
                <Typography>Collection: {el.collectionId}</Typography>
                <Typography>Name: {el.name}</Typography>
                <Typography>Amount of fields: {el.fieldsAmount}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: 22 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
