import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const FlexWrapper = styled(Box)`
  display: flex;
  width: 100%;
`;

export const SideBlock = styled(FlexWrapper)`
  width: 50%;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

export const MarkdownWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  max-height: 470px;
  background: #ece8e8;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  overflow: auto;
  color: black;
`;

export const ImageWrapper = styled.img`
  width: 100%;
  height: min-content;
  max-height: 400px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid white;
`;
