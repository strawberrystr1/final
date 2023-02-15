import { Box } from '@mui/material';

import { CurrentCollection } from '../../components/CurrentCollection';
import { Header, Main } from '../../layouts';

export const Collection = () => {
  return (
    <>
      <Header />
      <Main>
        <Box sx={{ p: '20px' }}>
          <CurrentCollection />
        </Box>
      </Main>
    </>
  );
};
