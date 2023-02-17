import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import {
  ICheckboxFieldModel,
  ICheckboxFieldCreation
} from "../types/checkboxField";

const CheckboxField = dbClient.define<
  Model<ICheckboxFieldModel, ICheckboxFieldCreation>
>(
  "checkbox",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fieldName: DataTypes.STRING,
  },
  { timestamps: false, freezeTableName: true }
);

export default CheckboxField;
