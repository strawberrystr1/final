import { ICheckboxFieldWithCollection } from "./checkboxField";
import { IDateFieldWithCollection } from "./dateField";
import { ICollectionItemModel } from "./item";
import { INUmberFieldWithCollection } from "./numberField";
import { IStringFieldWithCollection } from "./stringField";
import { ITextFieldWithCollection } from "./textField";
import { IUser } from "./user";

export interface ICollection {
  id: number;
  name: string;
  description: string;
  theme: string;
  image?: string;
  userId: number;
}

export interface ICollectionAdditionalFields {
  string1?: string;
  string2?: string;
  string3?: string;
  number1?: string;
  number2?: string;
  number3?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  checkbox1?: string;
  checkbox2?: string;
  checkbox3?: string;
  date1?: string;
  date2?: string;
  date3?: string;
}

export type ICollectionCreate = Omit<ICollection, "id"> &
  ICollectionAdditionalFields;

export interface ICollectionWithAdditionalField extends ICollection {
  checkboxes: ICheckboxFieldWithCollection[];
  dates: IDateFieldWithCollection[];
  numbers: INUmberFieldWithCollection[];
  strings: IStringFieldWithCollection[];
  texts: ITextFieldWithCollection[];
  user: IUser;
}

export interface ICollectionWithItems extends ICollectionWithAdditionalField {
  items: ICollectionItemModel[];
}
