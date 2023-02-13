import type { FC, ReactNode } from 'react';
import { Container } from '@mui/material';

import { HEADER_HEIGHT } from '../../constants/base';

interface IProps {
  children: ReactNode;
}

const Main: FC<IProps> = ({ children }) => {
  return (
    <Container maxWidth={false} component="main" sx={{ height: `calc(100% - ${HEADER_HEIGHT}px)` }}>
      <Container maxWidth="xl">{children}</Container>
    </Container>
  );
};

export default Main;
