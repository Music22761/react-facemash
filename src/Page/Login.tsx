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
import { useEffect, useRef, useState } from "react";
import "../css/Login.css";
import { Service } from "../api/service";
import { UsersGetRespose } from "../model/UserModel";

function LoginPage() {
  const navigate = useNavigate();
  const services = new Service();
  const [users, setUsers] = useState<UsersGetRespose[]>([]);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
                style={{
                  padding: "10px",
                  textAlign: "center",
                  alignItems: "center",
                }}
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                ref={emailRef}
                onChange={(e) => {
                  email = e.target.value;
                  console.log("Value: " + e.target.value);
                  console.log("Input E: " + password);
                }}
              />
              <TextField
                style={{ padding: "10px" }}
                type="password"
                id="password"
                label="Password"
                variant="outlined"
                ref={passwordRef}
                onChange={(e) => {
                  password = e.target.value;
                  console.log("Value: " + e.target.value);
                  console.log("Input P: " + password);
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
