import { additionalTypes } from "../constants/additional";
import {
  ICollectionWithAdditionalField,
  IFullCollectionResponse
} from "../types/collection";
import {
  AdditionalFields,
  ICollectionItemModel,
  ICreateCollectionItemPayload
} from "../types/item";

export const getAdditionalFieldsData = (data: Record<string, string>) => {
  const mapped: Record<string | number, string[]> = {};

  for (let key in data) {
    if (!data[key]) continue;

    const slicedKey = key.slice(0, -1);

    const additionalType = additionalTypes.find(e => e === slicedKey);

    if (additionalType) {
      if (mapped[additionalType]) {
        mapped[additionalType].push(data[key]);
      } else {
        mapped[additionalType] = [data[key]];
      }
    }
  }

  return mapped;
};

export const mapAdditionalField = (
  collection: ICollectionWithAdditionalField
) => {
  return {
    checkboxes: collection.checkboxes.map(el => el.name),
    strings: collection.strings.map(el => el.name),
    dates: collection.dates.map(el => el.name),
    numbers: collection.numbers.map(el => el.name),
    texts: collection.texts.map(el => el.name)
  };
};

export const createCollecionItemValues = (
  values: Omit<ICreateCollectionItemPayload, "itemName" | "tags">
): Record<string, AdditionalFields> => {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      if (typeof value === "object" && "fieldValue" in value) {
        return [key, value.fieldValue];
      }
      return [key, value];
    })
  );
};

const mapItems = (
  item: ICollectionItemModel,
  checkboxes: string[],
  dates: string[],
  numbers: string[],
  strings: string[],
  texts: string[]
) => {
  const mapped: Record<string, AdditionalFields | undefined> = { ...item };

  for (const key in item) {
    const typedKey = key as keyof ICollectionItemModel;
    if (item[typedKey] || typeof item[typedKey] === 'boolean') {
      const pureKey = typedKey.slice(0, -1);
      const type = additionalTypes.find(e => e === pureKey);
      if (type) {
        switch (type) {
          case "string":
            {
              const index = +typedKey.slice(-1) - 1;
              mapped[strings[index]] = item[typedKey];
              delete mapped[typedKey];
            }
            break;
          case "number":
            {
              const index = +typedKey.slice(-1) - 1;
              mapped[numbers[index]] = item[typedKey];
              delete mapped[typedKey];
            }
            break;
          case "date":
            {
              const index = +typedKey.slice(-1) - 1;
              mapped[dates[index]] = item[typedKey];
              delete mapped[typedKey];
            }
            break;
          case "text":
            {
              const index = +typedKey.slice(-1) - 1;
              mapped[texts[index]] = item[typedKey];
              delete mapped[typedKey];
            }
            break;
          case "checkbox":
            {
              const index = +typedKey.slice(-1) - 1;
              mapped[checkboxes[index]] = item[typedKey];
              delete mapped[typedKey];
            }
            break;
        }
      }
    }
  }

  return mapped;
};

export const mapResponseFields = (collections: IFullCollectionResponse[]) => {
  return collections.map(collection => {
    const { checkboxes, dates, numbers, strings, texts, items } = collection;
    const mappedItems = items.map(item =>
      mapItems(item, checkboxes, dates, numbers, strings, texts)
    );

    return {
      ...collection,
      items: mappedItems
    };
  });
};
