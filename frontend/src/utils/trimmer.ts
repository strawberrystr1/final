export const trim = (value: string | number | undefined, maxLength = 40) => {
  if (!value) return '';
  const str = value.toString();

  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};
