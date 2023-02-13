import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Alert, CssBaseline, Snackbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { closeToast } from './redux/slices/toast';
import router from './router';
import { darkTheme, lightTheme } from './theme';

function App() {
  const { theme } = useAppSelector(state => state.user);
  const { message, type, isShowing } = useAppSelector(state => state.toast);
  const dispatch = useAppDispatch();

  const handleToastClose = () => {
    dispatch(closeToast());
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isShowing}
        autoHideDuration={2000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
