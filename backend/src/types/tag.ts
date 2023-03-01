export interface ITagModel {
  id: number;
  tag: string;
}

export type ITagCreation = Omit<ITagModel, "id">;

export interface ITagWithItemsCount extends ITagModel {
  count: string;
  items: {
    collectionId: number;
    id: number;
  }[];
}
