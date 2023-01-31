import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import dbClient from "./db";
import router from "./router/index";
import User from "./models/user.model";
import Collection from "./models/collection.model";
import Comment from "./models/comment.model";
import Like from "./models/like.model";
import UsersLike from "./models/usersLike.model";
import CollectionItem from "./models/item.model";
import CheckboxField from "./models/checkbox.model";
import NumberField from "./models/number.model";
import StringField from "./models/string.model";
import TextField from "./models/text.model";
import DateField from "./models/date.model";
import Tag from "./models/tag.model";
import ItemsTag from "./models/itemsTag.model";

const runServer = async () => {
  dotenv.config();

  const app = express();

  app.use(cors({ origin: "*" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.json());

  app.use(router);

  const port = +(process.env.PORT as string) || 4000;

  try {
    User.hasMany(Collection);
    Collection.belongsTo(User);

    User.hasMany(Comment);
    Comment.belongsTo(User);

    User.belongsToMany(Like, { through: UsersLike });
    Like.belongsToMany(User, { through: UsersLike });

    Collection.hasMany(CollectionItem);
    CollectionItem.belongsTo(Collection);

    CollectionItem.hasOne(Like);
    Like.belongsTo(CollectionItem);

    CollectionItem.hasMany(CheckboxField);
    CheckboxField.belongsTo(CollectionItem);

    CollectionItem.hasMany(NumberField);
    NumberField.belongsTo(CollectionItem);

    CollectionItem.hasMany(StringField);
    StringField.belongsTo(CollectionItem);

    CollectionItem.hasMany(TextField);
    TextField.belongsTo(CollectionItem);

    CollectionItem.hasMany(DateField);
    DateField.belongsTo(CollectionItem);

    CollectionItem.hasMany(Comment);
    Comment.belongsTo(CollectionItem);

    CollectionItem.belongsToMany(Tag, { through: ItemsTag });
    Tag.belongsToMany(CollectionItem, { through: ItemsTag });

    await dbClient.authenticate();
    await dbClient.sync({ alter: true });

    app.listen(port, () => console.log("server is up at", port));
  } catch (e) {
    console.log(e);
  }
};

runServer();
