import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  Divider,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
// import { useRef } from "react";

import "../css/Register.css";

function RegisterPage() {
  const navigate = useNavigate();

  // const nameRef = useRef<HTMLInputElement>(null);
  // const emailRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);
  // const confirmPasswordRef = useRef<HTMLInputElement>(null);

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";

  function btnRegister(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    console.log("Btn Register");
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    navigateTo(name, email, password, confirmPassword);
  }

  function navigateTo(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    navigate(
      `/?name=${name}&email=${email}&password=${password}&confirmPassword=${confirmPassword}`
    );
  }

  return (
    <>
      <body>
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

          <Card className="card" style={{backgroundColor:'pink',borderRadius:'30px'}}>
            <h1>Sign In</h1>
            <Divider />
            <h2>กรุณาลงทะเบียน</h2>
            <div>
              <input
                className="input"
                type="text"
                id="name"
                placeholder="Name"
                onChange={(event) => {
                  name = event.target.value;
                }}
              />

              <input
                className="input"
                type="email"
                id="email"
                placeholder="Email"
                onChange={(event) => {
                  email = event.target.value;
                }}
              />

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
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={(event) => {
                  confirmPassword = event.target.value;
                }}
              />
            </div>
            
            <Button
              style={{ borderRadius:'30px',width: "100px", backgroundColor: "purple" }}
              variant="contained"
              onClick={() => {
                if (name && email && password && confirmPassword) {
                  if (password == confirmPassword) {
                    btnRegister(name, email, password, confirmPassword);
                    alert("Register Success!!");
                  }else{
                    alert("Password ไม่ตรงกัน กรุณาใส่ให้ตรงกัน");
                  }
                }else{
                  alert("กรุณาใส่ข้อมูลให้ครบทุกช่อง");
                }
                
              }}
            >
              Sign In
            </Button>
          </Card>
      </body>
    </>
  );
}

export default RegisterPage;
