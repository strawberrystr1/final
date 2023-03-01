import { Typography } from '@mui/material';

import { ISearchResult } from '../../types/search';

export const MainTag = (border: string) => (tag: ISearchResult, size: number, color: string) => {
  return (
    <Typography
      component="span"
      key={tag.value}
      color={color}
      fontSize={size}
      sx={{
        border,
        p: 1,
        borderRadius: 1,
        m: '2px',
        cursor: 'pointer',
        maxHeight: 'min-content',
        wordBreak: 'none',
      }}
    >
      {tag.value}
    </Typography>
  );
};
