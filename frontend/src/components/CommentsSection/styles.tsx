import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Textarea = styled.textarea`
  width: 300px;
  height: 70px;
  resize: none;
  padding: 5px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
`;

export const CreateWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const CommentWrapper = styled(Box)<{ theme: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  width: 300px;
  height: 70px;
  border: 1px solid black;
  border-color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border-radius: 5px;
  margin-top: 5px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#5e5d5d' : '#fff')};
`;
