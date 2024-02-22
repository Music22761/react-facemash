import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{backgroundColor:'pink'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{width:'50px'}}
            sx={{ mr: 2 }}
          >
            <Link to={'/'}><HomeIcon/></Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Link to={'/login'} ><Button style={{backgroundColor:'pink'}} variant='contained'>Log in</Button></Link>
          <div style={{padding:'5px'}}></div>
          <Link to={'/register'}><Button style={{backgroundColor:'purple'}} variant='contained'>Sign Up</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
