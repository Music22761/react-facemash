import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { Service } from "../../api/service";
import { useEffect, useState } from "react";
import { UsersGetRespose } from "../../model/UserModel";
import CircularProgress from "@mui/material/CircularProgress";
import { Service } from "../../api/service";

export default function AppbarAfterLogin(id:number) {
  // const user:UsersGetRespose = JSON.parse(localStorage.getItem("objUser")!);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UsersGetRespose[]>();
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get("id");

  const services = new Service();
  
  function btnProfile(id:number) {
    console.log("Btn Profile");
    navigateTo(id);
  }

  useEffect(() => {
    autoLoad();
  }, []);

  const autoLoad = async () => {
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

  // const services = new Service();

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
                {/* {user.name} */}
              </Typography>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                {user?.map((e)=>(e.email))}
                {/* {user.email} */}
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

              <Link to={"/"} onClick={localStorage.clear}>
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
