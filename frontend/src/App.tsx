import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { useAppSelector } from './redux/hooks';
import router from './router';
import { darkTheme, lightTheme } from './theme';

function App() {
  const { theme } = useAppSelector(state => state.user);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
