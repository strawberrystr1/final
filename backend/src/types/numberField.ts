export interface INumberModel {
  id: number;
  name: string;
  fieldName: string;
}

export type INUmberFieldWithCollection = INumberModel & {
  collectionId: number;
};
export type INumberCreation = Omit<INUmberFieldWithCollection, "id">;
