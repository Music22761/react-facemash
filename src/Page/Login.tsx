import {
  AppBar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import "../css/Login.css";
import { Service } from "../api/service";
import { UsersGetRespose } from "../model/UserModel";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";

function LoginPage() {
  const navigate = useNavigate();
  const services = new Service();
  const [users, setUsers] = useState<UsersGetRespose[]>([]);
  const [loading, setLoading] = useState(false);

  let email = "";
  let password = "";

  useEffect(() => {
    autoLoad();
  }, []);

  const autoLoad = async () => {
    setLoading(true);
    try {
      const res = await services.getAllUser();
      setUsers(res);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  function navigateTo(id: number, role: number) {
    console.log("navigate ID" + id);

    if (role == 1) {
      navigate(`/homeAfterLog?id=${id}&role=${role}`);
    } else {
      navigate(`/adminHome?id=${id}&role=${role}`);
    }
  }

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: "pink" }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  style={{ width: "50px" }}
                >
                  <Link to={"/"}>
                    <HomeIcon />
                  </Link>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  News
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10vh",
            }}
          >
            <Card
              style={{
                borderRadius: "30px",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "pink",
                width: "50vh",
                height: "80vh",
              }}
            >
              <h1>Log in</h1>
              <Divider />

              <TextField
                // inputRef={emailRef}
                placeholder="Email"
                sx={{ m: 1, width: "90%" }}
                type="email"
                autoComplete="current-email"
                onChange={(e)=>{
                  email = e.target.value;
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

              <TextField
                // inputRef={passwordRef}
                placeholder="Password"
                sx={{ m: 1, width: "90%" }}
                type="password"
                autoComplete="current-password"
                onChange={(e)=>{
                  password = e.target.value;
                }}
                InputProps={{
                  sx: { borderRadius: "50px", bgcolor: "white" },
                  startAdornment: (
                    <LockIcon
                      fontSize="large"
                      sx={{ color: "black", marginRight: "20px" }}
                    />
                  ),
                }}
              />

              <Button
                style={{ width: "100px", backgroundColor: "purple" }}
                variant="contained"
                onClick={() => {
                  getAll();
                  console.log(email);
                  console.log(password);
                  // btnClick(email,password);
                  users.map((e) => {
                    // console.log("In Map "+email);
                    try {
                      if (String(e.email) === String(email)) {
                        console.log("Email Chk");

                        if (String(e.password) === String(password)) {
                          console.log("Password Chk");

                          navigateTo(e.id, e.role);
                          alert("Login Success!! Welcome to FaceMash");
                        }
                      }
                    } catch (error) {
                      console.log("Access Denied!!: ", error);
                    }
                  });
                }}
              >
                Log In
              </Button>
            </Card>
          </div>
        </>
      )}
    </>
  );

  async function getAll() {
    console.log("get All Function");
    const res = await services.getAllUser();
    setUsers(res);
    console.log(res);
  }
}

export default LoginPage;
