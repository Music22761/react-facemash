import {
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useState, useEffect } from "react";
import { Service } from "../../api/service";
import { UsersGetRespose } from "../../model/UserModel";
import React from "react";

function PasswordChangePage() {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<UsersGetRespose[]>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const id = Number(searchParams.get("id"));
  const [open, setOpen] = React.useState(false);
  const [passwd, setPasswd] = useState<string>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const services = new Service();

  let currentPassword = "";
  let password = "";
  let newPassword = "";

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    setLoading(true);
    try {
      const res = await services.getUserById(id);
      setUser(res);
      console.log("AutoLoad Appbar");
      console.log(res);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  function goToRank() {
    navigate(`/rank?id=${id}`);
  }

  function goBack() {
    navigate(-1);
  }

  function btnChangePassword(password: string) {
    console.log("NewPassword: " + password);
    setPasswd(password)
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
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(event) => {
                    password = event.target.value;
                  }}
                />

                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="New Password"
                  onChange={(event) => {
                    newPassword = event.target.value;
                  }}
                />
              </div>

              <React.Fragment>
                <Button
                  className="button"
                  style={{
                    backgroundColor: "orange",
                    width: "200px",
                    borderRadius: "30px",
                    color: "black",
                  }}
                  variant="contained"
                  onClick={() => {
                    {
                      user?.map((e) => {
                        currentPassword = e.password;
                      });
                    }
                    // btnEdit(name, email, password, confirmPassword);
                    if (password != null && password.trim() != "") {
                      if (String(password) === String(currentPassword)) {
                        btnChangePassword(newPassword);
                        handleClickOpen();
                      } else {
                        alert("รหัสผ่านปัจจุบันไม่ถูกต้อง กรุณาใส่ใหม่ !!");
                      }
                    } else {
                      alert("กรุณากรอกข้อมูลให้ครบถ้วน !!");
                    }
                  }}
                >
                  เปลี่ยนรหัสผ่าน
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"คุณต้องการจะเปลี่ยนรหัสผ่านจริงหรือไม่ ??"}
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
                        chgPassword(passwd,id)
                        goBack();
                      }}
                      autoFocus
                    >
                      ตกลง
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </Card>
          </div>
        </div>
      )}
    </>
  );

  async function chgPassword(password: string | undefined, id: number) {
    const body = {
      password: password,
    };

    console.log("Password:" +password);

    // console.log(body.name);
    // console.log(body.email);

    console.log("Body :" + body);
    await services.putUserPassword(body, id);
    // alert("เปลี่ยนรัหสผ่าน สำเร็จ !! กลับไปหน้าโปรไฟล์");
 
    // autoLoad(id);
  }
}

export default PasswordChangePage;
