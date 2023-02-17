import { additionalTypes } from "../constants/additional";
import { ICollectionWithAdditionalField } from "../types/collection";
import { AdditionalFields } from "../types/item";

export const getAdditionalFieldsData = (data: Record<string, string>) => {
  console.log("data: ", data);
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
  values: Record<string, AdditionalFields | string[]>
) => {
  
};
