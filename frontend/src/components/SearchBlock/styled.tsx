import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Popper } from '@mui/material';

export const TagsPopover = styled(Popper)`
  background-color: #bcbbbff4;
  padding: 8px;
  min-width: 300px;
  border-radius: 10px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 5px;
  margin: 2px;
`;
