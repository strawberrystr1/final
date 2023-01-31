export interface ICollectionItemModel {
  id: number;
  name: string;
}

export type ICollectionItemCreation = Omit<ICollectionItemModel, "id">;
