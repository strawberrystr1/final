import { AdditionalFields } from '../constants/collection';
import { OmitNever } from '../types/base';
import { IUserCollectionsResponse } from '../types/collection';

type PossibleKeys = OmitNever<{
  [P in keyof IUserCollectionsResponse]: IUserCollectionsResponse[P] extends string[] ? P : never;
}>;
type Keys = keyof PossibleKeys;

export const getFieldName = (field: AdditionalFields): Keys => {
  return field === 'checkbox' ? `${field}es` : `${field}s`;
};
