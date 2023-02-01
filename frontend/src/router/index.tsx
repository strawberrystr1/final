import { createBrowserRouter } from 'react-router-dom';

import { Home, Signin, Signup } from '../pages';

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
]);
