import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Button, Container } from '@mui/material';

import LanguageSwitch from '../../components/LanguageSwitch';
import ThemeSwitcher from '../../components/ThemeSwitcher';

import { ControlsWrapper, ToolbarFlex } from './styled';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToHome = () => navigate('/');
  const handleNavigateSignup = () => navigate('/signup');
  const handleNavigateSignin = () => navigate('/signin');

  const isButtonsShown = location.pathname.match(/sign[upin]/g);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <ToolbarFlex>
          <Button onClick={handleNavigateToHome} startIcon={<HomeIcon />} color="inherit">
            Home
          </Button>
          <ControlsWrapper sx={{ width: !isButtonsShown ? '30%' : '15%' }}>
            <ThemeSwitcher />
            <LanguageSwitch />
            {!isButtonsShown && (
              <>
                <Button variant="contained" onClick={handleNavigateSignup}>
                  Signup
                </Button>
                <Button variant="contained" onClick={handleNavigateSignin}>
                  Signin
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
