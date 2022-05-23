import React from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/Key";
import { Button } from '@mui/material';
import LogoutIcon from "@mui/icons-material/Logout";
import { TextField } from "@mui/material";
import { useState } from "react";

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
  // onLogout =console.log('logout');
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const btnstyle = { margin: "20px 0px", width: "85px", };

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [clickSave, setClicksave] = useState(false);
  const [err,setErr] = useState({     
    pass:false,
    newPass:false,
    confPass:false,
  });
  const [password,setPassword] = useState({
    pass:'',
    newPass:'',
    confPass:'',
  })


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

const handleCloseModal = () => {
  setOpenModal(false);
}
const handleOpenModal = () => {
  setOpenModal(true);
}

  const isValidPass = (pass:any,term:string) =>{ 

    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
   
   const temp =  pass.match(passPattern) !== null?true: false

    if(term === 'pass')
    {
      // err.pass=false
      setErr({...err,pass:temp})
    }
    if(term === 'newPass')
    {
      // err.newPass=false
      setErr({...err,newPass:temp})
    }
    if(term === 'confPass')
    {
      // err.confPass=false
      setErr({...err,confPass:temp})
    }

    
return err;

   
  }




  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          style={{ flex: 1 }}
        >
          MUI Template
        </Typography>
       
        <Avatar
          // size="large"
          variant="circular"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
          src={
            "http://192.168.0.230:8080/public/images/1652159882796profile4.jpeg"
          }
        />
      </Toolbar>

   
      <Menu
        id="menu-appbar"
        // anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
         <Tooltip title="Edit profile">
        <MenuItem
        // onClick={() => navigate('/edit-profile')}
        >
          <EditIcon style={{ marginRight: "10px " }} /> Edit Profile
        </MenuItem>
        </Tooltip>

        <Tooltip title="change password">
          <MenuItem onClick={handleOpenModal}>
            <KeyIcon style={{ marginRight: "10px " }} />
            Change Password
          </MenuItem>
        </Tooltip>

        <Tooltip title="Logout">
        <MenuItem onClick={onLogout}>
          <LogoutIcon style={{ marginRight: "10px " }} />
          Logout
        </MenuItem>
        </Tooltip>
      </Menu>


        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <TextField 
                  style={{width:'370px',marginTop: "20px"}}
                  label="old password"       
                  placeholder="Enter old password"
                  variant="outlined"
                  value={password.pass}
                  onChange={(e) => {setPassword({...password,pass:e.target.value});isValidPass(e.target.value,'pass')}}
                  error = { clickSave &&  !(err.pass)?true:false}
                  helperText={ clickSave &&  !(err.pass)? "old password is required" : ''}
                  required
                  id='1'
                />

              <TextField
                  label="New Password"
                  style={{ width: '370px' ,marginTop: "20px"}}
                  variant="outlined"
                  placeholder="Enter new password"
                  value={password.newPass}
                  onChange={(e) => {setPassword({...password,newPass:e.target.value});isValidPass(e.target.value,'newPass')}}
                  error = { clickSave && !(err.newPass)?true:false}
                  helperText={ clickSave &&  !(err.newPass)? "new password is required" : ''}
                  type="password"
                  id='2'
                />  
                <TextField
                  label="Confirm Password"
                  style={{ width: '370px' ,marginTop: "20px"}}
                  variant="outlined"
                  placeholder="Enter Confirm password"
                  value={password.confPass}
                  onChange={(e) => {setPassword({...password,confPass:e.target.value});isValidPass(e.target.value,'confPass')}}
                  error = { clickSave &&  !(err.confPass)?true:false}
                  helperText={ clickSave &&  !(err.confPass)? "confirm password is required" : ''}
                  type="password"
                  id='3' />
                  
                  <Button style={btnstyle} variant="contained" color="primary" onClick={() =>setClicksave(true)}>Submit</Button>
            </Box>
      </Modal>

      {/* </Box>
            </Modal> */}
    </AppBar>
  );
};
