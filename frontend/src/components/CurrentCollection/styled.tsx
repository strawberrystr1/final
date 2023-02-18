import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, ThemeOptions, Typography } from '@mui/material';

export const FlexWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:not(:first-child) > div {
    border-top: none;
  }
`;

export const RowWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: 'min-content',
  border: (theme as ThemeOptions)?.palette?.mode === 'dark' ? '1px solid white' : '1px solid black',
}));

export const RowItem = styled(Typography)(({ theme }) => ({
  width: 200,
  height: 50,
  padding: '0 5px',
  textAlign: 'center',
  wordWrap: 'break-word',
  overflow: 'hidden',
  '&:nth-child(n + 1):not(:first-child)': {
    borderLeft:
      (theme as ThemeOptions)?.palette?.mode === 'dark' ? '1px solid white' : '1px solid black',
  },
}));

export const TableWrapper = styled(Box)`
  overflow: auto;
`;
