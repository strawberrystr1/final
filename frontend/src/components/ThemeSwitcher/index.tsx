import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Switch } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeTheme } from '../../redux/slices/user.slice';

import { FlexBox } from './styled';

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.user);

  const handleThemeChange = () => dispatch(changeTheme());

  return (
    <FlexBox>
      <LightModeIcon fontSize="small" />
      <Switch onChange={handleThemeChange} color="info" checked={theme === 'dark'} />
      <DarkModeIcon fontSize="small" />
    </FlexBox>
  );
};

export default ThemeSwitcher;
