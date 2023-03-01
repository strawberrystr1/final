import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';

import { IUserResponse } from '../../types/user';

interface IProps {
  user: IUserResponse;
  isSelected: boolean;
  addToUsersArray: (user: IUserResponse, action: boolean) => void;
}

export const UserRow: FC<IProps> = ({ user, isSelected, addToUsersArray }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.checked) {
      addToUsersArray(user, true);
      setChecked(true);
    } else {
      addToUsersArray(user, false);
      setChecked(false);
    }
  };

  useEffect(() => {
    setChecked(isSelected);
  }, [isSelected]);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Checkbox onChange={handleChange} value={checked} checked={checked} />
      </TableCell>
      <TableCell sx={{ fontSize: 20 }} align="center">
        {user.id}
      </TableCell>
      <TableCell sx={{ fontSize: 20 }} align="center">
        {user.name}
      </TableCell>
      <TableCell sx={{ fontSize: 20 }} align="center">
        {user.email}
      </TableCell>
      <TableCell sx={{ fontSize: 20 }} align="center">
        {user.role}
      </TableCell>
      <TableCell sx={{ fontSize: 20 }} align="center">
        {user.status}
      </TableCell>
    </TableRow>
  );
};
