export interface IStringFieldModel {
  id: number;
  name: string;
  value: string;
}

export type IStringFieldCreation = Omit<IStringFieldModel, "id">;
