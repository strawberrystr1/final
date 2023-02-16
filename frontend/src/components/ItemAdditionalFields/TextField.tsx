import { FC } from 'react';
import { Box, TextField as MUITextField, Typography } from '@mui/material';

import { IProps } from '.';

export const TextField: FC<IProps> = ({ name, formik }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography sx={{ width: '100%', maxWidth: 150 }} fontSize={20}>
        {name}
      </Typography>
      <MUITextField
        name={name}
        id={name}
        sx={{ ml: 1 }}
        onChange={formik.handleChange}
        value={formik.values[name]}
        size="small"
        error={formik.touched[name] && !!formik.errors[name]}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </Box>
  );
};
