import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

export const Navbar = () => {

    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["access_token"]);

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/");
    };

    return (
        <AppBar
            position="sticky">
            <Toolbar sx={{ flexGrow: 1 }}>
                <GiKnifeFork />
                <Typography component="div" onClick={() => navigate("/home")} sx={{ flexGrow: 1 }}>
                    Home
                </Typography>
                <Typography component="div" onClick={() => navigate("/home")} sx={{ flexGrow: 1 }}>
                    My Recipes
                </Typography>
                <Typography component="div" onClick={() => navigate("/home")} sx={{ flexGrow: 1 }}>
                    Create Recipes
                </Typography>
                <Typography component="div" onClick={logout} sx={{ flexGrow: 1 }}>
                    Logout
                </Typography>
            </Toolbar>
        </AppBar>
    );
}