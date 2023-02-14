import { IAdditionalField } from './base';

export interface IUserCollectionsResponse {
  id: number;
  name: string;
  description: string;
  theme: string;
  image: string | null;
  userId: number;
  checkboxes: IAdditionalField[];
  dates: IAdditionalField[];
  numbers: IAdditionalField[];
  strings: IAdditionalField[];
  texts: IAdditionalField[];
}
