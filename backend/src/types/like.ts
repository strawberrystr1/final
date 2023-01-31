export interface ILikeModel {
  id: number;
  count: number;
}

export type ILikeCreation = Omit<ILikeModel, 'id'>