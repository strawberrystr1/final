import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';

import { AdditionalFields } from '../../constants/collection';
import { ICreateCollectionForm } from '../../types/formik';
import type { FormikType } from '../CreateCollectionPopup';

interface IProps {
  totalAmount: number;
  decrementFields: () => void;
  type: AdditionalFields;
  index: number;
  formik: FormikType;
}

export const Input: FC<IProps> = ({ totalAmount, decrementFields, type, index, formik }) => {
  const { t } = useTranslation();

  return (
    <OutlinedInput
      size="small"
      name={`${type}${index}`}
      id={`${type}${index}`}
      placeholder={t('placeholder.field_name') as string}
      sx={{ mb: 1 }}
      value={formik.values[`${type}${index}` as keyof ICreateCollectionForm]}
      onChange={formik.handleChange}
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
