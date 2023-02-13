import { ChangeEvent, FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';

interface IProps {
  totalAmount: number;
  decrementFields: () => void;
}

export const Input: FC<IProps> = ({ totalAmount, decrementFields }) => {
  const [value, setValue] = useState('');
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return (
    <OutlinedInput
      size="small"
      placeholder="Field name"
      sx={{ mb: 1 }}
      value={value}
      onChange={handleInput}
      endAdornment={
        totalAmount > 1 && (
          <InputAdornment position="end">
            <IconButton
              onClick={decrementFields}
              onMouseDown={decrementFields}
              edge="end"
              size="small"
              sx={{ padding: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        )
      }
    />
  );
};
