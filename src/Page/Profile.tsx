
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Button, Card, Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef } from "react";
import user from '../json/User.json';

function ProfilePage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    const id = Number(searchParams.get("id"));

    const nameRef = useRef<HTMLInputElement>(null); 
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';

    function navigateTo() {
      navigate(-1);
    }


    user.map((e)=>{
      if (id == e.id) {
        name = e.name;
        email = e.email;
        password = e.password;
      }
    })

    function btnEdit(
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
      
    }

  return (
    <>
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
              {name}
            </Typography>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {email}
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
                navigateTo();
              }}
            >
              <ArrowBackIcon/>
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

      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',padding:'15vh'}}>
        <div style={{backgroundColor:'gray',width:'40vw',height:'70vh'}}>
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
              id="confirmPassword"
              label="confirmPassword"
              variant="outlined"
              ref={confirmPasswordRef}
              onChange={(event) => {
                confirmPassword = event.target.value;
              }}
            />
          </div>
          <Button
            style={{width:'100px', backgroundColor: 'yellow',color:'black' }}
            variant="contained"
            onClick={() => {
              btnEdit(name, email, password, confirmPassword);
              alert("Edit Success!!");
            }}
          >
            Edit
          </Button>
        </Card>
        </div>
        <div style={{backgroundColor:'green',width:'40vw',height:'70vh'}}></div>
      </div>


    </>
  );
}

export default ProfilePage;
