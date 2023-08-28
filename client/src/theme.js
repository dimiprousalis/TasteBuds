import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#d81b60',
        },
        background: {
            alt: '#747071',
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "white",
                    textDecoration: 'none',
                },
            },
        },
        MuiButton: { 
            styleOverrides: { 
              root: { minWidth: 0, fontFamily: 'Roboto Condensed' } 
            } 
        },
        

        MuiDrawer: {
            styleOverrides: {
              paper: {
                background: "linear-gradient(to right, #3e5f30, #61914c)",
              }
            }
        },


        
    },
    
})

export default theme;