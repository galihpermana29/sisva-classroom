export const themeConfig = {
  typography: {
    fontFamily: ["Kumbh Sans", "sans-serif"].join(","),
    fontSize: 13,
  },
  palette: {
    primary: {
      main: "#008CD5",
    },
    warning: {
      main: "#F96756",
      dark: "#E95746",
    },
    base: {
      main: "#98A2B3",
      base100: "#101828",
      base90: "#1D2939",
      base80: "#344054",
      base70: "#475467",
      base60: "#667085",
      base50: "#98A2B3",
      base40: "#D0D5DD",
      base30: "#EAECF0",
      base20: "#F2F4F7",
      base10: "#F9FAFB",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 240,
      md: 600,
      lg: 1000,
      xl: 1500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          minWidth: 0,
          fontSize: 14,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 13,
        },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       width:"100%",
    //       backgroundColor:"red"
    //     },
    //   },
    // },MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       width:"100px!important",
    //       backgroundColor:"blue"
    //     },
    //   },
    // },
  },
};
