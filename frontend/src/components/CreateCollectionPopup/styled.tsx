import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const DialogItem = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Markdown = styled(Box)`
  background-color: #fff;
  max-height: 200px;
  min-height: 200px;
  color: black;
  padding: 10px;
  border-radius: 5px;
  overflow: auto;
`;

export const AdditionalItemsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
