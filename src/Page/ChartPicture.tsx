import {
  AppBar,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Service } from "../api/service";
import { UsersGetRespose } from "../model/UserModel";
import { PictureGetResponse } from "../model/PictureModel";
// import { Score } from "@mui/icons-material";

function ChartPicture() {
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

  useEffect(() => {
    autoLoad(id, picId);
  }, [id]);

  const autoLoad = async (id: number, picId: number) => {
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
            style={{
              width: "70vw",
              height: "70vh",
              marginTop: "5vh",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Card style={{width:'50%',marginBlock:'5%',marginLeft:'5%'}}>
              <CardMedia
                component="img"
                image={picture?.[0].path}
                alt="Cat"
              />
            </Card>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12], label: "วันที่" }]} //กำหนดค่าแกน
              series={[
                {
                  data: [1, 5, 10],
                },
              ]}
              yAxis={[{ label: "คะแนน" }]}
              width={500}
              height={300}
            />
          </Card>
        </div>
      )}
    </>
  );
}
export default ChartPicture;
