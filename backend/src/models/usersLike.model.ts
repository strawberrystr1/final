import dbClient from "../db";

const UsersLike = dbClient.define(
  "users_like",
  {},
  { timestamps: false, freezeTableName: true }
);

export default UsersLike;
