import dbClient from "../db";

const ItemsTag = dbClient.define(
  "items_tag",
  {},
  { timestamps: false, freezeTableName: true }
);

export default ItemsTag;
