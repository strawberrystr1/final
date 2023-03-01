import { Collection } from '../constants/collection';

import { FormikItemCreatePayload } from './base';
import { IItem, ITag } from './item';

export interface IUserCollections {
  id: number;
  name: string;
  description: string;
  theme: Collection;
  image: string | null;
  userId: number;
  checkboxes: string[];
  dates: string[];
  numbers: string[];
  strings: string[];
  texts: string[];
}
export interface IUserCollectionsResponse extends IUserCollections {
  items: IItem[];
  tags: ITag[];
}

export interface ICreateItemPayload {
  id: string;
  tags: string[];
  itemName: string;
  [key: string]: string | FormikItemCreatePayload | string[];
}

export interface IUpdateItemPayload {
  collectionId: string;
  itemId: string;
  tags: string[];
  itemName: string;
  [key: string]: string | FormikItemCreatePayload | string[];
}

export interface IBiggestCollection {
  id: number;
  name: string;
  theme: string;
  description: string;
  items_count: string;
  image: string;
}
