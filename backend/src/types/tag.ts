export interface ITagModel {
  id: number;
  tag: string;
}

export type ITagCreation = Omit<ITagModel, "id">;
