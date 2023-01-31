import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { ILikeCreation, ILikeModel } from "../types/like";

const Like = dbClient.define<Model<ILikeModel, ILikeCreation>>(
  "like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default Like;
