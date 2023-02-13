import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useUpdateSettingsMutation } from '../../redux/api/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeLanguage } from '../../redux/slices/user';
import { Languages } from '../../types/base';

const LanguageSwitch = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { language } = useAppSelector(state => state.user);
  const [updateSettings] = useUpdateSettingsMutation();
  const handleToggle = (_: MouseEvent<HTMLElement>, newLang: Languages) => {
    if (newLang !== null) {
      dispatch(changeLanguage());
      i18n.changeLanguage(newLang);
      updateSettings({ language: newLang });
    }
  };

  return (
    <ToggleButtonGroup
      value={language}
      size="small"
      exclusive
      onChange={handleToggle}
      aria-label="text alignment"
    >
      <ToggleButton value="en" aria-label="left aligned">
        EN
      </ToggleButton>
      <ToggleButton value="ru" aria-label="centered">
        RU
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitch;
