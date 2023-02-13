import CheckboxField from "../models/checkbox.model";
import Collection from "../models/collection.model";
import DateField from "../models/date.model";
import NumberField from "../models/number.model";
import StringField from "../models/string.model";
import TextField from "../models/text.model";
import User from "../models/user.model";
import { ICollectionCreate } from "../types/collection";
import { IAuthUser } from "../types/user";

export const createCollection = async (
  data: ICollectionCreate,
  user: IAuthUser
) => {
  console.log("user: ", user);
  const { name, description, theme } = data;

  const collection = (
    await Collection.create(
      { name, description, theme, userId: user.id },
      { returning: true }
    )
  ).toJSON();

  return collection;
};

export const getCollections = async () => {
  return await Collection.findAll({
    include: [
      User,
      CheckboxField,
      DateField,
      NumberField,
      StringField,
      TextField
    ]
  });
};
