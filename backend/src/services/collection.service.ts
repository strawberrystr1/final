import { additionalTypes } from "../constants/additional";
import CheckboxField from "../models/checkbox.model";
import Collection from "../models/collection.model";
import DateField from "../models/date.model";
import CollectionItem from "../models/item.model";
import NumberField from "../models/number.model";
import StringField from "../models/string.model";
import Tag from "../models/tag.model";
import TextField from "../models/text.model";
import {
  ICollectionCreate,
  ICollectionUpdate,
  ICollectionWithAdditionalField,
  IFullCollectionResponse
} from "../types/collection";
import { IAuthUser } from "../types/user";
import { getAdditionalFieldsData, mapAdditionalField } from "../utils/mappers";

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
  await Promise.all(createOrUpdateAdditionalField(mapped, collection.id, true));

  return collection;
};

export const getCollections = async (
  userId?: number
): Promise<IFullCollectionResponse[]> => {
  const whereOptions = userId
    ? {
        userId
      }
    : {};

  const collections = (
    await Collection.findAll({
      where: whereOptions,
      include: [
        CheckboxField,
        DateField,
        NumberField,
        StringField,
        TextField,
        {
          model: CollectionItem,
          include: [Tag]
        }
      ],
      order: [["id", "DESC"]]
    })
  ).map(e => e.toJSON()) satisfies ICollectionWithAdditionalField[];

  return collections.map(collection => {
    return {
      ...collection,
      ...mapAdditionalField(collection)
    };
  });
};

export const getOneCollection = async (
  collectionId: number
): Promise<IFullCollectionResponse | void> => {
  const collection = await Collection.findOne({
    where: {
      id: collectionId
    },
    include: [
      CheckboxField,
      DateField,
      NumberField,
      StringField,
      TextField,
      {
        model: CollectionItem,
        include: [Tag]
      }
    ]
  });

  if (!collection) {
    return;
  }

  const created = collection.toJSON() satisfies ICollectionWithAdditionalField;

  return {
    ...created,
    ...mapAdditionalField(created)
  };
};

export const deleteCollection = async (id: number) => {
  await Collection.destroy({ where: { id } });
};

export const updateCollection = async (id: number, data: ICollectionUpdate) => {
  const { name, description, theme, image, ...rest } = data;

  await Collection.update(
    {
      name,
      description,
      theme,
      image
    },
    { where: { id }, returning: true }
  );

  const mapped = getAdditionalFieldsData(rest);
  await Promise.all(createOrUpdateAdditionalField(mapped, +id, false));
};

const updateCollectionStringField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await StringField.update(
    { name },
    { where: { collectionId: id, fieldName } }
  );
};

const updateCollectionNumberField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await NumberField.update(
    { name },
    { where: { collectionId: id, fieldName } }
  );
};

const updateCollectionTextField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await TextField.update(
    { name },
    { where: { collectionId: id, fieldName } }
  );
};

const updateCollectionCheckboxField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await CheckboxField.update(
    { name },
    { where: { collectionId: id, fieldName } }
  );
};

const updateCollectionDateField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await DateField.update(
    { name },
    { where: { collectionId: id, fieldName } }
  );
};

const createCollectionStringField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await StringField.create({ name, collectionId: id, fieldName });
};

const createCollectionTextField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await TextField.create({ name, collectionId: id, fieldName });
};

const createCollectionDateField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await DateField.create({ name, collectionId: id, fieldName });
};

const createCollectionNumberField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await NumberField.create({ name, collectionId: id, fieldName });
};

const createCollectionCheckboxField = async (
  name: string,
  id: number,
  fieldName: string
) => {
  return await CheckboxField.create({ name, collectionId: id, fieldName });
};

const createOrUpdateAdditionalField = (
  data: Record<string | number, string[]>,
  id: number,
  create: boolean
) => {
  const promises = additionalTypes.map(type => {
    switch (type) {
      case "string":
        return data[type]?.map((el, i) => {
          return create
            ? createCollectionStringField(el, id, `string${i + 1}`)
            : updateCollectionStringField(el, id, `string${i + 1}`);
        });
      case "text":
        return data[type]?.map((el, i) =>
          create
            ? createCollectionTextField(el, id, `text${i + 1}`)
            : updateCollectionTextField(el, id, `text${i + 1}`)
        );
      case "checkbox":
        return data[type]?.map((el, i) =>
          create
            ? createCollectionCheckboxField(el, id, `checkbox${i + 1}`)
            : updateCollectionCheckboxField(el, id, `checkbox${i + 1}`)
        );
      case "number":
        return data[type]?.map((el, i) =>
          create
            ? createCollectionNumberField(el, id, `number${i + 1}`)
            : updateCollectionNumberField(el, id, `number${i + 1}`)
        );
      case "date":
        return data[type]?.map((el, i) =>
          create
            ? createCollectionDateField(el, id, `date${i + 1}`)
            : updateCollectionDateField(el, id, `date${i + 1}`)
        );
      default:
        break;
    }
  });

  return promises.flat(1);
};
