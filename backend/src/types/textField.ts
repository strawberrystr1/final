export interface ITextFieldModel {
  id: number;
  name: string;
  fieldName: string;
}

export type ITextFieldWithCollection = ITextFieldModel & {
  collectionId: number;
};
export type ITextFieldCreation = Omit<ITextFieldWithCollection, "id">;
