import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { IProps } from '.';

export const StringField: FC<IProps> = ({ field, value }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography fontSize={18} fontWeight={600}>
        {field}:
      </Typography>
      <Typography sx={{ pl: 1, wordBreak: 'break-word' }}>{value?.toString()}</Typography>
    </Box>
  );
};
