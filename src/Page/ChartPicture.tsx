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
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Service } from "../api/service";
import { UsersGetRespose } from "../model/UserModel";
import { PictureGetResponse } from "../model/PictureModel";
import { VoteChart7Day } from "../model/VoteModel";
import { BarChart } from "@mui/x-charts/BarChart";
// import { Score } from "@mui/icons-material";

function ChartPicture() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UsersGetRespose[]>();
  const [picture, setPicture] = useState<PictureGetResponse[]>();
  const [voteScore, setVoteScore] = useState<VoteChart7Day>();
  const scoreData = voteScore?.voteChart?.map((item) => item?.[0]?.score) || [];
  const dateTimes =
    voteScore?.voteChart?.map((item) => {
      const dateTime = new Date(item?.[0]?.date_time);
      const day = dateTime.getDate(); // วัน
      const month = dateTime.getMonth() + 1; // เดือน (เพิ่ม 1 เพราะเดือนเริ่มที่ 0)
      const year = dateTime.getFullYear(); // ปี
      return `${day}-${month}-${year}`; // รวมวัน เดือน ปี เข้าด้วยกัน
    }) || [];

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
      const resVote = await services.getPictureScore7Day(picId);
      const resPic = await services.getPictureById(picId);
      setUser(res);
      setPicture(resPic);
      setVoteScore(resVote);

      for (let index = 0; index < resVote.voteChart.length; index++) {
        console.log("In resVote Loop");

        console.log(resVote?.voteChart?.[index]?.[0].date_time);
        // setScore([resVote?.voteChart?.[index]?.[0].score]);
      }
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
            <Card style={{ width: "50%", marginBlock: "5%", marginLeft: "5%" }}>
              <CardMedia component="img" image={picture?.[0].path} alt="Cat" />
            </Card>

            <BarChart
              series={[
                { data: scoreData }
              ]}
              height={290}
              xAxis={[{ data: dateTimes, scaleType: "band" }]}
            />
          </Card>
        </div>
      )}
    </>
  );
}
export default ChartPicture;
