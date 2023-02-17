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
}

export type ICollectionItemCreation = Omit<ICollectionItemModel, "id">;
export type AdditionalFields = string | number | boolean | Date;
export interface ICreateCollectionItemPayload {
  itemName: string;
  tags: string[];
  [key: string]: AdditionalFields | string[];
}
