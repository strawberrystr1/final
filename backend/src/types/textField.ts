export interface ITextFieldModel {
  id: number;
  name: string;
  value: string;
}

export type ITextFieldCreation = Omit<ITextFieldModel, "id">;
