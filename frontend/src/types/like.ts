export interface ILike {
  id: number;
  count: number;
}

export interface IUpdateLikePayload {
  collectionId: string;
  itemId: string;
  id: number;
  userId: number;
  type: 'add' | 'remove';
}
