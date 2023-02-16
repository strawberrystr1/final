export interface IUserCollectionsResponse {
  id: number;
  name: string;
  description: string;
  theme: string;
  image: string | null;
  userId: number;
  checkboxes: string[];
  dates: string[];
  numbers: string[];
  strings: string[];
  texts: string[];
}
