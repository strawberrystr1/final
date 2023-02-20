import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { Box, capitalize } from '@mui/material';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography';

import { AdditionalFields } from '../../constants/collection';
import { FormikType } from '../CreateCollectionPopup';

import { Input } from './Input';

interface IProps {
  type: AdditionalFields;
  formik: FormikType;
  initialAmount: number;
}

export const AdditionalField: FC<IProps> = ({ type, formik, initialAmount }) => {
  const [fields, setField] = useState(initialAmount);
  const { t } = useTranslation();

  const incrementFields = () =>
    setField(prev => {
      if (prev >= 3) return prev;
      return prev + 1;
    });

  const decrementFields = () => {
    setField(prev => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };

  return (
    <Box
      sx={{
        '&:nth-child(n + 1):not(:first-child)': {
          ml: 1,
        },
        '&:nth-child(n + 1):not(:last-child)': {
          borderRight: '1px solid white',
        },
        width: '20%',
      }}
    >
      <Typography>{capitalize(t(`collection.${type}`))}</Typography>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box>
          {new Array(fields).fill(1).map((_, i) => (
            <Input
              key={i}
              totalAmount={fields}
              decrementFields={decrementFields}
              type={type}
              index={i + 1}
              formik={formik}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            mr: 1,
            ml: 1,
            alignSelf: 'flex-start',
          }}
          size="large"
          onClick={incrementFields}
        >
          <AddIcon />
        </Button>
      </Box>
    </Box>
  );
};
