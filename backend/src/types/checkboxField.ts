export interface ICheckboxFieldModel {
  id: number;
  name: string;
  value: boolean;
}

export type ICheckboxFieldCreation = Omit<ICheckboxFieldModel, "id">;
