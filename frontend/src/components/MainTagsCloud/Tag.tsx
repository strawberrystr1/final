import { Typography } from '@mui/material';

import { ISearchResult } from '../../types/search';

export const MainTag = (tag: ISearchResult, size: number, color: string) => {
  return (
    <Typography
      component="span"
      key={tag.value}
      color={color}
      fontSize={size}
      sx={{ border: '1px solid white', p: 1, borderRadius: 1, m: '2px', cursor: 'pointer' }}
    >
      {tag.value}
    </Typography>
  );
};
