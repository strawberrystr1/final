import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { ICommentCreation, ICommentModel } from "../types/comment";

const Comment = dbClient.define<Model<ICommentModel, ICommentCreation>>(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default Comment;
