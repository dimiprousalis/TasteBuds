import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

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
            <Toolbar sx={{ display: 'flex', justifyContent: "flex-start" }}>
                <HomeIcon sx={{ fontSize: "medium" }} />
                <Button onClick={() => navigate("/home")} sx={{ paddingLeft: 1, paddingRight: 3, color: "white", fontSize: ".8rem" }}>
                    Home
                </Button>
                <FavoriteIcon sx={{ fontSize: "medium" }} />
                <Button onClick={() => navigate("/home")} sx={{ paddingLeft: 1, paddingRight: 3, color: "white", fontSize: ".8rem" }}>
                    Saved
                </Button>
                <AddCircleIcon sx={{ fontSize: "medium" }} />
                <Button onClick={() => navigate("/home")} sx={{ paddingLeft: 1, paddingRight: 3, color: "white", fontSize: ".8rem" }}>
                    Create
                </Button>
                <LogoutIcon sx={{ fontSize: "medium" }} />
                <Button onClick={logout} sx={{ paddingLeft: 1, paddingRight: 3, color: "white", fontSize: ".8rem" }}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}