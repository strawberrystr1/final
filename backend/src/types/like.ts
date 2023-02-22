export interface ILikeModel {
  id: number;
  count: number;
  itemId?: number;
}

export type ILikeCreation = Omit<ILikeModel, "id">;

export interface IUpdateLikePayload {
  id: number;
  userId: number;
  type: "add" | "remove";
}
