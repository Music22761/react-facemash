import Card from "@mui/material/Card";
import {
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  CardActionArea,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppbarAfterLogin from "./AppbarAfterLogin";
import { Service } from "../../api/service";
import { useSearchParams } from "react-router-dom";
import { UsersGetRespose } from "../../model/UserModel";
import { PictureGetResponse } from "../../model/PictureModel";

export default function HomePageAfterLogin() {
  // const [value, setValue] = React.useState<number | null>(0);

  const [user, setUser] = useState<UsersGetRespose[]>();
  const [picture, setPicture] = useState<PictureGetResponse[]>();
  // const navigate = useNavigate();
  console.log(user);
  

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const services = new Service();

  const id = Number(searchParams.get("id"));
  // const role = Number(searchParams.get("role"));

  const getRandomPicture = () => {
    if (!picture || picture.length === 0) return null; // ตรวจสอบว่ามีรูปในอาร์เรย์หรือไม่
    const randomIndex = Math.floor(Math.random() * picture.length);
    return picture[randomIndex];
  };

  const ranPic1 = getRandomPicture();
  const ranPic2 = getRandomPicture();

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    console.log(id);

    setLoading(true);
    try {
      const res = await services.getUserById(id);
      const resPic = await services.getAllPicture();
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
      {AppbarAfterLogin(id)}
      {loading ? (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CircularProgress />
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "15vh",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              maxWidth: 600,
              minWidth: 300,
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <CardActionArea
              onClick={() => {
                autoLoad(id);
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                image={ranPic1?.path}
              />
              <CardContent>
                <Typography
                  style={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {ranPic1?.name} <br />
                  {ranPic1?.score}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Typography
            style={{ textAlign: "center", marginLeft: "5%", marginRight: "5%" }}
            gutterBottom
            variant="h1"
            component="div"
          >
            VS
          </Typography>

          <Card
            sx={{
              maxWidth: 600,
              minWidth: 300,
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <CardActionArea onClick={()=>{
              autoLoad(1);
            }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                image={ranPic2?.path}
              />
              <CardContent>
                <Typography
                  style={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {ranPic2?.name} <br />
                  {ranPic2?.score}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      )}
    </>
  );
}

// export default HomePageAfterLogin;
