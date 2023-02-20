export interface INumberModel {
  id: number;
  name: string;
  fieldName: string;
  collectionId?: number;
}

export type INUmberFieldWithCollection = INumberModel & {
  collectionId: number;
};
export type INumberCreation = Omit<INUmberFieldWithCollection, "id">;
