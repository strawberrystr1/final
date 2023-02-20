export interface IItem {
  string1?: string;
  string2?: string;
  string3?: string;
  number1?: string;
  number2?: string;
  number3?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  checkbox1?: boolean;
  checkbox2?: boolean;
  checkbox3?: boolean;
  date1?: string;
  date2?: string;
  date3?: string;
  name: string;
  id: number;
  tags: ITag[];
}

export interface ITag {
  id: number;
  tag: string;
}