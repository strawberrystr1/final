export interface IStringFieldModel {
  id: number;
  name: string;
  fieldName: string;
  collectionId?: number;
}

export type IStringFieldWithCollection = IStringFieldModel & {
  collectionId: number;
};

export type IStringFieldCreation = Omit<IStringFieldWithCollection, "id">;
