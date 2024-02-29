import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Service } from "../../api/service";
import { UsersGetRespose } from "../../model/UserModel";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function AdminAppbar(bk:number) {
  const [user, setUser] = useState<UsersGetRespose[]>();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
//   const back = Number(searchParams.get("back"));

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    //   setLoading(true);
    try {
      const res = await services.getUserById(id);
      setUser(res);
      console.log("AutoLoad Appbar");
      console.log(res);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      // setLoading(false);
    }
  };

  const services = new Service();

  function navigateTo() {
    navigate(`/rank`);
  }

  function goBackBtn(back: number) {
    if (back == 1) {
      return (
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          style={{ width: "50px", color: "blue" }}
          sx={{ mr: 2 }}
          onClick={() => {
            console.log("AppbarInProfile");
            goBack();
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      );
    }
  }

  function goBack() {
    navigate(-1);
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
              {user?.map((e) => e.name)}
            </Typography>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {user?.map((e) => e.email)}
            </Typography>
            <span></span>

            <div style={{ padding: "5px" }}></div>

            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              style={{ width: "50px", color: "blue" }}
              sx={{ mr: 2 }}
              onClick={() => {
                console.log("AppbarInProfile");
                navigateTo();
              }}
            >
              <FormatListNumberedIcon />
            </IconButton>

            <div>{goBackBtn(bk)}</div>

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
}
