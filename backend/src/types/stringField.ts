export interface IStringFieldModel {
  id: number;
  name: string;
}

export type IStringFieldWithCollection = IStringFieldModel & {
  collectionId: number;
};

export type IStringFieldCreation = Omit<IStringFieldWithCollection, "id">;
