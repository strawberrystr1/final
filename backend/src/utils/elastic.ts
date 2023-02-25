import { client } from "../elastic";
import Collection from "../models/collection.model";
import { ICollectionItemModel } from "../types/item";

export const createElasticDocument = (
  data: ICollectionItemModel,
  additional: [string, string][]
) => {
  const document: Record<string, string | number | boolean> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      if (!/(date|checkbox|number)/.test(key)) {
        document[key] = value;
      }
    }
  });

  additional.forEach(entry => {
    if (entry[1].length > 0) {
      document[entry[0]] = entry[1];
    }
  });

  return document;
};

export const createIndex = async (
  item: ICollectionItemModel,
  additional: [string, string][],
  first = false
) => {
  const document = createElasticDocument(item, additional);

  if (first) {
    const collection = await Collection.findByPk(item.collectionId);
    if (collection) {
      document.collectionDescription = collection.toJSON().description;
    }
  }

  client.index({
    index: "items",
    document,
    id: `${item.id}`
  });
};

export const updateIndex = (
  itemId: string,
  field: string,
  value: string | number
) => {
  client.update({
    index: "items",
    id: itemId,
    script: {
      source: `ctx._source.${field} += ', ' + params.${field}`,
      params: {
        [field]: value
      }
    }
  });
};
