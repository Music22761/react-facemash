import ButtonAppBar from "./Appbar";
import Card from "@mui/material/Card";

import {
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Service } from "../api/service";
import { PictureGetResponse } from "../model/PictureModel";
function HomePage() {
  const [picture, setPicture] = useState<PictureGetResponse[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    autoLoad();
    const interval = setInterval(autoLoad, 10000); // โหลดข้อมูลใหม่ทุก 10 วินาที
    return () => clearInterval(interval);
  }, []);

  const autoLoad = async () => {
    setLoading(true);
    try {
      const res = await services.getAllPicture();
      setPicture(res);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };


  const getRandomPicture = () => {
    if (!picture || picture.length === 0) return null; // ตรวจสอบว่ามีรูปในอาร์เรย์หรือไม่
    const randomIndex = Math.floor(Math.random() * picture.length);
    return picture[randomIndex];
  };

  // async function delay(ms: number) {
  //   return await new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // function chk(id: number) {
  //   const ran = getRandomPicture();
  //   // const bln = true

  //   if (ran?.id != id) {
  //     return ran;
  //   } else {
  //     chk;
  //   }
  // }

  const ranPic1 = getRandomPicture();
  const ranPic2 = getRandomPicture();



  const services = new Service();

  return (
    <>
    <ButtonAppBar />
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div
        >
          
          <div style={{display:'flex',flexDirection:'row',marginTop:'15vh',textAlign:'center',alignItems:'center'}}>
            <Card
              sx={{
                maxWidth: 600,
                minWidth: 300,
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
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
                  style={{ textAlign: "center"}}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {ranPic1?.name} <br />
                  {ranPic1?.score}
                </Typography>
              </CardContent>
            </Card>
            <Typography
              style={{ textAlign: "center",marginLeft:'5%',marginRight:'5%'}}
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
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
