export const API_URL = 'http://localhost:4000';
export const POST_SETTINGS = '/user/settings';
export const POST_REGISTER = '/user/register';
export const POST_LOGIN = '/user/login';
export const COLLECTION_CREATE = '/collection/create';
export const USER_COLLECTIONS = '/collection';
export const ONE_COLLECTION = '/collection/';
export const CREATE_COLLECTION_ITEM = (id: string) => `/collection/${id}/item/create`;
export const GET_COLLECTION_ITEMS = (id: string) => `/collection/${id}/item`;
