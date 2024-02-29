import {
    AppBar,
  Avatar,
  Box,
  Card,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Service } from "../api/service";
import { UsersGetRespose } from "../model/UserModel";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PictureGetResponse } from "../model/PictureModel";

function RankPage() {
    const [user, setUser] = useState<UsersGetRespose[]>();
    const [picture, setPicture] = useState<PictureGetResponse[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams()
    const id = Number(searchParams.get("id"));

    //Sort
    const sortedPictures = picture.map((e) => e).sort((a, b) => b.score - a.score);
  
    useEffect(() => {
      autoLoad(id);
    }, []);
  
    const autoLoad = async (id:number) => {
      setLoading(true);
      try {
        const res = await services.getUserById(id);
        const resPic =  await services.getAllPicture();
        setUser(res);
        setPicture(resPic);
        console.log("AutoLoad Appbar");
        console.log(res);
        
        
      } catch (error) {
        console.error("Failed to load movie:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const services = new Service();
  
    function navigateTo() {
      navigate(-1);
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
                    navigateTo();
                  }}
                >
                  <ArrowBackIcon/>
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
                Rank Picture
              </Typography>

              {sortedPictures?.map((e) => (
                
                <ListItem
                  style={{
                    backgroundColor: "pink",
                    borderRadius: "30px",
                    border: "2px solid grey",
                    marginBottom: "5%",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      style={{
                        marginRight: "10vh",
                        border: "5px solid black",
                        width: "20vh",
                        height: "20vh",
                      }}
                      src={e.name}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={e.user_id}
                    secondary={e.score}
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

export default RankPage;
