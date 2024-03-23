import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Card,
  TextField,
  CardMedia,
  styled,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Service } from "../../api/service";
import { UsersGetRespose } from "../../model/UserModel";
import { UserPictureResponse } from "../../model/UserPictureModel";

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

function AddPicture() {
  const user: UsersGetRespose = JSON.parse(localStorage.getItem("objUser")!);
  const [imageUrl, setImageUrl] = useState(null);
  const [namePic, setNamePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pic ,setPic] = useState<UserPictureResponse[]>();
  const [upPic, setUpPic] = useState();
  const navigate = useNavigate();
  const services = new Service();

  let name = "";

  function navigateTo() {
    navigate(-1);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    setUpPic(formData);
    setImageUrl(imageUrl);
  };

  function btnAddPicture() {
    console.log("Pic: " + upPic);
    console.log("ID: " + user.id);
    console.log("NamePic: " + namePic);
    uploadImageOnFireBase(upPic, user.id, namePic);
  }

  useEffect(() => {
    autoLoad();
  }, []);

  const autoLoad = async () => {
    setLoading(true);
    try {
      const res = await services.getPictureByUID(user.id);
      setPic(res);
      console.log("Picture UID: "+pic?.length);
      
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

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
                  This is Add Picture {user.id}
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

          <Card
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "50vw",
              height: "80vh",
              borderRadius: "40px",
              backgroundColor: "pink",
            }}
          >
            <Typography
              variant="h4"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              เพิ่มรูปภาพ
            </Typography>

            <Card
              style={{
                width: "60%",
                height: "60%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card sx={{ width: "85%" }}>
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "cover", // ให้ภาพปรับขนาดและตัดที่เหลือขอบ
                    width: "100%",
                    height: "100%", // ให้ภาพเต็มพื้นที่ของ Card
                  }}
                  image={
                    imageUrl ||
                    "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                  }
                  alt="Selected Image"
                />
              </Card>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={{ marginTop: "20px" }}
              >
                Select Picture
                <VisuallyHiddenInput
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Card>

            <TextField
              margin="normal"
              name="name"
              label="Name"
              id="name"
              onChange={(e) => {
                name = e.target.value;
                // console.log(name+" Type "+typeof(name));

                setNamePic(name);
              }}
            />

            <Button
              variant="contained"
              style={{ width: "150px" }}
              onClick={() => {
                if (Number(pic?.length) < 5) {
                  if (imageUrl) {
                    btnAddPicture();
                  } else {
                    alert("ใส่รูปก่อน");
                  }
                }else{
                  alert("ภาพเต็มแล้ว");
                }
              }}
            >
              Add Picture
            </Button>
          </Card>
        </div>
      )}
    </>
  );

  async function addPicture(id: number, name: string, picture: string) {
    const body = {
      name: name,
      score: 0,
      user_id: id,
      path: picture,
    };

    console.log("Body");

    console.log(body.name);
    console.log(body.score);
    console.log(body.user_id);
    console.log(body.path, typeof body.path);

    console.log("Body :" + body);
    await services.postPicture(body);
    alert("เพิ่มรูปภาพสำเร็จ")
    autoLoad();
  }

  async function uploadImageOnFireBase(
    data: FormData,
    id: number,
    name: string
  ) {
    console.log("ImageOnfireBase: " + data);

    const res = await services.postPictureOnFireBase(data);
    const img = String(res).split(" "); //แบ่งตรงเคื่องหมายวรรคตอน
    //  setUserImage(img[1])
    console.log("Upload Image On Fire Base: " + img[1]);

    await addPicture(id, name, String(img[1]));
  }
}

export default AddPicture;
