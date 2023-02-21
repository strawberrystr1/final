import { FC } from 'react';

import { AdditionalFieldsTypes } from '../../types/base';

import { DateField } from './DateField';
import { StringField } from './StringField';
import { TextField } from './TextField';

export interface IProps {
  field: string;
  value: AdditionalFieldsTypes | undefined;
}

export const itemsAdditionalFieldViews: Record<string, FC<IProps>> = {
  checkboxes: StringField,
  strings: StringField,
  texts: TextField,
  numbers: StringField,
  dates: DateField,
};
