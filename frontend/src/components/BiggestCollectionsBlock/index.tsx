import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useGetBiggestCollectionsQuery } from '../../redux/api/collection';
import { useAppSelector } from '../../redux/hooks';

export const BiggestCollections = () => {
  const { t } = useTranslation();
  const { theme } = useAppSelector(state => state.user);
  const { data } = useGetBiggestCollectionsQuery(null, { refetchOnMountOrArgChange: true });

  const border = theme === 'dark' ? '1px solid white' : '1px solid black';

  return (
    <Box sx={{ p: '10px', border, borderRadius: 2, mt: 2 }}>
      <Typography fontWeight={600} fontSize={28}>
        {t('collection.biggest')}
      </Typography>
      {data && (
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {data.map(el => (
            <Link key={el.id} to={`/collection/${el.id}`} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  p: 1,
                  border: border,
                  borderRadius: 2,
                  mb: 1,
                  display: 'flex',
                }}
              >
                {el.image && (
                  <img
                    src={el.image}
                    alt={el.name}
                    title={el.name}
                    style={{ width: 100, height: 90 }}
                  />
                )}
                <Box sx={{ ml: 1 }}>
                  <Typography>Collection: {el.id}</Typography>
                  <Typography>Name: {el.name}</Typography>
                  <Typography>Theme: {el.theme}</Typography>
                  <Typography>Amount of items: {el.items_count}</Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};
