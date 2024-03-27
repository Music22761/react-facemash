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
import { PictureGetRanking } from "../model/PictureModel";

function RankPage() {
  const [user, setUser] = useState<UsersGetRespose[]>();
  const [rank, setRank] = useState<PictureGetRanking[]>();
  const [rankLevel, setRankLevel] = useState<string[]>();
  // const [rankYester, setRankYester] = useState<PictureGetRankingYesterDay[]>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const level: string[] = [];

  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    setLoading(true);
    try {
      const res = await services.getUserById(id);
      const resRank = await services.getPictureRanking();
      const resRankYesterday = await services.getPictureRankingYesterday();

      console.log(resRank);
      console.log(resRankYesterday);

      resRank.map((e) => {
        const index = resRankYesterday.findIndex(
          (item) => item.picture_id === e.id
        );
        if (index !== -1) {
          // ถ้าพบว่า picture_id มีค่าเท่ากับ e.id
          const diff = e.ranking - (index + 1);
          console.log(
            "ToDay Index: " +
              (index + 1) +
              ", Difference: " +
              diff +
              " Name: " +
              e.name
          );
          const rank = calLevel(diff);
          console.log("Rank: " + rank);

          // setRankLevel([rank])
          level.push(rank);
        } else {
          console.log("Index: -1");
        }
      });

      setRankLevel(level);

      setUser(res);
      setRank(resRank);
      console.log("Array:" + level[1]);

      console.log("AutoLoad Appbar");
      // console.log(resRank);
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

  function goToProfile(id: number, role: number) {
    if (role == 1 || role == 99) {
      navigate(`/profileUser?id=${id}&back${1}&role${role}`);
    } else {
      alert("Login ก่อนครับ ถึงจะดูข้อมูลเจ้าของรูปได้");
    }
  }

  function calLevel(rank: number) {
    if (rank < 0) {
      return `+${rank * -1}`;
    } else if (rank > 0) {
      return `-${rank}`;
    } else {
      return "ไม่เปลี่ยน";
    }
  }

  function rankChkLog(role: number) {
    if (role == 1 || role == 99) {
      return (
        <Link to={"/"} onClick={()=>localStorage.clear()}>
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
      )
    }else{
      return (<div></div>)
    }
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
                  Rank Picture
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
                  <ArrowBackIcon />
                </IconButton>

                <div style={{ padding: "5px" }}></div>

                {rankChkLog(Number(user?.[0]?.role))}

              </Toolbar>
            </AppBar>
          </Box>

          <Card
            style={{
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "10%",
              backgroundColor: "pink",
              minWidth: "500px",
              marginTop: "10vh",
            }}
          >
            <Typography variant="h4">Today</Typography>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                overflowY: "auto",
                maxHeight: "60vh",
              }}
            >
              {rank?.slice(0, 10).map((e) => (
                <ListItem
                  style={{
                    backgroundColor: "pink",
                    borderRadius: "30px",
                    border: "2px solid grey",
                    marginBottom: "5%",
                  }}
                >
                  <ListItemAvatar>
                    <IconButton onClick={() => goToProfile(e.user_id, Number(user?.[0]?.role))}>
                      <Avatar
                        style={{
                          border: "5px solid black",
                          width: "15vh",
                          height: "15vh",
                        }}
                        src={e.path}
                      ></Avatar>
                    </IconButton>
                  </ListItemAvatar>
                  <Typography variant="h5">
                    Rank:{e.ranking} {rankLevel?.[e.ranking - 1]}
                    <br />
                    Name:{e.name}
                    <br />
                    Score:{e.score} <br />
                  </Typography>
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
