import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { IUser, IUserCreation } from "../types/user";

const User = dbClient.define<Model<IUser, IUserCreation>>(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "en"
    },
    theme: {
      type: DataTypes.STRING,
      defaultValue: "dark"
    }
  },
  { timestamps: false, freezeTableName: true }
);

export default User;
