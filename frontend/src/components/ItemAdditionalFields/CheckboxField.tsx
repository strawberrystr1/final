import { FC } from 'react';
import { Box, Checkbox, Typography } from '@mui/material';

import { IProps } from '.';

export const CheckboxField: FC<IProps> = ({ name, formik }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography sx={{ width: '100%', maxWidth: 150 }} fontSize={20}>
        {name}
      </Typography>
      <Checkbox
        name={name}
        id={name}
        sx={{ ml: 1 }}
        onChange={formik.handleChange}
        value={formik.values[name]}
        size="small"
        checked={formik.values[name] as boolean}
      />
    </Box>
  );
};
