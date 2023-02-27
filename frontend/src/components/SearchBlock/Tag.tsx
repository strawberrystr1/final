import { Typography } from '@mui/material';

import { ISearchResult } from '../../types/search';

import { StyledLink } from './styled';

export const Tag = (tag: ISearchResult, size: number, color: string) => {
  return (
    <StyledLink to={`/collection/${tag.value}`} style={{ color }}>
      <Typography>Item: {tag.value.split('/')[1]}</Typography>
    </StyledLink>
  );
};
