export interface ICheckboxFieldModel {
  id: number;
  name: string;
}

export type ICheckboxFieldWithCollection = ICheckboxFieldModel & {
  collectionId: number;
};
export type ICheckboxFieldCreation = Omit<ICheckboxFieldWithCollection, "id">;
