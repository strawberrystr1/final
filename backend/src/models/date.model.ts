import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { IDateFieldModel, IDateFieldCreation } from "../types/dateField";

const DateField = dbClient.define<Model<IDateFieldModel, IDateFieldCreation>>(
  "date",
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
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default DateField;
