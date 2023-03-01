import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';

import { filters } from '../../constants/filters';

interface IProps {
  sort: string[];
  setSort: Dispatch<SetStateAction<string[]>>;
  bool: string;
  setBool: Dispatch<SetStateAction<string>>;
  tagsAmount: number;
  setTagsAmount: Dispatch<SetStateAction<number>>;
}

export const FiltersBlock: FC<IProps> = ({
  sort,
  setSort,
  bool,
  setBool,
  tagsAmount,
  setTagsAmount,
}) => {
  const { t } = useTranslation();

  const handleSortChange = (e: SelectChangeEvent<string[]>) => {
    setSort(e.target.value as string[]);
  };

  const handleBoolChange = (e: SelectChangeEvent<string>) => {
    setBool(e.target.value as string);
  };

  const handleTagsAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagsAmount(+e.target.value);
  };
  return (
    <Box sx={{ mb: 1, display: 'flex', gap: 2 }}>
      <Select value={sort} onChange={handleSortChange} size="small">
        {filters.sort.map(el => (
          <MenuItem value={el.value} key={el.title}>
            {t(el.title)}
          </MenuItem>
        ))}
      </Select>
      <Select value={bool} onChange={handleBoolChange} size="small">
        {filters.boolean.map(el => (
          <MenuItem value={el.value} key={el.title}>
            {t(el.title)}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography fontSize={22} sx={{ mr: 2 }}>
          {t('filters.tags')}
        </Typography>
        <TextField
          size="small"
          sx={{ width: 80 }}
          value={tagsAmount}
          onChange={handleTagsAmountChange}
          type="number"
        />
      </Box>
    </Box>
  );
};
