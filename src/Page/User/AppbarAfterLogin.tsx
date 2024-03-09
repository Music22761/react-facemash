import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useNavigate } from "react-router-dom";
import { Service } from "../../api/service";
import { useEffect, useState } from "react";
import { UsersGetRespose } from "../../model/UserModel";
import CircularProgress from "@mui/material/CircularProgress";

export default function AppbarAfterLogin(id: number) {
  const [user, setUser] = useState<UsersGetRespose[]>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  function btnProfile(id:number) {
    console.log("Btn Profile");
    navigateTo(id);
  }

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    setLoading(true);
    try {
      const res = await services.getUserById(id);
      setUser(res);
      console.log("AutoLoad Appbar");
      console.log(res);
      
      
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  const services = new Service();

  function navigateTo(id: number) {
    navigate(`/profile?id=${id}`);
  }

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CircularProgress />
        </div>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" style={{ backgroundColor: "pink" }}>
            <Toolbar style={{ justifyContent: "space-between" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                style={{ width: "50px" }}
                sx={{ mr: 2 }}
              >
                <Link to={"/"}>
                  <HomeIcon />
                </Link>
              </IconButton>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                {user?.[0]?.name}
              </Typography>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                {user?.map((e)=>(e.email))}
              </Typography>
              <span></span>

              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                style={{ width: "50px", color: "blue" }}
                sx={{ mr: 2 }}
                onClick={() => {
                  console.log("AppbarInProfile");
                  btnProfile(id);
                }}
              >
                <AccountCircleRoundedIcon />
              </IconButton>

              <div style={{ padding: "5px" }}></div>

              <Link to={"/"}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  style={{ color: "red", width: "50px" }}
                  sx={{ mr: 2 }}
                >
                  <LogoutIcon />
                </IconButton>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}
