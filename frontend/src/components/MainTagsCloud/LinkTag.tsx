import { Typography } from '@mui/material';

import { StyledLink } from '../SearchBlock/styled';

export const LinkTag = (tag: { value: string }) => {
  return (
    <StyledLink key={tag.value} to={tag.value}>
      <Typography fontWeight={600}>Item: {tag.value.split('/')[3]}</Typography>
    </StyledLink>
  );
};
