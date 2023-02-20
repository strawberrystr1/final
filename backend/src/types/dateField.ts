export interface IDateFieldModel {
  id: number;
  name: string;
  fieldName: string;
  collectionId?: number;
}

export type IDateFieldWithCollection = IDateFieldModel & {
  collectionId: number;
};
export type IDateFieldCreation = Omit<IDateFieldWithCollection, "id">;
