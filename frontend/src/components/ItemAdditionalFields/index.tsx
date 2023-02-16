import { FC } from 'react';
import { FormikProps } from 'formik';

import { FormikItemCreate } from '../../types/base';

import { CheckboxField } from './CheckboxField';
import { DateField } from './DateField';
import { NumberField } from './NumberField';
import { StringField } from './StringField';
import { TextField } from './TextField';

export interface IProps {
  name: string;
  formik: FormikProps<FormikItemCreate>;
}

export const itemsAdditionalField: Record<string, FC<IProps>> = {
  checkboxes: CheckboxField,
  strings: StringField,
  texts: TextField,
  numbers: NumberField,
  dates: DateField,
};
