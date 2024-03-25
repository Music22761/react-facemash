import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Card,
  TextField,
  CardMedia,
  styled,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import TimelineIcon from "@mui/icons-material/Timeline";
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Service } from "../../api/service";
import { UsersGetRespose } from "../../model/UserModel";
import { PictureGetResponse } from "../../model/PictureModel";
import { DeleteOutline, Edit } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function EditPicture() {
  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get("id"));
  const picId = Number(searchParams.get("picId"));

  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UsersGetRespose[]>();

  // const user:UsersGetRespose = JSON.parse(localStorage.getItem("objUser")!);
  const [picture, setPicture] = useState<PictureGetResponse[]>();
  const [upPic, setUpPic] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const services = new Service();

  function navigateTo() {
    navigate(-1);
  }

  function goToChartPicture(id: number, picId: number) {
    navigate(`/chartPicture?id=${id}&picId=${picId}`);
  }

  function goToHomeAfterLogin(id: number) {
    navigate(`/homeAfterLog?id=${id}`);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    setUpPic(formData);
    setImageUrl(imageUrl);
  };

  async function deletePictureOnfirebase(picture_id: number) {
    console.log("Delete Picture: " + picture_id);
    console.log("path: " + picture?.[0]?.path);

    const resDelVote = await services.deleteVoteByPictureId(picture_id);
    const res = await services.deletePictureById(picture_id);

    console.log("Log Delt" + res);
    console.log("Log Delt Vote" + resDelVote);
    await services.deletePictureOnFirebase(String(picture?.[0]?.path));
  }

  async function addPicture(id: number, name: string, picture: string) {
    const body = {
      name: name,
      score: 0,
      user_id: id,
      path: picture,
    };

    console.log("Body");

    console.log(body.name);
    console.log(body.score);
    console.log(body.user_id);
    console.log(body.path, typeof body.path);

    console.log("Body :" + body);
    await services.postPicture(body);
    alert("เปลี่ยนรูปสำเร็จ");
    autoLoad(userId, picId);
  }

  async function uploadImageOnFireBase(
    data: FormData,
    id: number,
    name: string
  ) {
    console.log("ImageOnfireBase: " + data);

    const res = await services.postPictureOnFireBase(data);
    const img = String(res).split(" "); //แบ่งตรงเคื่องหมายวรรคตอน
    //  setUserImage(img[1])
    console.log("Upload Image On Fire Base: " + img[1]);

    await addPicture(id, name, String(img[1]));
  }

  async function editPicture(data: FormData, picture_id: number, name: string) {

    const resDelVote = await services.deleteVoteByPictureId(picture_id);
    console.log(resDelVote);
    
    services.deletePictureOnFirebase(String(picture?.[0]?.path));
    const res = await services.postPictureOnFireBase(data);
    const img = String(res).split(" "); //แบ่งตรงเคื่องหมายวรรคตอน
    console.log("IMG");
    console.log(img);
    
    const body = {
      name:name,
      score:0,
      path:String(img[1])
    }
    await services.updatePictureById(body,picture_id)
  }

  function titleDialog(status: number) {
    if (status == 1) {
      return `คุณต้องการจะ "ลบ" รูปภาพหรือไม่ ??`;
    } else {
      return `คุณต้องการจะ "แก้ไข" รูปภาพหรือไม่ ??`;
    }
  }

  function textDialog(status: number) {
    if (status == 1) {
      return `คุณต้องการจะ "ลบ" รูปภาพหรือไม่ ??`;
    } else {
      return `คุณต้องการจะ "แก้ไข" รูปภาพหรือไม่ ??`;
    }
  }

  useEffect(() => {
    console.log("Local In edit: " + userId);

    autoLoad(userId, picId);
  }, [userId]);

  const autoLoad = async (id: number, picId: number) => {
    console.log(id);

    setLoading(true);
    try {
      const res = await services.getUserById(id);
      const resPic = await services.getPictureById(picId);
      setUser(res);
      setPicture(resPic);
      console.log(resPic);
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
                  onClick={() => goToHomeAfterLogin(userId)}
                >
                  <HomeIcon />
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  {user?.[0]?.name}
                </Typography>
                <span></span>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  เปลี่ยนรูปภาพ
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
                    goToChartPicture(userId, picId);
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
              minWidth: "600px",
              padding:'1%'
              
            }}
          >
            <Card
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius:'30px',
                paddingTop:'1%'
              }}
            >
              <Card sx={{ width: "95%",borderRadius:'30px' }}>
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "cover", // ให้ภาพปรับขนาดและตัดที่เหลือขอบ
                    width: "100%",
                    height: "100%", // ให้ภาพเต็มพื้นที่ของ Card
                  }}
                  image={imageUrl || picture?.[0]?.path}
                  alt="Selected Image"
                />
              </Card>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={{margin:'1%'}}
              >
                Select Picture
                <VisuallyHiddenInput
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Card>

            <TextField
              margin="normal"
              name="name"
              label={picture?.[0]?.name}
              id="name"
              value={name}
              onChange={handleNameChange}
            />

            <Button
              variant="contained"
              style={{
                width: "200px",
                backgroundColor: "red",
                color: "black",
                borderRadius: "30px",
              }}
              onClick={() => {
                setStatus(1);
                handleClickOpen();
              }}
            >
              <DeleteOutline />
              Delete
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {titleDialog(Number(status))}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {textDialog(Number(status))}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>ยกเลิก</Button>
                <Button
                  onClick={() => {
                    handleClose();

                    if (status == 1) {
                      console.log("Delete Picture");
                      deletePictureOnfirebase(picId);
                      navigateTo();
                    } else {
                      console.log("Name: " + name + " |Type: " + typeof name);
                      if (name != null && name.trim() !== "") {
                        console.log("Edit Picture");
                        editPicture(upPic,picId,name);
                        navigateTo();
                      } else {
                        alert("ใส่ชื่อก่อนจ่ะ !! :)");
                      }
                    }
                  }}
                  autoFocus
                >
                  ตกลง
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              variant="contained"
              style={{
                width: "200px",
                backgroundColor: "yellow",
                color: "black",
                borderRadius: "30px",
                margin: "2%",
              }}
              onClick={() => {
                setStatus(2);
                handleClickOpen();
              }}
            >
              <Edit />
              Edit Picture
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}

export default EditPicture;
