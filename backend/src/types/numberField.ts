export interface INumberModel {
  id: number;
  name: string;
  value: number;
}

export type INumberCreation = Omit<INumberModel, "id">;
