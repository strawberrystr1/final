export interface ILike {
  id: number;
  count: number;
  users: number[];
}

export interface IUpdateLikePayload {
  collectionId: string;
  itemId: string;
  id?: number;
  currentCount: number;
  userId: number;
  type: 'add' | 'remove';
}
