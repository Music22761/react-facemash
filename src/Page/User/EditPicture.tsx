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
import TimelineIcon from '@mui/icons-material/Timeline';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Service } from "../../api/service";
import { UsersGetRespose } from "../../model/UserModel";
import { PictureGetResponse } from "../../model/PictureModel";

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

function EditPicture() {
  const [searchParams] = useSearchParams();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UsersGetRespose[]>();
  const [picture, setPicture] = useState<PictureGetResponse[]>();
  const [upPic, setUpPic] = useState();
  const navigate = useNavigate();

  const services = new Service();

  const id = Number(searchParams.get("id"));
  const picId = Number(searchParams.get("picId"));

  function navigateTo() {
    navigate(-1);
  }

  function goToChartPicture(id:number,picId:number) {
    navigate(`/chartPicture?id=${id}&picId=${picId}`);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUpPic(file);
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    autoLoad(id,picId);
  }, [id]);

  const autoLoad = async (id: number,picId:number) => {
    console.log(id);
    
    setLoading(true);
    try {
      const res = await services.getUserById(id);
      const resPic = await services.getPictureById(picId);
      setUser(res);
      setPicture(resPic);
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CircularProgress />
          </div>
        </>
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
              {user?.[0]?.name}
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
                goToChartPicture(id,picId)
              }}
            >
              <TimelineIcon/>
            </IconButton>

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

        <Card style={{ width: '60%', height: '60%', display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
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
                picture?.[0]?.name
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
            style={{marginTop:'20px'}}
          >
            Select Picture
            <VisuallyHiddenInput
              type="file"
              id="file"
              onChange={handleFileChange}
            />
          </Button>
        </Card>

        <TextField margin="normal" name="name" label="Name" id="name" />

        <Button
          variant="contained"
          style={{ width: "150px" }}
          onClick={() => {}}
        >
          Edit Picture
        </Button>
      </Card>
        </div>
      )}
    </>
  );
}

export default EditPicture;
