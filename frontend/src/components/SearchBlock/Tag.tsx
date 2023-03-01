import { Typography } from '@mui/material';

import { ISearchResult } from '../../types/search';

import { StyledLink } from './styled';

export const Tag = (tag: ISearchResult, size: number, color: string) => {
  return (
    <StyledLink key={tag.value} to={`/collection/${tag.value}`} style={{ color }}>
      <Typography fontWeight={600}>Item: {tag.value.split('/')[1]}</Typography>
    </StyledLink>
  );
};
