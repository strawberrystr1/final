export interface INumberModel {
  id: number;
  name: string;
}

export type INUmberFieldWithCollection = INumberModel & {
  collectionId: number;
};
export type INumberCreation = Omit<INUmberFieldWithCollection, "id">;
