import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { ITextFieldModel, ITextFieldCreation } from "../types/textField";

const TextField = dbClient.define<Model<ITextFieldModel, ITextFieldCreation>>(
  "text",
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
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default TextField;
