import ItemsTag from "../models/itemsTag.model";
import Tag from "../models/tag.model";

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
      return updateTagIemJunction(id, itemId);
    }
  });

  await Promise.all(junctionPromises);
};

const updateTagIemJunction = async (tagId: number, itemId: number) => {
  await ItemsTag.create({
    itemId,
    tagId
  });
};
