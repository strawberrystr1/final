import { additionalTypes } from "../constants/additional";
import CheckboxField from "../models/checkbox.model";
import Collection from "../models/collection.model";
import DateField from "../models/date.model";
import NumberField from "../models/number.model";
import StringField from "../models/string.model";
import TextField from "../models/text.model";
import User from "../models/user.model";
import {
  ICollectionCreate,
  ICollectionWithAdditionalField
} from "../types/collection";
import { IAuthUser } from "../types/user";
import { getAdditionalFieldsData } from "../utils/mappers";

export const createCollection = async (
  data: Omit<ICollectionCreate, "userId">,
  user: IAuthUser
) => {
  const { name, description, theme, image, ...rest } = data;

  const collection = (
    await Collection.create(
      {
        name,
        description,
        theme,
        userId: user.id,
        image
      },
      { returning: true }
    )
  ).toJSON();

  const mapped = getAdditionalFieldsData(rest);
  createAdditionalField(mapped, collection.id);

  return collection;
};

export const getCollections = async (userId?: number) => {
  const whereOptions = userId
    ? {
        userId
      }
    : {};

  const collections = (
    await Collection.findAll({
      where: whereOptions,
      include: [
        User,
        CheckboxField,
        DateField,
        NumberField,
        StringField,
        TextField
      ],
      order: [["id", "DESC"]]
    })
  ).map(e => e.toJSON()) satisfies ICollectionWithAdditionalField[];

  return collections.map(collection => {
    return {
      ...collection,
      user: {
        name: collection.user.name,
        id: collection.user.id
      },
      checkboxes: collection.checkboxes.map(el => el.name),
      strings: collection.strings.map(el => el.name),
      dates: collection.dates.map(el => el.name),
      numbers: collection.numbers.map(el => el.name),
      texts: collection.texts.map(el => el.name)
    };
  });
};

const createAdditionalField = (
  data: Record<string | number, string[]>,
  id: number
) => {
  const promises = additionalTypes.map(type => {
    switch (type) {
      case "string":
        return data[type].map(el => createCollectionStringField(el, id));
      case "text":
        return data[type].map(el => createCollectionTextField(el, id));
      case "checkbox":
        return data[type].map(el => createCollectionCheckboxField(el, id));
      case "number":
        return data[type].map(el => createCollectionNumberField(el, id));
      case "date":
        return data[type].map(el => createCollectionDateField(el, id));
      default:
        break;
    }
  });
};

const createCollectionStringField = async (name: string, id: number) => {
  return await StringField.create({ name, collectionId: id });
};

const createCollectionTextField = async (name: string, id: number) => {
  return await TextField.create({ name, collectionId: id });
};

const createCollectionDateField = async (name: string, id: number) => {
  return await DateField.create({ name, collectionId: id });
};

const createCollectionNumberField = async (name: string, id: number) => {
  return await NumberField.create({ name, collectionId: id });
};

const createCollectionCheckboxField = async (name: string, id: number) => {
  return await CheckboxField.create({ name, collectionId: id });
};
