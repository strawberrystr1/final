import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Button, Container, Typography } from '@mui/material';

import { CreateCollectionPopup } from '../../components/CreateCollectionPopup';
import LanguageSwitch from '../../components/LanguageSwitch';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import routes from '../../constants/routes';
import { useAppSelector } from '../../redux/hooks';

import { ControlsWrapper, ToolbarFlex } from './styled';

const Header = () => {
  const { isLogged } = useAppSelector(state => state.user);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <ToolbarFlex>
          <Button startIcon={<HomeIcon />} color="inherit">
            <Link to={routes.HOME} style={{ textDecoration: 'none' }}>
              <Typography>Home</Typography>
            </Link>
          </Button>
          {isLogged && <CreateCollectionPopup />}
          <ControlsWrapper sx={{ width: !isLogged ? '30%' : '15%' }}>
            <ThemeSwitcher />
            <LanguageSwitch />
            {!isLogged && (
              <>
                <Button variant="contained">
                  <Link to={routes.SIGNUP} style={{ textDecoration: 'none' }}>
                    <Typography>Signup</Typography>
                  </Link>
                </Button>
                <Button variant="contained">
                  <Link to={routes.SIGNIN} style={{ textDecoration: 'none' }}>
                    <Typography>Signin</Typography>
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
