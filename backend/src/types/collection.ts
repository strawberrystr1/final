export interface ICollection {
  id: number;
  name: string;
  description: string;
  theme: string;
  image?: string;
}

export type ICollectionCreate = Omit<ICollection, "id">;
