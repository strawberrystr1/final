import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Switch } from '@mui/material';

import { useUpdateSettingsMutation } from '../../redux/api/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeTheme } from '../../redux/slices/user';

import { FlexBox } from './styled';

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.user);
  const [updateSettings] = useUpdateSettingsMutation();

  const handleThemeChange = () => {
    dispatch(changeTheme());
    updateSettings({ theme });
  };

  return (
    <FlexBox>
      <LightModeIcon fontSize="small" />
      <Switch onChange={handleThemeChange} color="info" checked={theme === 'dark'} />
      <DarkModeIcon fontSize="small" />
    </FlexBox>
  );
};

export default ThemeSwitcher;
