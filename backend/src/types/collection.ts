export interface ICollection {
  id: number;
  name: string;
  description: string;
  theme: string;
  image?: string;
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
  userId: number;
}

export type ICollectionCreate = Omit<ICollection, "id"> &
  ICollectionAdditionalFields;
