export interface IDateFieldModel {
  id: number;
  name: string;
}

export type IDateFieldWithCollection = IDateFieldModel & {
  collectionId: number;
};
export type IDateFieldCreation = Omit<IDateFieldWithCollection, "id">;
