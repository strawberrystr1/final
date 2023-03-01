import sequelize from "sequelize";
import { LATTEST_ITEMS_AMOUNT } from "../constants/base";
import { client } from "../elastic";
import CheckboxField from "../models/checkbox.model";
import Collection from "../models/collection.model";
import Comment from "../models/comment.model";
import DateField from "../models/date.model";
import CollectionItem from "../models/item.model";
import NumberField from "../models/number.model";
import StringField from "../models/string.model";
import Tag from "../models/tag.model";
import TextField from "../models/text.model";
import {
  ICollectionItemWithAllFields,
  ICreateCollectionItemPayload
} from "../types/item";
import { createIndex } from "../utils/elastic";
import {
  createCollecionItemValues,
  mapAdditionalField
} from "../utils/mappers";
import { createTags } from "./tag.service";

export const createItem = async (
  data: ICreateCollectionItemPayload,
  collectionId: number
) => {
  const { tags, itemName, ...rest } = data;

  const creationValues = createCollecionItemValues(rest);

  const item = await CollectionItem.create(
    {
      name: itemName,
      ...creationValues,
      collectionId
    },
    { returning: true }
  );

  const createdTags = await createTags(tags, item.toJSON().id);

  createIndex(item.toJSON(), [["tags", createdTags]], true);

  return item;
};

export const getCollectionItems = async (collectionId: number) => {
  const items = await CollectionItem.findAll({
    where: { collectionId },
    include: [Tag]
  });

  return items;
};

export const getOneItem = async (id: string) => {
  const item = (
    await CollectionItem.findByPk(+id, {
      include: [
        Tag,
        Comment,
        {
          model: Collection,
          include: [
            StringField,
            NumberField,
            TextField,
            DateField,
            CheckboxField
          ]
        }
      ]
    })
  )?.toJSON() as ICollectionItemWithAllFields | undefined;

  if (item) {
    const { collection } = item;

    return {
      ...item,
      collection: {
        ...collection,
        ...mapAdditionalField(collection)
      }
    };
  }
  return {};
};

export const deleteItem = async (id: number) => {
  await CollectionItem.destroy({ where: { id } });
};

export const updateCollectionItem = async (
  id: string,
  data: ICreateCollectionItemPayload
) => {
  const { tags, itemName, ...rest } = data;

  const updateValues = createCollecionItemValues(rest);

  const [_, item] = await CollectionItem.update(
    { ...updateValues, name: itemName },
    { where: { id }, returning: true }
  );

  const createdTags = await createTags(tags, +id);

  createIndex(item[0].toJSON(), [["tags", createdTags]]);
};

export const getLattestItems = async () => {
  return (
    await CollectionItem.findAll({
      limit: LATTEST_ITEMS_AMOUNT,
      order: [["id", "DESC"]]
    })
  ).map(e => {
    const { id, collectionId, name, ...rest } = e.toJSON();

    return {
      id,
      collectionId,
      name,
      fieldsAmount: Object.values(rest).filter(e => e !== null).length
    };
  });
};
