import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { ICollection, ICollectionCreate } from "../types/collection";

const Collection = dbClient.define<Model<ICollection, ICollectionCreate>>(
  "collection",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: DataTypes.STRING
  },
  { freezeTableName: true, timestamps: false }
);

export default Collection;