import {
  AppBar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../css/Login.css";
import user from "../json/User.json";

function LoginPage() {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  let email = "";
  let password = "";

  function btnLogin(id: number,name:string, email: string, password: string) {
    console.log("Btn Login");
    console.log(id);
    console.log(email);
    console.log(password);

    navigateTo(id,name, email, password);
  }

  function navigateTo(id: number, name:string, email: string, password: string) {
    navigate(`/homeAfterLog?id=${id}&name=${name}&email=${email}&password=${password}`);
  }

  return (
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
          padding: "5%",
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
            }}
          />

          {/* <Link to={"/homeAfterLog"}> */}
          <Button
            style={{ width: "100px", backgroundColor: "purple" }}
            variant="contained"
            onClick={() => {
              user.map((e) => {
                try {
                  if (e.email == email) {
                    if (e.password == password) {
                      btnLogin(e.id, e.name, e.email, e.password);
                      alert("Login Success!! Welcome to FaceMash");
                    }
                  }
                } catch (error) {
                  console.log("Access Denied!!: ",error);
                }
              });
            }}
          >
            Log In
          </Button>
          {/* </Link> */}
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
