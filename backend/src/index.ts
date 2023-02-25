import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import passport from "passport";

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

import "./middlewares/passport.middleware";
import { client } from "./elastic";

const runServer = async () => {
  const app = express();

  app.use(passport.initialize());
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

    Collection.hasMany(CollectionItem, { onDelete: "CASCADE" });
    CollectionItem.belongsTo(Collection);

    CollectionItem.hasMany(Like);
    Like.belongsTo(CollectionItem);

    Collection.hasMany(CheckboxField, { onDelete: "CASCADE" });
    CheckboxField.belongsTo(Collection);

    Collection.hasMany(NumberField, { onDelete: "CASCADE" });
    NumberField.belongsTo(Collection);

    Collection.hasMany(StringField, { onDelete: "CASCADE" });
    StringField.belongsTo(Collection);

    Collection.hasMany(TextField, { onDelete: "CASCADE" });
    TextField.belongsTo(Collection);

    Collection.hasMany(DateField, { onDelete: "CASCADE" });
    DateField.belongsTo(Collection);

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
