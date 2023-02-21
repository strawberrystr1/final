import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography } from '@mui/material';

import { useAppSelector } from '../../redux/hooks';

import { IProps } from '.';

export const TextField: FC<IProps> = ({ field, value }) => {
  const { theme } = useAppSelector(state => state.user);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography fontSize={18} fontWeight={600}>
        {field}:
      </Typography>
      <Box
        sx={{
          maxHeight: 150,
          borderRadius: '5px',
          border: `1px solid ${
            theme === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0,0, 0.23)'
          }`,
          mb: '7px',
          padding: '8px',
          width: '100%',
          ml: 1,
          mt: 1,
        }}
      >
        <ReactMarkdown>{value?.toString() as string}</ReactMarkdown>
      </Box>
    </Box>
  );
};
