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
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default CollectionItem;
