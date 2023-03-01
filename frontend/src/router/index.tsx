import { createBrowserRouter } from 'react-router-dom';

import routes from '../constants/routes';
import { AdminPage, Collection, Home, Item, Profile, Signin, Signup } from '../pages';

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
    path: routes.PROFILE_ID,
    element: <Profile />,
  },
  {
    path: routes.COLLECTION_ID,
    element: <Collection />,
  },
  {
    path: routes.ITEM_ID,
    element: <Item />,
  },
  {
    path: routes.ADMIN_USERS,
    element: <AdminPage />,
  },
]);
