import { FC } from 'react';
import { Box, TextField, Typography } from '@mui/material';

import { IProps } from '.';

export const NumberField: FC<IProps> = ({ name, formik }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography sx={{ width: '100%', maxWidth: 150 }} fontSize={20}>
        {name}
      </Typography>
      <TextField
        name={name}
        id={name}
        sx={{ ml: 1 }}
        onChange={formik.handleChange}
        value={formik.values[name]}
        size="small"
        type="number"
      />
    </Box>
  );
};
