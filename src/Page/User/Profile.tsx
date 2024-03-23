import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  IconButton,
  Button,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
// import { useRef } from "react";

import "../../css/Profile.css";
import { useEffect, useState } from "react";
import { UsersGetRespose } from "../../model/UserModel";
import { Service } from "../../api/service";
import { PictureGetResponse } from "../../model/PictureModel";
import React from "react";

function ProfilePage() {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<UsersGetRespose[]>([]);
  // const user: UsersGetRespose = JSON.parse(localStorage.getItem("objUser")!);
  const [picture, setPicture] = useState<PictureGetResponse[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [upload, setUpload] = useState("");
  const [nameS, setName] = useState(null);
  const [emailS, setEmail] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const id = Number(searchParams.get("id"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const services = new Service();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    //ทำไฟล์เป็น formData
    const formData = new FormData();
    formData.append("file", file);

    setUpload(formData);

    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const openFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  let name = "";
  let email = "";

  function btnEdit(name: string, email: string) {
    console.log("แก้ไขข้อมูลสำเร็จ");
    console.log("name: " + name);
    console.log("email: " + email);
    setName(name);
    setEmail(email);
  }

  useEffect(() => {
    // console.log("storage "+user.id);

    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    setLoading(true);
    try {
      const resUser = await services.getUserById(id);
      setUser(resUser);
      localStorage.setItem("objUser", JSON.stringify(resUser));
      const resPic = await services.getPictureByUID(id);
      setPicture(resPic);
      console.log("AutoLoad Appbar");
      // console.log(resUser);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  function goToAddPicture() {
    navigate(`/addPicture?id=${id}`);
  }

  function goToEditPicture(id: number, picId: number) {
    navigate(`/editPicture?id=${id}&picId=${picId}`);
  }

  function goToChangePassword(id: number) {
    navigate(`/passwordChange?id=${id}`);
  }

  function goToRank() {
    navigate(`/rank?id=${id}`);
  }

  function goBack() {
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
                  {user?.[0]?.name}
                  {/* {user.name} */}
                </Typography>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  {user?.[0]?.email}
                  {/* {user.email} */}
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
                    goToAddPicture();
                  }}
                >
                  <AddPhotoAlternateIcon />
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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              // flexWrap:'wrap',
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
                  marginTop: "20px",
                  width: "150px",
                  height: "150px",
                  border: "5px solid black",
                  backgroundColor: "white",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
                src={
                  imageUrl ||
                  user?.[0]?.picture ||
                  "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                }
                alt="Selected Image"
                onClick={openFileInput}
              />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <div>
                <TextField
                  placeholder={user?.[0]?.name}
                  sx={{ m: 1, width: "90%" }}
                  type="name"
                  id="name"
                  autoComplete="current-name"
                  onChange={(e) => {
                    name = e.target.value;
                  }}
                  InputProps={{
                    sx: { borderRadius: "50px", bgcolor: "white" },
                    startAdornment: (
                      <BadgeIcon
                        fontSize="large"
                        sx={{ color: "black", marginRight: "20px" }}
                      />
                    ),
                  }}
                />

                <TextField
                  placeholder={user?.[0]?.email}
                  sx={{ m: 1, width: "90%" }}
                  type="email"
                  id="email"
                  autoComplete="current-email"
                  onChange={(e) => {
                    email = e.target.value;
                    // setEmail(email);
                  }}
                  InputProps={{
                    sx: { borderRadius: "50px", bgcolor: "white" },
                    startAdornment: (
                      <EmailIcon
                        fontSize="large"
                        sx={{ color: "black", marginRight: "20px" }}
                      />
                    ),
                  }}
                />
              </div>

              <React.Fragment>
                <Button
                  className="button"
                  style={{
                    backgroundColor: "yellow",
                    width: "200px",
                    borderRadius: "30px",
                    color: "black",
                  }}
                  variant="contained"
                  onClick={() => {
                    handleClickOpen();
                    // console.log(name + "/" + email);
                    btnEdit(name, email);
                    setName(name);
                    setEmail(email);
                  }}
                >
                  แก้ไขข้อมูล
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"คุณต้องการจะแก้ไขข้อมูลจริงหรือไม่ ??"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      กด ตกลง เพื่อที่จะแก้ไขและกด ยกเลิก เพื่อปิดหน้าต่าง
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>ยกเลิก</Button>
                    <Button
                      onClick={() => {
                        handleClose();
                        console.log(nameS + "/" + emailS);
                        editData(upload, nameS, emailS);
                        // edit(nameS, emailS, id);
                      }}
                      autoFocus
                    >
                      ตกลง
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>

              <Button
                className="button"
                style={{
                  backgroundColor: "orange",
                  width: "200px",
                  borderRadius: "30px",
                  color: "black",
                  marginTop: "5%",
                }}
                variant="contained"
                onClick={() => {
                  goToChangePassword(id);
                }}
              >
                เปลี่ยนรหัสผ่าน
              </Button>
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
                      subtitle={e.name}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${e.name}`}
                          onClick={() => {
                            goToEditPicture(user?.[0]?.id, e.id);
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

  async function editData(data: FormData, name: string, email: string) {
    console.log("ImageOnfireBase: " + data);

    console.log(user?.[0]?.picture);
    console.log(data);

    //Edit picture on firebase

    if (user?.[0]?.picture == null) {
      console.log("IF = Null: " + user?.[0]?.picture);

      const res = await services.postPictureOnFireBase(data);
      const img = String(res).split(" "); // แบ่งตรงเคื่องหมายวรรคตอน
      const resUrl = String(img[1]);
      console.log("Res URL: " + resUrl);
      const body = {
        name: name || undefined,
        email: email || undefined,
        picture: resUrl,
      };

      await services.putUserEdit(body, id);
      await autoLoad(id);
    } else if (user?.[0]?.picture != null) {
      const resDel = services.deletePictureOnFirebase(
        String(user?.[0]?.picture)
      );
      console.log(resDel);

      // รอให้รูปถูกลบเสร็จสมบูรณ์ก่อนที่จะทำการอัปโหลดรูปใหม่
      const res = await services.postPictureOnFireBase(data);
      const img = String(res).split(" "); // แบ่งตรงเคื่องหมายวรรคตอน
      const resUrl = String(img[1]);
      console.log(resDel);
      const body = {
        name: name || undefined,
        email: email || undefined,
        picture: resUrl,
      };
      await services.putUserEdit(body, id);
      await autoLoad(id);
    }
    // console.log("Upload Image On Fire Base: "+ img[1]);
  }
}

export default ProfilePage;
