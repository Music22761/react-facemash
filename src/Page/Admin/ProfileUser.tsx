import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  IconButton,
  Card,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Avatar,
  CircularProgress,
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "../../css/Profile.css";
import { useEffect, useState } from "react";
import { UsersGetRespose } from "../../model/UserModel";
import { Service } from "../../api/service";
import { PictureGetResponse } from "../../model/PictureModel";

function ProfileUserPage() {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<UsersGetRespose[]>([]);
  const [picture, serPicture] = useState<PictureGetResponse[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const id = Number(searchParams.get("id"));

  const services = new Service();

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    setLoading(true);
    try {
      const resUser = await services.getUserById(id);
      const resPic = await services.getPictureByUID(id);
      setUser(resUser);
      serPicture(resPic);
      console.log("AutoLoad Appbar");
      console.log(resUser);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  function goToInfoPicture(id:number,picId:number) {
    navigate(`/infoPicture?id=${id}&picId=${picId}`);
  }

  function goToRank() {
    navigate(`/rank?id=${id}`);
  }

  function goBack() {
    navigate(-1);
  }

  function goToHomeAfterLogin(id:number) {
    navigate(`/homeAfterLog?id=${id}`)
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
                  onClick={()=>(goToHomeAfterLogin(id))}
                >
                    <HomeIcon />
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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "5vh",
            }}
          >
            <Card
              className="card"
              style={{
                backgroundColor: "pink",
                marginRight: "10%",
                borderRadius: "30px",
              }}
            >
              <Avatar
                style={{
                  border: "5px solid black",
                  margin: "10%",
                  width: "30vh",
                  height: "30vh",
                }}
                alt="Remy Sharp"
                src={user?.[0]?.picture}
              />

              <div>
                <input
                  className="input"
                  type="text"
                  id="name"
                  placeholder={String(user?.map((e) => e.name))}
                />

                <input
                  className="input"
                  type="email"
                  id="email"
                  placeholder={String(user?.map((e) => e.email))}
                />
              </div>
            </Card>
            <div
              style={{
                borderRadius: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "pink",
                width: "30vw",
                height: "70vh",
              }}
            >
              <ImageList sx={{ width: "30vw", height: 450 }}>
                <ImageListItem key="Subheader" cols={2}>
                  <ListSubheader component="div">Pictures</ListSubheader>
                </ImageListItem>
                {picture?.map((e) => (
                  <ImageListItem key={e.id}>
                    <img
                      srcSet={e.path}
                      src={e.path}
                      alt={e.path}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={e.name}
                      subtitle={e.score}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${e.name}`}
                          onClick={()=>{
                            goToInfoPicture(user?.[0]?.id,e.id);
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileUserPage;
