import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

export const BiggestCollections = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography fontWeight={600} fontSize={28}>
        {t('item.lattest')}
      </Typography>
    </Box>
  );
};
