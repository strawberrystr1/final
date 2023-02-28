import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useGetBiggestCollectionsQuery } from '../../redux/api/collection';
import { useAppSelector } from '../../redux/hooks';
import { trim } from '../../utils/trimmer';

export const BiggestCollections = () => {
  const { t } = useTranslation();
  const { theme } = useAppSelector(state => state.user);
  const { data } = useGetBiggestCollectionsQuery();

  return (
    <Box>
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
                  border: `1px solid ${theme === 'dark' ? 'white' : 'black'}`,
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
                  <Typography>Description: {trim(el.description, 10)}</Typography>
                  <Typography>Theme: {el.theme}</Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};
