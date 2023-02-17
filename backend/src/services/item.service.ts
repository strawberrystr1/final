import CheckboxField from "../models/checkbox.model";
import Collection from "../models/collection.model";
import DateField from "../models/date.model";
import CollectionItem from "../models/item.model";
import NumberField from "../models/number.model";
import StringField from "../models/string.model";
import TextField from "../models/text.model";
import {
  ICreateCollectionItemPayload,
} from "../types/item";
import { createCollecionItemValues } from "../utils/mappers";

export const createItem = async (
  data: ICreateCollectionItemPayload,
  collectionId: number
) => {
  const { tags, itemName, ...rest } = data;

  const collectionField = await Collection.findByPk(collectionId, {
    include: [NumberField, StringField, TextField, CheckboxField, DateField]
  });

  const creationValues = createCollecionItemValues(rest);

  const item = await CollectionItem.create({
    name: itemName
  });

  console.log(collectionField?.toJSON(), rest);
  return data;
};
