import { additionalTypes } from '../constants/base';
import { AdditionalFields } from '../constants/collection';
import { FormikItemCreate } from '../types/base';
import { IUserCollectionsResponse } from '../types/collection';

export const getItemAdditionalField = (data: IUserCollectionsResponse | undefined) => {
  const mapped: Record<string, string[]> = {};

  additionalTypes.forEach(item => {
    const additionalArray = data?.[item as keyof IUserCollectionsResponse];
    if (Array.isArray(additionalArray) && !!additionalArray.length) {
      mapped[item] = additionalArray;
    }
  });

  return mapped;
};

export const getFormikInitialValuesForAdditionalField = (
  data: Record<string, string[]>,
  ...rest: string[]
) => {
  const fields = Object.entries(data);

  const mapped = fields.reduce((acc: FormikItemCreate, item) => {
    const [key, value] = item;
    const nextKey = key.slice(0, -1);

    switch (nextKey) {
      case AdditionalFields.STRING:
        value.forEach(el => {
          acc[el] = '';
        });
        break;
      case AdditionalFields.NUMBER:
        value.forEach(el => {
          acc[el] = 0;
        });
        break;
      case AdditionalFields.TEXT:
        value.forEach(el => {
          acc[el] = '';
        });
        break;
      case AdditionalFields.DATE:
        value.forEach(el => {
          acc[el] = new Date();
        });
        break;
      default:
        value.forEach(el => {
          acc[el] = false;
        });
        break;
    }

    return acc;
  }, {});

  rest.forEach(key => {
    mapped[key] = '';
  });

  return mapped;
};
