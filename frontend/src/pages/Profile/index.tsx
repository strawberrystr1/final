import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Box, Button, Divider, Typography } from '@mui/material';

import { CollectionList } from '../../components/CollectionList/indes';
import { CreateCollectionPopup } from '../../components/CreateCollectionPopup';
import { useOwner } from '../../hooks/useOwner';
import { Header, Main } from '../../layouts';
import { useAppSelector } from '../../redux/hooks';
import { extractIds } from '../../utils/helpers';

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { role } = useAppSelector(state => state.user);
  const [userId] = extractIds(pathname);
  const isOwner = useOwner(+userId, role);

  const handleButtonClick = () => setIsOpen(prev => !prev);

  return (
    <>
      <Header />
      <Main>
        {isOwner && (
          <>
            <Box sx={{ pt: 1 }}>
              <Button onClick={handleButtonClick} variant="contained">
                <Typography sx={{ textTransform: 'none' }}>{t('collection.create')}</Typography>
              </Button>
              <CreateCollectionPopup isOpen={isOpen} setIsOpen={setIsOpen} />
            </Box>
            <Divider sx={{ mt: 1 }} />
            <Typography component="h2" fontSize={30}>
              {t('collection.title')}
            </Typography>
          </>
        )}
        <CollectionList />
      </Main>
    </>
  );
};
