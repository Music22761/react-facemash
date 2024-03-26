import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";

import { Service } from "../../api/service";
import { UsersGetRespose } from "../../model/UserModel";
import { PictureGetResponse } from "../../model/PictureModel";
import TimelineIcon from '@mui/icons-material/Timeline';


function InfoPicture() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UsersGetRespose[]>();
  const [picture, setPicture] = useState<PictureGetResponse[]>();
  const navigate = useNavigate();

  const services = new Service();

  const id = Number(searchParams.get("id"));
  const picId = Number(searchParams.get("picId"));

  function navigateTo() {
    navigate(-1);
  }

  function goToChartPicture(id:number,picId:number) {
    navigate(`/chartPicture?id=${id}&picId=${picId}`);
  }


  useEffect(() => {
    autoLoad(id,picId);
  }, [id]);

  const autoLoad = async (id: number,picId:number) => {
    console.log(id);
    
    setLoading(true);
    try {
      const res = await services.getUserById(id);
      const resPic = await services.getPictureById(picId);
      setUser(res);
      setPicture(resPic);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CircularProgress />
          </div>
        </>
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
              {user?.[0]?.name}
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
                goToChartPicture(id,picId);
              }}
            >
              <TimelineIcon />
            </IconButton>

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
              <ArrowBackIcon />
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
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50vw",
          height: "80vh",
          borderRadius: "40px",
          backgroundColor: "pink",
        }}
      >
        <Typography
          variant="h4"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Picture Info
        </Typography>

        <Card style={{ width: '60%', height: '60%', display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
          <Card sx={{ width: "85%" }}>
            <CardMedia
              component="img"
              sx={{
                objectFit: "cover", // ให้ภาพปรับขนาดและตัดที่เหลือขอบ
                width: "100%",
                height: "100%", // ให้ภาพเต็มพื้นที่ของ Card
              }}
              image={
                picture?.[0]?.path
              }
              alt="Selected Image"
            />
          </Card>
        </Card>

        <Typography
          variant="h4"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Name : {picture?.[0].name} <br />
          Score : {picture?.[0].score}
        </Typography>

      </Card>
        </div>
      )}
    </>
  );
}

export default InfoPicture;
