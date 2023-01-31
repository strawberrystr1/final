export interface ICommentModel {
  id: number;
  comment: string;
}

export type ICommentCreation = Omit<ICommentModel, "id">;
