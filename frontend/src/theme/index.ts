import { createTheme, ThemeOptions } from '@mui/material';

const primaryDarkColor = '#689f38';
const primaryLightColor = '#689f38';

const bgColorDark = 'rgb(18, 18, 18)';
const bgColorLight = '#fefefe';

const darkFontColor = '#fefefe';
const lightFontColor = '#030303';

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: primaryDarkColor,
      contrastText: darkFontColor,
    },
    secondary: {
      main: '#868d92',
      contrastText: darkFontColor,
    },
    error: {
      main: '#ef6a67',
      contrastText: darkFontColor,
    },
    warning: {
      main: '#f99f1f',
      contrastText: darkFontColor,
    },
    info: {
      main: '#67c5e0',
      contrastText: darkFontColor,
    },
    success: {
      main: '#6fc96f',
      contrastText: darkFontColor,
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    allVariants: {
      color: darkFontColor,
    },
  },
  spacing: 7,
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: primaryDarkColor,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          backgroundColor: 'rgba(255, 0, 0, .7)',
        },
        icon: {
          color: 'white !important',
        },
        standardSuccess: {
          backgroundColor: 'rgba(3, 252, 48, .4)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.role === 'main' && {
            backgroundColor: bgColorDark,
          }),
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '5px',
            backgroundColor: '#443e3e',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#2c292b',
          },
        },
      },
    },
  },
};

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      paper: '#e3e3e3',
    },
    primary: {
      main: primaryLightColor,
      contrastText: lightFontColor,
    },
    secondary: {
      main: '#e1e1e1',
      contrastText: lightFontColor,
    },
    error: {
      main: '#ffa6a4',
      contrastText: lightFontColor,
    },
    warning: {
      main: '#bb0000',
      contrastText: lightFontColor,
    },
    info: {
      main: '#0073c5',
      contrastText: lightFontColor,
    },
    success: {
      main: '#2d702d',
      contrastText: lightFontColor,
    },
  },

  typography: {
    fontFamily: 'sans-serif',
    allVariants: {
      color: lightFontColor,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: primaryLightColor,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.role === 'main' && {
            backgroundColor: bgColorLight,
          }),
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '5px',
            height: '15px',
            backgroundColor: '#d8d8d8',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#b8b8b8',
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
