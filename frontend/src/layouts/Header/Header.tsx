import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Avatar, Button, Container, Tooltip, Typography } from '@mui/material';

import LanguageSwitch from '../../components/LanguageSwitch';
import { SearchBlock } from '../../components/SearchBlock';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import routes from '../../constants/routes';
import { useAppSelector } from '../../redux/hooks';

import { ControlsWrapper, ToolbarFlex } from './styled';

const Header = () => {
  const { isLogged, id, role } = useAppSelector(state => state.user);
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <ToolbarFlex>
          <Button startIcon={<HomeIcon />} color="inherit">
            <Link to={routes.HOME} style={{ textDecoration: 'none' }}>
              <Typography>Home</Typography>
            </Link>
          </Button>
          {role === 'admin' && (
            <Link to={'/users'} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary">
                <Typography>{t('admin.list')}</Typography>
              </Button>
            </Link>
          )}
          <SearchBlock />
          <ControlsWrapper sx={{ width: !isLogged ? '30%' : '20%' }}>
            <ThemeSwitcher />
            <LanguageSwitch />
            {isLogged && (
              <Tooltip title={t('tooltip.avatar')}>
                <Link to={`${routes.PROFILE}/${id}`}>
                  <Avatar sx={{ cursor: 'pointer' }} />
                </Link>
              </Tooltip>
            )}
            {!isLogged && (
              <>
                <Button variant="contained" color="secondary">
                  <Link to={routes.SIGNIN} style={{ textDecoration: 'none' }}>
                    <Typography>{t('auth.title_sin')}</Typography>
                  </Link>
                </Button>
                <Button variant="contained" color="secondary">
                  <Link to={routes.SIGNUP} style={{ textDecoration: 'none' }}>
                    <Typography>{t('auth.title_sup')}</Typography>
                  </Link>
                </Button>
              </>
            )}
          </ControlsWrapper>
        </ToolbarFlex>
      </Container>
    </AppBar>
  );
};
export default Header;
