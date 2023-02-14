import { additionalTypes } from "../constants/additional";

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
