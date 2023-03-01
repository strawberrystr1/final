import { Box } from '@mui/material';

import { BiggestCollections } from '../../components/BiggestCollectionsBlock';
import { LattestItemsBlock } from '../../components/LattestItemsBlock';
import { MainTagsCloud } from '../../components/MainTagsCloud';
import { Header, Main } from '../../layouts';

const Home = () => {
  return (
    <>
      <Header />
      <Main>
        <Box>
          <MainTagsCloud />
          <LattestItemsBlock />
          <BiggestCollections />
        </Box>
      </Main>
    </>
  );
};

export default Home;
