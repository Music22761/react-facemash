import Card from "@mui/material/Card";
import {
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  CardActionArea,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Service } from "../../api/service";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { VoteModel } from "../../model/VoteModel";
import { PictureGetResponse } from "../../model/PictureModel";
import { UsersGetRespose } from "../../model/UserModel";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export default function HomePageAfterLogin() {
  // const userStorage:UsersGetRespose = JSON.parse(localStorage.getItem("objUser")!);
  //ใช้ localstorage มีปัญหา
  const [picArr, setPicArr] = useState<PictureGetResponse[]>();
  const [user, setUser] = useState<UsersGetRespose[]>();
  const [openDialog, setOpenDialog] = useState(false); // สถานะของ dialog
  // console.log("Local Storeage: ",userStorage);

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const services = new Service();

  const id = Number(searchParams.get("id"));

  const navigate = useNavigate();

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    console.log(id);

    setLoading(true);
    try {
      const res = await services.getAllPicture();
      const resUser = await services.getUserById(id);
      // setPicture(res);
      setUser(resUser);
      console.log(res);

      const currentDate = new Date();
      for (let i = 0; i < 5; i++) {
        // เริ่มต้นจากวันที่ปัจจุบัน ลดวันที่ทีละ 1 ไปจนถึง 5 วันถัดไป
        currentDate.setDate(currentDate.getDate() - 1); // ลดวันที่ทีละ 1
        const formattedDate = currentDate.toISOString().split("T")[0];
        console.log(formattedDate);
      }

      const randomIndex1 = Math.floor(Math.random() * res.length);
      const randomIndex2 = Math.floor(Math.random() * res.length);

      if (res[randomIndex1].id == res[randomIndex2].id) {
        console.log("IF ID : " + res[randomIndex1].id);
        console.log("IF Name : " + res[randomIndex2].name);
      } else {
        console.log("Else ID : " + res[randomIndex1].id);
        console.log("Else Name : " + res[randomIndex2].name);
        setPicArr([res[randomIndex1], res[randomIndex2]]);
      }
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

   // Function เปิด dialog
   const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function ปิด dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  async function calScore(win: PictureGetResponse, loss: PictureGetResponse) {
    console.log("In CalCulate");
    console.log("Win ID: " + win.id);
    console.log("Win Name: " + win.name);
    console.log("Win Score: " + win.score);
    console.log("Win User_ID: " + win.user_id);
    console.log("Loss ID: " + loss.id);
    console.log("Loss Name: " + loss.name);
    console.log("Loss Score: " + loss.score);
    console.log("Loss User_ID: " + loss.user_id);

    const K: number = 20;
    // ค่าคาดหวัดผลลัพธ์
    const Ew: number = 1 / (1 + 10 ** ((loss.score - win.score) / 400));
    const El: number = 1 / (1 + 10 ** ((win.score - loss.score) / 400));
    // คะแนนล่าสุด
    const w: number = Math.floor(win.score + K * (1 - Ew));
    const l: number = Math.floor(loss.score + K * (0 - El));
    // ผลการคำนวน
    console.log("Win Score : " + w);
    // console.log("Win Score : "+(win.score));
    console.log("Lose Score : " + l);

    // const scoreW:number;
    // const scoreL:number;
    // console.log("Score Win After Cal: "+calculateScore(win.score+w))
    // console.log("Score Loss After Cal: "+calculateScore(loss.score+l))

    // สร้าง body สำหรับการ insert vote
    const bodyWin = {
      user_id: win.user_id,
      picture_id: win.id,
      score: w,
    };
    console.log("Body Win: " + bodyWin.score);

    const bodyLose = {
      user_id: loss.user_id,
      picture_id: loss.id,
      score: calculateScore(l),
    };
    console.log("Body Lose: " + bodyLose.score);

    await services.postVotePicture(bodyWin); //บันทึกการ vote
    await services.postVotePicture(bodyLose); //บันทึกการ vote
    const resVote = await services.getVoteAll(); // ดึงข้อมูลการ vote ทั้งหมด
    const num = resVote.length + 50; //ดึงตัวสุดท้ายของข้อมูล + 50 คือข้อมูลที่ลบออกจาก database
    console.log("Number Vote: " + num);
    console.log("Number Vote + 1: " + num + 1);

    const voteIdWin: VoteModel[] = await services.getVoteById(num); // ดึงเอาค่า vote ที่สร้าง ล่าสุด
    const voteIdLoss: VoteModel[] = await services.getVoteById(num + 1);
    console.log("Vote Win ID : " + voteIdWin?.[0].picture_id);
    console.log("Vote Loss ID : " + voteIdLoss?.[0].picture_id);

    // สร้าง body เพื่อเอาไปใช้ในการ update score
    const bodyPictureWin = {
      score: voteIdWin?.[0].score,
    };
    const bodyPictureLoss = {
      score: voteIdLoss?.[0].score,
    };
    await services.updatePictureScore(bodyPictureWin, win.id); //เอาค่า vote ล่าสุดไป update ใน picture
    await services.updatePictureScore(bodyPictureLoss, loss.id); //เอาค่า vote ล่าสุดไป update ใน picture

    handleOpenDialog();
    autoLoad(id);
  }

  function calculateScore(score: number) {
    if (score <= 0) {
      return 0;
    } else if (score > 0) {
      return score;
    }
  }

  function goToRank() {
    navigate(`/rank`);
  }

  //Navigate
  function btnProfile(id:number) {
    console.log("Btn Profile");
    navigate(`/profile?id=${id}`);
  }

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
                onClick={()=>autoLoad(id)}
              >
                  <HomeIcon />
              </IconButton>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                {user?.[0]?.name}
              </Typography>
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
        
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "15vh",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {picArr?.map((e, i = 0) => (
              <Card
                sx={{
                  maxWidth: 600,
                  minWidth: 300,
                  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
                  marginRight: "50px",
                }}
              >
                <CardActionArea
                  onClick={async () => {
                    console.log("EID: " + e?.id);
                    console.log("I: " + i);

                    if (i == 0) {
                      await calScore(picArr[0], picArr[1]);
                    } else if (i == 1) {
                      await calScore(picArr[1], picArr[0]);
                    }
                    i++;
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={e?.path}
                  />
                  <CardContent>
                    <Typography
                      style={{ textAlign: "center" }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {e?.name} <br />
                      {e?.score}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            onClick={() => handleCloseDialog()}
          >
            <DialogTitle>ผลลัพธ์</DialogTitle>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  width: "500px",
                  height: "300px",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                    }}
                    component="img"
                    // image={obj.wImg}
                  />
                  <h4
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {/* {obj.win} (ชนะ) */}
                  </h4>
                  <br />
                  <p>ค่าคาดหวังคือ: </p>
                  <p>คะแนนเดิมมีอยู่: </p>
                  <p>ได้คะแนนเพิ่มขึ้น: </p>
                  <p>คะแนนใหม่ที่ได้คือ: </p>
                </Box>
                <hr />
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                    }}
                    component="img"
                    // image={obj.lImg}
                  />
                  <h4
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {/* {obj.lose} (แพ้) */}
                  </h4>
                  <br />
                  <p>ค่าคาดหวังคือ:</p>
                  <p>คะแนนเดิมมีอยู่:</p>
                  <p>คะแนนลดลง:</p>
                  {/* {obj.lNew < 0 ? (
                    <p>คะแนนใหม่ที่ได้คือ: 0</p>
                  ) : (
                    <p>คะแนนใหม่ที่ได้คือ: {obj.lNew}</p>
                  )} */}
                </Box>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}

// export default HomePageAfterLogin;
