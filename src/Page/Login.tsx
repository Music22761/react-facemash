import { AppBar, Box, Button, Card, Divider, IconButton,  TextField, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{backgroundColor:'pink'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Link to={'/'}><HomeIcon/></Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    
      <div
        style={{
          display: "flex",
          flexDirection:'column',
          alignItems:'center',
          padding: "5%",
        }}
      >
        <Card
          style={{
            borderRadius:'30px',
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "pink",
            width: "50vh",
            height: "80vh",
          }}
        >
          <h1>Log in</h1>
          <Divider/>
          <TextField style={{padding:'10px',textAlign:'center',alignItems:'center'}} type="email"  id="email" label="Email" variant="outlined" />
          <TextField style={{padding:'10px'}} type="password" id="password" label="Password" variant="outlined" />
          <Link to={"/"}>
            <Button
              style={{ backgroundColor: "purple" }}
              variant="contained"
              onClick={() => {
                alert("Login Success!! Welcome to FaceMash");
              }}
            >
              Log In
            </Button>
          </Link>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
