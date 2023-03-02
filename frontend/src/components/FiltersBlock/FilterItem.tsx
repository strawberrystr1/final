import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { filters } from '../../constants/filters';

interface IProps {
  fields: string[] | undefined;
  value: string;
  handler: (e: SelectChangeEvent<string>) => void;
  additional?: () => ReactElement;
  filterKey: keyof typeof filters;
}

export const FilterItem: FC<IProps> = ({ fields, value, handler, additional, filterKey }) => {
  const { t } = useTranslation();
  console.log(filters, filterKey);
  return (
    <Select value={value.split('-')[0]} onChange={handler} size="small">
      {additional && additional()}
      {fields &&
        fields.map(check =>
          filters[filterKey].map(el => (
            <MenuItem value={`${el.value}-${check}`} key={el.title}>
              {t(el.title) + ` ${check}`}
            </MenuItem>
          ))
        )}
    </Select>
  );
};
