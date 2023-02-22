import { IUser } from "./user";

export interface ILikeModel {
  id: number;
  count: number;
  itemId?: number;
}

export type ILikeCreation = Omit<ILikeModel, "id">;

export interface IUpdateLikePayload {
  id?: number;
  userId: number;
  itemId: number;
  currentCount: number;
  type: "add" | "remove";
}

export interface ILikeWithUsers extends ILikeModel {
  users: IUser[];
}
