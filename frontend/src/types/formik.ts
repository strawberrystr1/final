import { Collection } from '../constants/collection';

export interface ICreateCollectionForm {
  name: string;
  description: string;
  theme: Collection;
  image: File | null;
  string1: string;
  string2: string;
  string3: string;
  number1: string;
  number2: string;
  number3: string;
  text1: string;
  text2: string;
  text3: string;
  checkbox1: string;
  checkbox2: string;
  checkbox3: string;
  date1: string;
  date2: string;
  date3: string;
}
