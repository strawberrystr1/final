import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { ICollectionItemCreation, ICollectionItemModel } from "../types/item";

const CollectionItem = dbClient.define<
  Model<ICollectionItemModel, ICollectionItemCreation>
>(
  "item",
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
    string1: DataTypes.STRING,
    string2: DataTypes.STRING,
    string3: DataTypes.STRING,
    number1: DataTypes.DECIMAL,
    number2: DataTypes.DECIMAL,
    number3: DataTypes.DECIMAL,
    text1: DataTypes.TEXT,
    text2: DataTypes.TEXT,
    text3: DataTypes.TEXT,
    checkbox1: DataTypes.BOOLEAN,
    checkbox2: DataTypes.BOOLEAN,
    checkbox3: DataTypes.BOOLEAN,
    date1: DataTypes.DATE,
    date2: DataTypes.DATE,
    date3: DataTypes.DATE
  },
  { timestamps: false, freezeTableName: true }
);

export default CollectionItem;
