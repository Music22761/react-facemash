import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { PictureGetResponse } from "../../model/PictureModel";
import { AddPhotoAlternate } from "@mui/icons-material";

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
  // const userStorage: UsersGetRespose = JSON.parse(
  //   localStorage.getItem("objUser")!
  // );
  const [user, setUser] = useState<UsersGetRespose[]>();
  const [imageUrl, setImageUrl] = useState(null);
  const [namePic, setNamePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState<PictureGetResponse[]>();
  const [upPic, setUpPic] = useState();
  const navigate = useNavigate();
  const services = new Service();

  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));

  console.log("UserStorage: " + id);

  function navigateTo() {
    navigate(-1);
  }

  function goToHomeAfterLogin() {
    navigate(`/homeAfterLog?id=${id}`);
  }

  const handleNameChange = (event) => {
    setNamePic(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    setUpPic(formData);
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    setLoading(true);
    try {
      const res = await services.getPictureByUID(id);
      const resUser = await services.getUserById(id);
      setUser(resUser);
      setPic(res);
      console.log("RES");
      console.log(res);
      console.log(resUser);
      
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
                  sx={{ mr: 2,color:'purple' }}
                  onClick={() => goToHomeAfterLogin()}
                >
                  <HomeIcon />
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  {user?.[0].name}
                </Typography>
                <span></span>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  This is Add Picture
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

                <Link to={"/"} onClick={()=>localStorage.clear()}>
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
              minWidth: "600px",
              padding:'1%'
            }}
          >
            <Card
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius:'30px',
                paddingTop:'1%'
              }}
            >
              <Card sx={{width: "95%",borderRadius:'30px' }}>
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
                style={{ margin: "1%" }}
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
              value={namePic}
              onChange={handleNameChange}
            />

            <Button
              variant="contained"
              style={{ width: "200px" }}
              onClick={() => {
                if (Number(pic?.length) < 5) {
                  if (imageUrl) {
                    console.log("Length"+pic?.length);
                    
                    // btnAddPicture();
                    if (namePic != null && namePic.trim() !== "") {
                      console.log(namePic);
                      
                      uploadImageOnFireBase(upPic, id, namePic);
                    }else{
                      alert("ใส่ชื่อก่อน")
                    }
                  } else {
                    alert("ใส่รูปก่อน");
                  }
                } else {
                  alert("ภาพเต็มแล้ว");
                }
              }}
            >
              <AddPhotoAlternate/>
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
    alert("เพิ่มรูปภาพสำเร็จ");
    autoLoad(id);
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
