import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  Divider,
  TextField,
  Button,
  // FilledInput,
  // FormControl,
  // InputAdornment,
  // InputLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate, } from "react-router-dom";
import { useRef } from "react";

function RegisterPage() {
  // const [name,setName] = useState();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

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

    navigateTo(name,email,password,confirmPassword)
    
  }

  function navigateTo(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    navigate(`/?name=${name}&email=${email}&password=${password}&confirmPassword=${confirmPassword}`)
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
              // sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
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
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "pink",
            width: "50vh",
            height: "80vh",
          }}
        >
          <h1>Sign In</h1>
          <Divider />
          <h2>กรุณาลงทะเบียน</h2>
          <div>
            
            <TextField
              style={{ padding: "10px" }}
              type="text"
              id="name"
              label="Name"
              variant="outlined"
              ref={nameRef}
              onChange={(event) => {
                name = event.target.value;
              }}
            />
            <TextField
              style={{ padding: "10px" }}
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              ref={emailRef}
              onChange={(event) => {
                email = event.target.value;
              }}
            />
            <TextField
              style={{ padding: "10px" }}
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              ref={passwordRef}
              onChange={(event) => {
                password = event.target.value;
              }}
            />

            <TextField
              style={{ padding: "10px" }}
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              ref={confirmPasswordRef}
              onChange={(event) => {
                confirmPassword = event.target.value;
              }}
            />
          </div>
          <Button
            style={{ backgroundColor: "purple" }}
            variant="contained"
            onClick={() => {
              // console.log("Name: " + name);
              // console.log("Email: " + email);
              // console.log("Password: " + password);
              // console.log("Confirm Password: " + confirmPassword);
              btnRegister(name, email, password, confirmPassword);
              alert("Register Success!!");
            }}
          >
            Sign In
          </Button>
        </Card>
      </div>
    </>
  );
}

export default RegisterPage;
