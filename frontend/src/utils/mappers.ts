import { TFunction } from 'i18next';
import { boolean, date, number, string } from 'yup';

import { ADDITIONAL_FIELDS_AMOUNT, additionalTypes } from '../constants/base';
import { AdditionalFields } from '../constants/collection';
import { AdditionalFieldsTypes, FormikItemCreate, FormikItemCreatePayload } from '../types/base';
import { IUserCollections, IUserCollectionsResponse } from '../types/collection';
import { IItem, IItemWithAllFields, ITag } from '../types/item';

import { formatDateForInput } from './helpers';

export const getItemAdditionalField = (data: IUserCollectionsResponse | IUserCollections) => {
  const mapped: Record<string, string[]> = {};

  additionalTypes.forEach(item => {
    const additionalArray = data[item as keyof IUserCollections];

    if (Array.isArray(additionalArray) && !!additionalArray.length) {
      mapped[item] = additionalArray;
    }
  });

  return mapped;
};

export const getSingleItemFields = (data: IItem) => {
  const mapped: Record<string, AdditionalFieldsTypes> = {};

  for (const key in data) {
    const additionalType = Object.values(AdditionalFields).find(e => {
      const regExp = new RegExp(`${e}.*`);
      if (regExp.test(key)) return true;
      return false;
    });

    if (additionalType) {
      for (let i = 0; i < ADDITIONAL_FIELDS_AMOUNT; i++) {
        const value = data[key as keyof Omit<IItem, 'tags' | 'comments' | 'likes'>];
        if (value) {
          mapped[key] = value;
        }
      }
    }
  }

  return mapped;
};

export const getFormikInitialValuesForAdditionalField = (
  data: Record<string, string[]>,
  predefinedFields: string[],
  currentItem?: IItemWithAllFields
) => {
  const fields = Object.entries(data);

  const mapped = fields.reduce((acc: FormikItemCreate, item) => {
    const [key, value] = item;
    const nextKey = key.slice(0, -1);

    switch (nextKey) {
      case AdditionalFields.STRING:
        value.forEach((el, i) => {
          acc[el] = currentItem?.[`string${i + 1}` as keyof Omit<IItem, 'tags'>] || '';
        });
        break;
      case AdditionalFields.NUMBER:
        value.forEach((el, i) => {
          acc[el] = currentItem?.[`number${i + 1}` as keyof Omit<IItem, 'tags'>] || 0;
        });
        break;
      case AdditionalFields.TEXT:
        value.forEach((el, i) => {
          acc[el] = currentItem?.[`text${i + 1}` as keyof Omit<IItem, 'tags'>] || '';
        });
        break;
      case AdditionalFields.DATE:
        value.forEach((el, i) => {
          acc[el] =
            formatDateForInput(
              currentItem?.[`date${i + 1}` as keyof Omit<IItem, 'tags'>] as string
            ) || '';
        });
        break;
      default:
        value.forEach((el, i) => {
          acc[el] = currentItem?.[`checkbox${i + 1}` as keyof Omit<IItem, 'tags'>] || false;
        });
        break;
    }

    return acc;
  }, {});

  predefinedFields.forEach(key => {
    if (key === 'itemName') {
      mapped[key] = currentItem?.name || '';
    } else {
      mapped[key] = '';
    }
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

export const mapTags = (tags: ITag[]) => {
  return tags.map(tag => ({ id: tag.tag, text: tag.tag }));
};
