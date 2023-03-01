import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UsersTable } from '../../components/UsersTable';
import routes from '../../constants/routes';
import { Header, Main } from '../../layouts';
import { useAppSelector } from '../../redux/hooks';

export const AdminPage = () => {
  const { role } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      navigate(routes.HOME);
    }
  }, []);

  return (
    <>
      <Header />
      <Main>
        <UsersTable />
      </Main>
    </>
  );
};
