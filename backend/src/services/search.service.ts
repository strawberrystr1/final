import { client } from "../elastic";
import { IHitResult } from "../types/search";

export const searchItems = async (query: string) => {
  const results = await client.search({
    index: "items",
    query: {
      bool: {
        should: [
          {
            regexp: {
              name: `.*${query}.*`
            }
          },
          {
            regexp: {
              collectionDescription: `.*${query}.*`
            }
          },
          {
            regexp: {
              string1: `.*${query}.*`
            }
          },
          {
            regexp: {
              string2: `.*${query}.*`
            }
          },
          {
            regexp: {
              string3: `.*${query}.*`
            }
          },
          {
            regexp: {
              text1: `.*${query}.*`
            }
          },
          {
            regexp: {
              text2: `.*${query}.*`
            }
          },
          {
            regexp: {
              text3: `.*${query}.*`
            }
          }
        ]
      }
    }
  });

  return results.hits.hits.map(el => ({
    value: `${(el._source as IHitResult).collectionId}/${
      (el._source as IHitResult).id
    }`
  }));
};
