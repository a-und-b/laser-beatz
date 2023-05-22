import { createTheme, responsiveFontSizes } from '@mui/material'

export const emerald = "#54EC33";
export const ember = "#FE7922";
export const ruby = "#FD12BB";

export const getPrimaryColor = (primaryColor) => {
  switch (primaryColor) {
    case 'emerald':
      return emerald;
    case 'ember':
      return ember;
    case 'ruby':
      return ruby;
    default:
      return emerald;
  }
}

const getPrimaryColorName = (primaryColor) => {
  switch (primaryColor) {
    case emerald:
      return 'emerald';
    case ember:
      return 'ember';
    case ruby:
      return 'ruby';
    default:
      return 'emerald';
  }
}

export const createLaserbeatzTheme = (primaryColor = emerald) => {
  let theme = createTheme({
    laserbeatzMode: getPrimaryColorName(primaryColor),
    palette: {
      background: {
        default: "#25083f"
      },
      text: {
        primary: "#ffffff"
      },
      primary: {
        main: primaryColor, light: '#C8D9E5',
      }, secondary: {
        main: '#25083f', light: '#ecac4d',
      },
      emerald: {
        main: emerald
      },
      ember: {
        main: ember
      },
      ruby: {
        main: ruby
      }
    },
  })

  // Typography
  theme = createTheme(theme, {
    typography: {
      fontFamily: ['Arial', 'Metamor Bit'], 'hero': {
        lineHeight: 1.25,
        fontWeight: 300,
        fontSize: 76,
        fontFamily: 'Metamor Bit',
      }, h1: {
        lineHeight: 1.25,
        fontWeight: 300,
        fontSize: 65,
        fontFamily: 'Metamor Bit',
      }, h2: {
        lineHeight: 1.2, fontWeight: 300, fontSize: 32, fontFamily: 'Metamor Bit', letterSpacing: '4px'
      }, h3: {
        lineHeight: 1.3, fontWeight: 400, fontSize: 25, fontFamily: 'Metamor Bit',
      }, h4: {
        lineHeight: 1, fontWeight: 400, fontSize: 20, fontFamily: 'Metamor Bit',
      }, 'first-view': {
      }, h5: {
        lineHeight: 1, fontWeight: 400, fontSize: 14, fontFamily: 'Metamor Bit', letterSpacing: '1px'
      }, 'first-view': {
      }, h6: {
        lineHeight: 1.75, fontWeight: 400, fontSize: 12, fontFamily: 'Metamor Bit', letterSpacing: '1px'
      }, 'first-view': {
        fontSize: '1.25rem',
        lineHeight: 1.5,
        fontWeight: 400,
        fontFamily: 'Metamor Bit',
      }, 'menu': {
        cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
      }, 'lead': {
        lineHeight: 1.2,
        fontWeight: 300,
        fontSize: 34,
        fontFamily: 'Metamor Bit',
        color: theme.palette.primary.main,
      }, 'subtitle1': {
        lineHeight: 1.5, fontWeight: 700, fontFamily: 'Metamor Bit',
      }, 'body1': {
        lineHeight: 1.5, fontFamily: 'Metamor Bit',
      }, 'body2': {
        lineHeight: 1.2, fontFamily: 'Metamor Bit', fontSize: '1rem',
      }, 'news-date': {
        fontWeight: 700, mb: 2, textTransform: 'uppercase', fontSize: '.85rem',
      }, 'news-title': {
        fontSize: 65,
        display: 'block',
        fontFamily: 'Metamor Bit',
        textDecoration: 'underline',
        textDecorationColor: theme.palette.secondary.main,
        textUnderlineOffset: theme.spacing(1),
      }, 'underline': {
        marginBottom: theme.spacing(3),
        lineHeight: 1.3,
        fontWeight: 400,
        fontSize: 25,
        fontFamily: 'Metamor Bit',
        position: 'relative',
        zIndex: 2,
        '::before': {

          zIndex: -1,
          transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
          position: 'absolute',
          bottom: 0,

          content: '""',
          display: 'block',
          height: theme.spacing(.25),
          width: '100%',
          background: theme.palette.secondary.main,
        },
        ':hover::before': {
          height: '100%', width: `100%`,
        },
        ':hover': {
          background: 'none',
        },
      },
    },
  })

  // Buttons
  theme = createTheme(theme, {
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        }, styleOverrides: {
          root: {
            [theme.breakpoints.up('sm')]: {
              paddingLeft: theme.spacing(6), paddingRight: theme.spacing(6),
            },

          },
        },
      }, MuiButton: {
        variants: [
          {
            props: {}, style: {
              fontFamily: 'Metamor Bit', fontWeight: 600, borderRadius: 0,
            },
          }, {
            props: { variant: 'contained' }, style: {
              color: theme.palette.secondary.main,
              fontFamily: 'Metamor Bit',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 2,
              borderRadius: 5,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 40,
              paddingRight: 40,
              letterSpacing: '1.4px'
            },
          }, {
            props: { variant: 'outlined' }, style: {
              borderWidth: theme.spacing(.25),
              ':hover': { borderWidth: theme.spacing(.25) },
            },
          }, {
            props: { variant: 'outlined', color: 'secondary' }, style: {
              //  border: `2px solid ${theme.palette.secondary.main}`,
            },
          }, {
            props: { variant: 'underline' }, style: {
              marginLeft: theme.spacing(-2),
              position: 'relative',
              zIndex: 2,
              '::before': {
                zIndex: -1,
                transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
                position: 'absolute',
                bottom: theme.spacing(.5),
                left: theme.spacing(2),
                content: '""',
                display: 'block',
                height: theme.spacing(.25),
                width: `calc(100% - ${theme.spacing(4)})`,
                background: theme.palette.primary.main,
              },
              ':hover::before': {
                height: `calc(100% + ${theme.spacing(-1)})`,
                left: theme.spacing(1),
                width: `calc(100% + ${theme.spacing(-2)})`,
              },
              ':hover': {
                color: '#fff', background: 'none',
              },
            },
          }, {
            props: { variant: 'underline', color: 'secondary' }, style: {
              '::before': {
                background: theme.palette.secondary.main,
              },
            },
          }],
      },
    },
  })

  // Paper
  theme = createTheme(theme, {
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
    },
  })

  theme = responsiveFontSizes(theme)

  return theme;
}