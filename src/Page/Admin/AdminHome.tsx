import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Service } from "../../api/service";
import { useEffect, useState } from "react";
import { UsersGetRespose } from "../../model/UserModel";
import CircularProgress from "@mui/material/CircularProgress";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
// import '../../css/Profile.css'

import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";

export default function AdminHome() {
  const [users, setUsers] = useState<UsersGetRespose[]>();
  const [user, setUser] = useState<UsersGetRespose[]>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));

  useEffect(() => {
    autoLoad(id);
  }, []);

  const autoLoad = async (id: number) => {
    setLoading(true);
    try {
      const resUser = await services.getUserById(id);
      const resAllUser = await services.getAllUser();
      setUser(resUser);
      setUsers(resAllUser);
      console.log("AutoLoad Appbar");
      console.log(resUser);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  const services = new Service();

  function goToRank() {
    navigate(`/rank`);
  }

  function goToProfile(id: number, role: number) {
    navigate(`/profileUser?id=${id}&back${1}&role${role}`);
  }

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CircularProgress />
        </div>
      ) : (
        <div>
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
                    goToRank();
                  }}
                >
                  <FormatListNumberedIcon />
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

          <Card
            style={{
              width: "70vh",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10vh",
              padding: "5%",
              backgroundColor: "pink",
            }}
          >
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h3"
                style={{
                  textAlign: "center",
                  marginTop: "5vh",
                  marginBottom: "5vh",
                }}
              >
                Users All
              </Typography>

              {users?.map((e) => (
                <ListItem
                  style={{
                    backgroundColor: "pink",
                    borderRadius: "30px",
                    border: "2px solid grey",
                    marginBottom: "5%",
                  }}
                >
                  <ListItemAvatar>
                    <IconButton
                      onClick={() => {
                        goToProfile(e.id, e.role);
                      }}
                    >
                      <Avatar
                        style={{
                          marginRight: "10vh",
                          border: "5px solid black",
                          width: "20vh",
                          height: "20vh",
                        }}
                        src={e.picture}
                      ></Avatar>
                    </IconButton>
                  </ListItemAvatar>
                  <ListItemText
                    style={{}}
                    primary={e.name}
                    secondary={e.email}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      )}
    </>
  );
}
