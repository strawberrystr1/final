import { IItem } from '../types/item';

export const replaceNamesForTypes = (items: IItem[], fieldsNames: string[]) => {
  return items.map((e, i) => {
    const key = fieldsNames[i];
    return { ...e, string: e[key as keyof IItem] };
  });
};

export const replaceTypesForNames = (items: IItem[], fieldsNames: string[]) => {
  return items.map((e, i) => {
    const key = fieldsNames[i];
    return { ...e, [key]: e['string' as keyof IItem] };
  });
};

export const sortItems = (items: IItem[], type: string, numbers: string[], dates: string[]) => {
  switch (type) {
    case 'idASC': {
      return [...items].sort((a, b) => a.id - b.id);
    }
    case 'idDESC': {
      return [...items].sort((a, b) => b.id - a.id);
    }
    case 'nameASC': {
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    }
    case 'nameDESC': {
      return [...items].sort((a, b) => b.name.localeCompare(a.name));
    }
    case 'numbersASC': {
      const sorted = replaceNamesForTypes([...items], numbers).sort(
        (a, b) => (a.string as number) - (b.string as number)
      );
      return replaceTypesForNames(sorted, numbers);
    }
    case 'numbersDESC': {
      const sorted = replaceNamesForTypes([...items], numbers).sort(
        (a, b) => (b.string as number) - (a.string as number)
      );
      return replaceTypesForNames(sorted, numbers);
    }
    case 'dateASC': {
      const sorted = replaceNamesForTypes([...items], dates).sort(
        (a, b) => new Date(a.string as string).getTime() - new Date(b.string as string).getTime()
      );
      return replaceTypesForNames(sorted, dates);
    }
    case 'dateDESC': {
      const sorted = replaceNamesForTypes([...items], dates).sort(
        (a, b) => new Date(b.string as string).getTime() - new Date(a.string as string).getTime()
      );
      return replaceTypesForNames(sorted, dates);
    }
    default:
      return [...items];
  }
};

export const applyBoolean = (items: IItem[], type: string) => {
  const [key, field] = type.split('-');
  switch (key) {
    case 'true':
      return items.filter(e => e[field as keyof IItem]);
    case 'false':
      return items.filter(e => !e[field as keyof IItem]);
    default:
      return items;
  }
};

export const applyTags = (items: IItem[], amount: number) => {
  return items.filter(e => {
    if (e.tags.length >= amount) return true;
    return false;
  });
};
