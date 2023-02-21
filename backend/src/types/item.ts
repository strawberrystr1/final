import { ICollectionWithAdditionalField } from "./collection";
import { ICommentModel } from "./comment";
import { ILikeModel } from "./like";
import { ITagModel } from "./tag";

export interface ICollectionItemModel {
  id: number;
  name: string;
  string1?: string;
  string2?: string;
  string3?: string;
  number1?: number;
  number2?: number;
  number3?: number;
  text1?: string;
  text2?: string;
  text3?: string;
  checkbox1?: boolean;
  checkbox2?: boolean;
  checkbox3?: boolean;
  date1?: Date;
  date2?: Date;
  date3?: Date;
  collectionId?: number;
}

export type ICollectionItemCreation = Omit<ICollectionItemModel, "id"> & {
  collectionId: number;
};

export interface ICollectionItemWithAllFields extends ICollectionItemModel {
  collection: Omit<ICollectionWithAdditionalField, "tags">;
  comments: ICommentModel[];
  likes: ILikeModel[];
  tags: ITagModel[];
}

export type AdditionalFields = string | number | boolean | Date;
export interface ICreateCollectionItemPayload {
  itemName: string;
  tags: string[];
  [key: string]: ICreateCollectionItemExtraFields | string | string[];
}

export type ICreateCollectionItemExtraFields = Record<
  string,
  { fieldKey: string; fieldValue: AdditionalFields }
>;
