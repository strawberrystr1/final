import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import {
  useDeleteUsersMutation,
  useGetAdminDataQuery,
  useUpdateUserMutation,
} from '../../redux/api/user';
import { IUserResponse } from '../../types/user';
import Loader from '../Loader';

import { Wrapper } from './styled';
import { UserRow } from './UserRow';

export const UsersTable = () => {
  const [selectedUsers, setSelectedUsers] = useState<IUserResponse[]>([]);
  const { t } = useTranslation();
  const { data } = useGetAdminDataQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUsersMutation();

  const addToUsersArray = (user: IUserResponse, action: boolean) => {
    if (action) setSelectedUsers(prev => [...prev, user]);
    else setSelectedUsers(prev => prev.filter(e => e.id !== user.id));
  };

  const updateUserHandler = (type: string) => () => {
    switch (type) {
      case 'block':
        updateUser(selectedUsers.map(e => ({ ...e, field: 'block' })));
        break;
      case 'unblock':
        updateUser(selectedUsers.map(e => ({ ...e, field: 'unblock' })));
        break;
      case 'role':
        updateUser(selectedUsers.map(e => ({ ...e, field: 'role' })));
        break;
      case 'delete':
        deleteUser(selectedUsers.map(e => e.email));
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Box
          sx={{
            width: '100%',
            paddingLeft: '16px',
          }}
        >
          <Tooltip title={t('admin.block')}>
            <IconButton onClick={updateUserHandler('block')}>
              <LockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('admin.unblock')}>
            <IconButton onClick={updateUserHandler('unblock')}>
              <LockOpenIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('admin.delete')}>
            <IconButton onClick={updateUserHandler('delete')}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('admin.change_role')}>
            <IconButton onClick={updateUserHandler('role')}>
              <ManageAccountsIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }} align="center">
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }} align="center">
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }} align="center">
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }} align="center">
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map(user => (
                <UserRow
                  key={user.id}
                  user={user}
                  addToUsersArray={addToUsersArray}
                  isSelected={selectedUsers.some(u => u.id === user.id)}
                />
              ))
            ) : (
              <Loader />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};
