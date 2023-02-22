import ItemsTag from "../models/itemsTag.model";
import Tag from "../models/tag.model";
import { mapTags } from "../utils/mappers";

export const createTag = async (tag: string) => {
  const [tagCreated, created] = await Tag.findOrCreate({
    where: {
      tag
    },
    defaults: {
      tag
    }
  });
  return tagCreated.toJSON();
};

export const createTags = async (tags: string[], itemId: number) => {
  const promises = tags.map(tag => {
    return createTag(tag);
  });

  const createdTags = (await Promise.all(promises)).filter(e => e);

  const junctionPromises = createdTags.map(tag => {
    if (tag) {
      const { id } = tag;
      return updateTagItemJunction(id, itemId);
    }
  });

  await Promise.all(junctionPromises);
};

const updateTagItemJunction = async (tagId: number, itemId: number) => {
  await ItemsTag.findOrCreate({
    where: {
      itemId,
      tagId
    },
    defaults: { itemId, tagId }
  });
};

export const getAllTags = async () => {
  const tags = await Tag.findAll();

  return mapTags(tags);
};
