export interface ICommentModel {
  id: number;
  comment: string;
  itemId?: number;
  userId?: number;
}

export type ICommentCreation = Omit<ICommentModel, "id">;
