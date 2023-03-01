import sequelize from "sequelize";
import { client } from "../elastic";
import CollectionItem from "../models/item.model";
import ItemsTag from "../models/itemsTag.model";
import Tag from "../models/tag.model";
import { ITagWithItemsCount } from "../types/tag";
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

  return createdTags.map(e => e.tag).join(",");
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

export const getTagsCloud = async () => {
  return (
    await Tag.findAll({
      attributes: [
        "id",
        "tag",
        [sequelize.fn("count", sequelize.col("items.id")), "count"]
      ],
      group: ["tag.id", "items.id"],
      include: {
        model: CollectionItem,
        as: "items",
        attributes: ["collectionId", "id"],
        through: {
          attributes: []
        }
      },
      subQuery: false
    })
  ).map(e => {
    const { tag, count, items } = e.toJSON() as ITagWithItemsCount;

    return {
      value: tag,
      count: +count,
      links: items.map(el => ({
        value: `/collection/${el.collectionId}/${el.id}`
      }))
    };
  });
};
