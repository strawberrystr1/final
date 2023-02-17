import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { INumberModel, INumberCreation } from "../types/numberField";

const NumberField = dbClient.define<Model<INumberModel, INumberCreation>>(
  "number",
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

export default NumberField;
