import CheckboxField from "../models/checkbox.model";
import Collection from "../models/collection.model";
import Comment from "../models/comment.model";
import DateField from "../models/date.model";
import CollectionItem from "../models/item.model";
import Like from "../models/like.model";
import NumberField from "../models/number.model";
import StringField from "../models/string.model";
import Tag from "../models/tag.model";
import TextField from "../models/text.model";
import {
  ICollectionItemWithAllFields,
  ICreateCollectionItemPayload
} from "../types/item";
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

  createTags(tags, item.toJSON().id);

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
        Like,
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
