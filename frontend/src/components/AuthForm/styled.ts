import styled from '@emotion/styled';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const StyledField = styled(TextField)`
  min-height: 80px;
  width: 25%;
  margin-bottom: 10px;

  & p {
    text-transform: none;
  }

  & > div {
    padding: 0;
  }
`;

export const ButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-end;
  width: 25%;

  & > a {
    text-decoration: none;
    align-self: flex-end;
    margin-top: 10px;
    text-transform: none;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.699);
  }
`;
