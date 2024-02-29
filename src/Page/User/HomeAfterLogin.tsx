// import { useSearchParams } from "react-router-dom";
import Card from "@mui/material/Card";
// import user from "../json/User.json";

import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  Rating,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppbarAfterLogin from "./AppbarAfterLogin";
import { Service } from "../../api/service";
import { useSearchParams } from "react-router-dom";
import { UsersGetRespose } from "../../model/UserModel";
import { PictureGetResponse } from "../../model/PictureModel";

export default function HomePageAfterLogin() {
  const [value, setValue] = React.useState<number | null>(0);

  const [user, setUser] = useState<UsersGetRespose[]>();
  const [picture, setPicture] = useState<PictureGetResponse[]>();

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const services = new Service();

  const id = Number(searchParams.get("id"));
  // const role = Number(searchParams.get("role"));

  useEffect(() => {
    autoLoad(id);
  }, [id]);

  const autoLoad = async (id: number) => {
    console.log(id);
    
    setLoading(true);
    try {
      const res = await services.getUserById(id);
      const resPic = await services.getPictureById(1);
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
            padding: "15vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>{user?.map((e)=>e.name)}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              alignItems: "center",
              width: "auto",
            }}
          >
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                justifyContent: "center",
                textAlign: "start",
                width: "300px",
              }}
            >
              <h2>About</h2>
              <p>
                Catmash <br />
                มีลักษณะเป็นเกมการจับคู่รูปภาพของแมวทั้งสองแล้วให้ผู้ใช้โหวตให้คะแนน
              </p>
            </div>
            <span style={{ justifyContent: "space-between" }}></span>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "auto",
                height: "50vh",
              }}
            >
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
                  image={""+picture?.map((e)=>e.name)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {/* {user?.map((e)=>e.name)} */}
                    {user?.map((e)=>e.name)}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <h3>30</h3>

                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      size="large"
                      name="score"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </CardActions>
              </Card>
            </div>
            <span style={{ justifyContent: "space-between" }}></span>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "auto",
                height: "50vh",
              }}
            >
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
                  image={""+picture?.map((e)=>e.name)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {/* {user?.map((e)=>e.name)} */}
                    {user?.map((e)=>e.email)}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <h3>30</h3>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      size="large"
                      name="score"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );



}

// export default HomePageAfterLogin;
