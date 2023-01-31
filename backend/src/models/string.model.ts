import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { IStringFieldModel, IStringFieldCreation } from "../types/stringField";

const StringField = dbClient.define<
  Model<IStringFieldModel, IStringFieldCreation>
>(
  "string",
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
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default StringField;
