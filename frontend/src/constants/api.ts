export const API_URL = 'https://collector-rmt6.onrender.com';
// export const API_URL = 'http://localhost:4000';
export const POST_SETTINGS = '/user/settings';
export const POST_REGISTER = '/user/register';
export const POST_LOGIN = '/user/login';
export const COLLECTION_CREATE = '/collection/create';
export const ALL_COLLECTIONS = '/collection';
export const USER_COLLECTIONS = (id: string) => `${ALL_COLLECTIONS}?userId=${id}`;
export const ONE_COLLECTION = '/collection/';
export const UPDATE_COLLECTION = (id: number) => `${ONE_COLLECTION}/${id}/update`;
export const CREATE_COLLECTION_ITEM = (id: string) => `/collection/${id}/item/create`;
export const GET_COLLECTION_ITEMS = (id: string) => `/collection/${id}/item`;
export const GET_ONE_ITEM = (collectionId: string, itemId: string) =>
  `${GET_COLLECTION_ITEMS(collectionId)}/${itemId}`;
export const GET_ALL_TAGS = '/tags/';
export const GET_TAGS_CLOUD = `${GET_ALL_TAGS}cloud`;
export const DELETE_ITEM = GET_ONE_ITEM;
export const UPDATE_ITEM = GET_ONE_ITEM;
export const GET_LIKES = (collectionId: string, itemId: string) =>
  `${GET_ONE_ITEM(collectionId, itemId)}/likes`;
export const UPDATE_LIKES = GET_LIKES;
export const SSE_STREAM = (collectionId: string, itemId: string) =>
  `${GET_ONE_ITEM(collectionId, itemId)}/stream`;
export const GET_COMMENTS = (collectionId: string, itemId: string) =>
  `${GET_ONE_ITEM(collectionId, itemId)}/comment`;
export const CREATE_COMMENT = GET_COMMENTS;
export const SEARCH_ITEMS = (query: string) => `/search?query=${encodeURI(query)}`;
export const GET_LATTEST_ITEMS = `${ALL_COLLECTIONS}/item/lattest`;
export const BIGGEST_COLLECTIONS = `${ALL_COLLECTIONS}/biggest`;
export const ADMIN_USERS_DATA = '/user/admin';
