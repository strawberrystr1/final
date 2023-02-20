import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Typography } from '@mui/material';

import { CollectionList } from '../../components/CollectionList/indes';
import { CreateCollectionPopup } from '../../components/CreateCollectionPopup';
import { Header, Main } from '../../layouts';

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleButtonClick = () => setIsOpen(prev => !prev);

  return (
    <>
      <Header />
      <Main>
        <Box sx={{ pt: 1 }}>
          <Button onClick={handleButtonClick} variant="contained">
            <Typography sx={{ textTransform: 'none' }}>{t('collection.create')}</Typography>
          </Button>
          <CreateCollectionPopup isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
        <Divider sx={{ mt: 1 }} />
        <CollectionList />
      </Main>
    </>
  );
};
