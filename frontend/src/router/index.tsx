import { createBrowserRouter } from 'react-router-dom';

import routes from '../constants/routes';
import { Home, Profile, Signin, Signup } from '../pages';

export default createBrowserRouter([
  {
    path: routes.HOME,
    element: <Home />,
  },
  {
    path: routes.SIGNUP,
    element: <Signup />,
  },
  {
    path: routes.SIGNIN,
    element: <Signin />,
  },
  {
    path: routes.PROFILE,
    element: <Profile />,
  },
]);
