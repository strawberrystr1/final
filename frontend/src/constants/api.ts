export const API_URL = 'http://localhost:4000';
export const POST_SETTINGS = '/user/settings';
export const POST_REGISTER = '/user/register';
export const POST_LOGIN = '/user/login';
export const COLLECTION_CREATE = '/collection/create';
export const USER_COLLECTIONS = '/collection';
export const ONE_COLLECTION = '/collection/';
export const UPDATE_COLLECTION = (id: number) => `${ONE_COLLECTION}/${id}/update`;
export const CREATE_COLLECTION_ITEM = (id: string) => `/collection/${id}/item/create`;
export const GET_COLLECTION_ITEMS = (id: string) => `/collection/${id}/item`;
export const GET_ONE_ITEM = (collectionId: string, itemId: string) =>
  `${GET_COLLECTION_ITEMS(collectionId)}/${itemId}`;
export const GET_ALL_TAGS = '/tags/';
export const DELETE_ITEM = GET_ONE_ITEM;
export const UPDATE_ITEM = GET_ONE_ITEM;
export const GET_LIKES = (collectionId: string, itemId: string) =>
  `${GET_ONE_ITEM(collectionId, itemId)}/likes`;
export const UPDATE_LIKES = GET_LIKES;
export const SSE_STREAM = (collectionId: string, itemId: string) =>
  `${GET_ONE_ITEM(collectionId, itemId)}/stream`;
