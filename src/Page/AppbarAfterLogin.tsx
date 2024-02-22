import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useNavigate } from "react-router-dom";

export default function AppbarAfterLogin(
  id: number,
  name: string,
  email: string,
  password: string,
  // way:number,
) {
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // function btnProfile(id:number, name:string, email: string, password: string) {
  //   console.log("Btn Profile");
  //   navigateTo(id,name, email, password);
  // }

  function navigateTo(
    id: number,
    name: string,
    email: string,
    password: string,
  ) {
    navigate(
      `/profile?id=${id}&name=${name}&email=${email}&password=${password}`
    );
  }
  return (
    <>
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
              {typeof Number(id) + " " + name}
            </Typography>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {email}
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
                // if (way == 1) {
                //    goBack();
                // } else {
                //   navigateTo(id,name,email,password);
                // }
                navigateTo(id,name,email,password);
              }}
            >
              <AccountCircleRoundedIcon/>
              {/* {changeIcon(way)} */}
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
    </>
  );

  // const changeIcon(idx:number)=> {
  //   if (idx == 1) {
  //     <AccountCircleRoundedIcon/>
  //   } else {
  //     <ArrowBackIcon/>
  //   }
  // }

}
