export interface IComment {
  id: number;
  comment: string;
}

export interface ICreateCommentPayload {
  comment: string;
  collectionId: string;
  userId: number;
  itemId: number;
}
