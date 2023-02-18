import CollectionItem from "../models/item.model";
import Tag from "../models/tag.model";
import { ICreateCollectionItemPayload } from "../types/item";
import { createCollecionItemValues } from "../utils/mappers";
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
