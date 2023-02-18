import { TFunction } from 'i18next';
import { boolean, date, number, string } from 'yup';

import { additionalTypes } from '../constants/base';
import { AdditionalFields } from '../constants/collection';
import { FormikItemCreate, FormikItemCreatePayload } from '../types/base';
import { IUserCollections, IUserCollectionsResponse } from '../types/collection';

export const getItemAdditionalField = (data: IUserCollectionsResponse) => {
  const mapped: Record<string, string[]> = {};

  additionalTypes.forEach(item => {
    const additionalArray = data[item as keyof IUserCollections];

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
          acc[el] = '';
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

export const prepareYupObject = (
  values: FormikItemCreate,
  t: TFunction<'translation', undefined, 'translation'>
) => {
  return Object.fromEntries(
    Object.entries(values).map(item => {
      const [key, value] = item;
      switch (typeof value) {
        case 'string':
          return [key, string().required(t('field_required') || '')];
        case 'number':
          return [key, number().required(t('field_required') || '')];
        case 'boolean':
          return [key, boolean().required(t('field_required') || '')];
        default:
          return [key, date().required(t('field_required') || '')];
      }
    })
  );
};

export const prepareFieldForRequest = (
  values: FormikItemCreate,
  initialFields: Record<string, string[]>
) => {
  const mapped: FormikItemCreatePayload = {};

  Object.entries(initialFields).forEach(([key, value]) => {
    Object.entries(values).forEach(([fieldKey, fieldValue]) => {
      const index = value.findIndex(e => e === fieldKey);
      if (index !== -1) {
        const nextKey = key === 'checkboxes' ? key.slice(0, -2) : key.slice(0, -1);
        mapped[`${nextKey}${index + 1}`] = {
          fieldValue:
            nextKey === 'date'
              ? new Date(fieldValue as string)
              : nextKey === 'checkbox'
              ? !!fieldValue
              : fieldValue,
          fieldKey,
        };
      }
    });
  });

  return mapped;
};
