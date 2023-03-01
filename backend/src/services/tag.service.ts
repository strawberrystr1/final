import sequelize from "sequelize";
import { CLOUD_TAGS_AMOUNT } from "../constants/base";
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
      include: {
        model: CollectionItem,
        as: "items",
        attributes: [
          "id",
          "collectionId",
          [sequelize.fn("count", sequelize.col("tagId")), "count"]
        ],
        through: {
          attributes: []
        }
      },
      group: ["tag.id", "items.id"],
      subQuery: false,
      limit: CLOUD_TAGS_AMOUNT
    })
  ).map(e => {
    const { tag, items } = e.toJSON() as ITagWithItemsCount;

    return {
      value: tag,
      count: items.reduce((acc, el) => {
        return acc + +el.count;
      }, 0),
      links: items.map(el => ({
        value: `/collection/${el.collectionId}/${el.id}`
      }))
    };
  });
};
