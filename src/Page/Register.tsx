import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useRef } from "react";

import "../css/Register.css";
import { useState } from "react";
import { Service } from "../api/service";

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

function RegisterPage() {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);
  const [upload, setUpload] = useState();
  // const [userImage, setUserImage] = useState();
  const services = new Service();
 
  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";

  function btnRegister(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    console.log("Btn Register");
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    navigateTo(name, email, password, confirmPassword);

    uploadImageOnFireBase(upload,name,email,password) //ส่งไป upload ใน fireBase
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    //ทำไฟล์เป็น formData
    const formData = new FormData();
    formData.append('file', file);
    setUpload(formData); //เก็บไว้ใน setUpload
    setImgUrl(imageUrl);
  };

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

        <Card
          className="card"
          style={{ backgroundColor: "pink", borderRadius: "30px" }}
        >
          <h2>Sign In</h2>
          <Avatar
            style={{ width: "150px", height: "150px" }}
            src={
              imgUrl ||
              "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
            }
            alt="Selected Image"
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            style={{}}
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              id="file"
              onChange={handleFileChange}
            />
          </Button>

          <div>
            <TextField
              placeholder="name"
              sx={{ m: 1, width: "90%" }}
              type="name"
              id="name"
              autoComplete="current-email"
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
              placeholder="Email"
              sx={{ m: 1, width: "90%" }}
              type="email"
              id="email"
              autoComplete="current-email"
              onChange={(e) => {
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
              placeholder="Password"
              sx={{ m: 1, width: "90%" }}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
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

            <TextField
              placeholder="Confirm Password"
              sx={{ m: 1, width: "90%" }}
              type="confirmPassword"
              autoComplete="current-confirmPassword"
              onChange={(e) => {
                confirmPassword = e.target.value;
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
          </div>

          <Button
            style={{
              borderRadius: "30px",
              width: "100px",
              backgroundColor: "purple",
            }}
            variant="contained"
            onClick={() => {
              if (name && email && password && confirmPassword) {
                if (password == confirmPassword) {
                  btnRegister(name, email, password, confirmPassword);
                  alert("Register Success!!");
                } else {
                  alert("Password ไม่ตรงกัน กรุณาใส่ให้ตรงกัน");
                }
              } else {
                alert("กรุณาใส่ข้อมูลให้ครบทุกช่อง");
              }
            }}
          >
            Register
          </Button>
        </Card>
      </body>
    </>
  );

  async function  register(name:string,email:string,password:string,picture:string) {
    const body = {
      name: name,
      email: email,
      password: password,
      picture: picture,
      role: 1
    };

    console.log("Body");
    
    console.log(body.name);
    console.log(body.email);
    console.log(body.password);
    console.log(body.picture,typeof(body.picture));
    console.log(body.role);

    console.log("Body :"+body);
    await services.postUserRegister(body);
  }

  async function  uploadImageOnFireBase(data:FormData,name:string,email:string,password:string) {
    console.log("ImageOnfireBase: "+data);
 
    
   const res = await services.postPictureOnFireBase(data);
   const img = String(res).split(" ") //แบ่งตรงเคื่องหมายวรรคตอน
  //  console.log("URL: "+res.data["url"]);
   
  //  setUserImage(img[1])
    console.log("Upload Image On Fire Base: "+ img[1]);

   await register(name,email,password,String(img[1]))
  }
}

export default RegisterPage;
