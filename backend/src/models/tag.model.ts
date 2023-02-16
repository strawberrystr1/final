import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { ITagCreation, ITagModel } from "../types/tag";

const Tag = dbClient.define<Model<ITagModel, ITagCreation>>(
  "tag",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default Tag;
