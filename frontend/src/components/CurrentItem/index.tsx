import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';

import { IItem } from '../../types/item';
import { getSingleItemFields } from '../../utils/mappers';

import { ItemRow, Wrapper } from './styled';

export const CurrentItem = () => {
  const { state } = useLocation();
  const { t } = useTranslation();

  const additionalFields = useMemo(() => {
    return getSingleItemFields(state as IItem);
  }, []);

  return (
    <Wrapper>
      <ItemRow>
        <Typography fontSize={18} fontWeight={600} sx={{ width: 120 }}>
          {t('item.name')}:
        </Typography>
        <Typography sx={{ pl: 1, wordBreak: 'break-word' }}>{state.name}</Typography>
      </ItemRow>
      <Divider />
      {Object.entries(additionalFields).map(([key, value]) => (
        <ItemRow key={key}>{value.toString()}</ItemRow>
      ))}
    </Wrapper>
  );
};
