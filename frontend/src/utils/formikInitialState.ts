import { additionalTypes } from '../constants/base';
import { Collection } from '../constants/collection';
import { IUserCollectionsResponse } from '../types/collection';
import { ICreateCollectionForm } from '../types/formik';

import { getItemAdditionalField } from './mappers';

const formikInitialValues: ICreateCollectionForm = {
  name: '',
  description: '',
  theme: Collection.ALCOHOL,
  image: null,
  string1: '',
  string2: '',
  string3: '',
  number1: '',
  number2: '',
  number3: '',
  text1: '',
  text2: '',
  text3: '',
  checkbox1: '',
  checkbox2: '',
  checkbox3: '',
  date1: '',
  date2: '',
  date3: '',
};

export const getCreateCollectionFormikInitalState = (
  currentColletion?: IUserCollectionsResponse
) => {
  if (currentColletion) {
    const { name, description, theme } = currentColletion;

    const additionalFields = getItemAdditionalField(currentColletion);

    const fields = additionalTypes.reduce((acc: Record<string, string>, item) => {
      const values = additionalFields[item];
      const key = item === 'checkboxes' ? item.slice(0, -2) : item.slice(0, -1);

      if (values) {
        values.forEach((value, i) => {
          acc[`${key}${i + 1}`] = value;
        });
      }

      return acc;
    }, {});

    return {
      ...formikInitialValues,
      name,
      description,
      theme,
      ...fields,
    };
  } else return formikInitialValues;
};
