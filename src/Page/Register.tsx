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
import { SetStateAction, useState } from "react";
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
  const [imgUrl, setImgUrl] = useState<string>();
  const [upload, setUpload] = useState<FormData>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [userImage, setUserImage] = useState();
  const services = new Service();

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

    uploadImageOnFireBase(upload!, name, email, password); //ส่งไป upload ใน fireBase
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    //ทำไฟล์เป็น formData
    const formData = new FormData();
    formData.append("file", file);

    console.log("File:"+formData);
    console.log("IMage:"+imageUrl);
    
    setUpload(formData); //เก็บไว้ใน setUpload
    setImgUrl(imageUrl);
  };

  const handleNameRegister = (event: { target: { value: SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleEmailRegister = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordRegister = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmRegister = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPasswordConfirm(event.target.value);
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
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50vh",
            height: "80vh",
            backgroundColor: "pink",
            alignItems: "center",
            borderRadius: "30px",
          }}
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
              value={name}
              autoComplete="current-email"
              onChange={handleNameRegister}
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
              value={email}
              onChange={handleEmailRegister}
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
              value={password}
              onChange={handlePasswordRegister}
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
              type="password"
              autoComplete="current-confirmPassword"
              value={passwordConfirm}
              onChange={handlePasswordConfirmRegister}
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
              if (upload != null) {
                if (
                  name.trim() != "" &&
                  email.trim() != "" &&
                  password.trim() != "" &&
                  passwordConfirm.trim() != ""
                ) {
                  if (isValidEmail(email)) {
                    if (name.length >= 5 && password.length >= 8) {
                      if (password == passwordConfirm) {
                        btnRegister(name, email, password, passwordConfirm);
                        alert("Register Success!!");
                        console.log(name);
                        console.log(email);
                        console.log(password);
                        console.log(passwordConfirm);

                      } else {
                        alert("Password ไม่ตรงกัน กรุณาใส่ให้ตรงกัน !!");
                      }
                    } else {
                      alert("Password ต้องมากกว่า 8 ตัว Name ต้องมากกว่า 5  !!");
                    }
                  }else {
                    alert("ตัวอย่างอีเมล test@gmail.com !!")
                  }
                } else {
                  alert("อย่าใส่ช่องว่างครับ !!");
                }
              } else {
                alert("ใส่รูปโปรไฟล์ด้วยครับ !!");
              }
            }}
          >
            Register
          </Button>
        </Card>
      </body>
    </>
  );

  function isValidEmail(email: string){
    // ตรวจสอบว่ามี @ อยู่ในอีเมล์หรือไม่
    const atIndex = email.indexOf("@");
    if (atIndex === -1) {
      // หากไม่มี @ อยู่ในอีเมล์
      return false;
    }

    // ตรวจสอบว่า @ อยู่ตรงกลางหรือไม่
    const atIndexEnd = email.indexOf("@", atIndex + 1);
    if (atIndexEnd !== -1) {
      // หากมี @ อีกตำแหน่งหนึ่งในอีเมล์
      return false;
    }

    // ตรวจสอบว่า @ ไม่อยู่ที่จุดเริ่มต้นหรือจุดสิ้นสุดของอีเมล์
    if (atIndex === 0 || atIndex === email.length - 1) {
      return false;
    }

    return true;
  }

  async function register(
    name: string,
    email: string,
    password: string,
    picture: string
  ) {
    const body = {
      name: name,
      email: email,
      password: password,
      picture: picture,
      role: 1,
    };

    console.log("Body");

    console.log(body.name);
    console.log(body.email);
    console.log(body.password);
    console.log(body.picture, typeof body.picture);
    console.log(body.role);

    console.log("Body :" + body);
    await services.postUserRegister(body);
  }

  async function uploadImageOnFireBase(
    data: FormData,
    name: string,
    email: string,
    password: string
  ) {
    console.log("ImageOnfireBase: " + data);

    const res = await services.postPictureOnFireBase(data);
    const img = String(res).split(" "); //แบ่งตรงเคื่องหมายวรรคตอน
    //  console.log("URL: "+res.data["url"]);

    //  setUserImage(img[1])
    console.log("Upload Image On Fire Base: " + img[1]);

    await register(name, email, password, String(img[1]));
  }
}

export default RegisterPage;
