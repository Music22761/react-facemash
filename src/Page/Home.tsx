// import { useSearchParams } from "react-router-dom";
import ButtonAppBar from "./Appbar";
import Card from "@mui/material/Card";
import picture from "../json/Picture.json";
import userPicture from "../json/UserPicture.json";
// import user from "../json/User.json";

import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  Rating,
} from "@mui/material";
import React from "react";
function HomePage() {
  const [value, setValue] = React.useState<number | null>(0);
  //  const params = useParams();
  // const [searchParams] = useSearchParams();

  // const name = searchParams.get("name");
  // const email = searchParams.get("email");
  // const password = searchParams.get("password");
  // const confirmPassword = searchParams.get("confirmPassword");

  // console.log("this is Home");
  // console.log(name);
  // console.log(email);
  // console.log(password);
  // console.log(confirmPassword);

  return (
    <>
      <ButtonAppBar />
      <div
        style={{
          display: "flex",
          padding: "15vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
              height: "500px",
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
                image={picture[1].picture}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {picture[1].name}
                </Typography>
              </CardContent>
              <CardActions style={{justifyContent:'space-between'}}>

              <h3>{userPicture[1].score}</h3>

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
              height: "500px",
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
                image={picture[0].picture}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {picture[0].name}
                </Typography>
              </CardContent>
              <CardActions style={{justifyContent:"space-between"}}>
                <h3>{userPicture[0].score}</h3>
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
    </>
  );
}

export default HomePage;
