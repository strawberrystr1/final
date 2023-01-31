export interface IDateFieldModel {
  id: number;
  name: string;
  value: Date;
}

export type IDateFieldCreation = Omit<IDateFieldModel, "id">;
