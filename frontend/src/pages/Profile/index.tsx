import { Box, Divider } from '@mui/material';

import { CollectionList } from '../../components/CollectionList/indes';
import { CreateCollectionPopup } from '../../components/CreateCollectionPopup';
import { Header, Main } from '../../layouts';

export const Profile = () => {
  return (
    <>
      <Header />
      <Main>
        <Box sx={{ pt: 1 }}>
          <CreateCollectionPopup />
        </Box>
        <Divider sx={{ mt: 1 }} />
        <CollectionList />
      </Main>
    </>
  );
};
