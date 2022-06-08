import React from "react";
import {paths} from '../../routes/routes.config';
import "./Navbar.scss";
import bro from '../../../src/bro.jpg';
import CardMedia from '@mui/material/CardMedia' 
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/Key";
import { Button } from '@mui/material';
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {authenticationService} from '../../utils/auth.service'
import history from '../../routes/history'
import logo from '../../../public/logo.jpeg'
import CloseIcon from "@mui/icons-material/Close";
import Picker from "emoji-picker-react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import SimpleImageSlider from "react-simple-image-slider";
import styled from "styled-components";
import { Avatar,Box,Grid,IconButton,InputAdornment,TextareaAutosize,TextField} from "@mui/material";

import {post} from '../../utils/http/httpMethods'
const ModalWrapper = styled.div`
  width: 900px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

// import {useNavigate} from 'react-router-dom';

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
    width: 500,
    height: 400,
    bgcolor: "background.paper",
   
    // boxShadow: 24,
    p: 4,
  };

  const captionModalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 360,
    bgcolor: "background.paper",
   
    // boxShadow: 24,
    p: 4,
  };


  const btnstyle = { margin: "20px 0px", width: "85px", };
 let img = {
  file:'',
  filepreview: ''
 }
  const user = JSON.parse(localStorage.getItem("currentUser")  || '{}') ;
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filePreviewModal,setFilePreviewModal] = useState(false);
  const [openModalNewPostModal, setopenModalNewPostModal] = useState(false);
  const [showUploadModal,setShowuploadModal] = useState(false);
  const [clickSave, setClicksave] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [files,setFiles] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  // const [inputStr, setInputStr] = useState("");
  const [image,setImage] = useState([img])
  const [caption,setCaption] = useState('')
  const [urls, setUrls] = useState([]);
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

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event : any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

const handleCloseModal = () => {
  setOpenModal(false);
}

const handleNewPostmodalClose = () =>{
  setopenModalNewPostModal(false)
}

const handleNewPostmodalOpen = () =>{
  setopenModalNewPostModal(true)
}
const handleFilePreviewModalClose = () =>{
  setFilePreviewModal(false)
}

const handleFilePreviewModalOpen = () =>{
  setFilePreviewModal(true)
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
  const newPost = () =>{
    let formData = new FormData();
    if(files.length > 1)
        for (var key of Object.keys(files)) {
        formData.append('path', files[key])
    }
    else
    formData.append("path",files[0]);

       formData.append("caption", caption);
       authenticationService.newPost(formData);
    
  }

const handleupload = () =>{
  document.getElementById("uploadImg").click();
  
}

const onEmojiClick = (event: any, emojiObject: any) => {
  setCaption((prevInput) => prevInput + emojiObject.emoji);
 setShowPicker(false);
};


  const handleIMG = (e: any) => {
    let arr :any[]
    arr=[]
        setFiles(e.target.files)
       if(e.target.files.length > 1){
         for(let i = 0; i < e.target.files.length;i++){
          img ={
           
            file: e.target.files[i],
            filepreview: URL.createObjectURL(e.target.files[i]) 
           }
           arr.push(img);
         }

       }else{

         img ={
           
           file: e.target.files[0],
           filepreview: URL.createObjectURL(e.target.files[0]) ,
          }
          setImage(
            [...image,img]
          )
        }
       

      
      let res= arr.map(ar=>{
     
         return ar.filepreview;
       })
       console.log(res)
       setUrls(res)
       handleFilePreviewModalOpen()
      //  setopenModalNewPostModal(false)
  };

// console.log(image)

  return (
    <AppBar position="static" style = {{
      background : 'white',
      height:'60px'
     }}>
      <Toolbar variant="dense" style = {{marginTop: "12px" }}>
        
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          style={{ flex: 1,color:'black' ,fontSize: '17px' ,marginLeft:'6%' }}
        >
         <img src="logo.jpeg" alt='logo' height="20px" ></img>Life @ AM
        
        </Typography>
        <Typography
          // variant="h6"
          color="inherit"
          component="div"
          style={{ display:'flex',color:'black'  ,marginLeft:'35%' }}
        >
         {/* <img src="logo.jpeg" alt='logo' height="20px"></img>Life @ AM */}
         <HomeIcon className='icons'/>
          <AddAPhotoOutlinedIcon onClick={handleNewPostmodalOpen} className='icons' />
          <BookmarkBorderOutlinedIcon  className='icons' />
        
     
        
        <Avatar
          // size="large"
          style={{marginLeft:'20px'}}
          variant="circular"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
          src={          
            `http://localhost:8080/${user.profilePicture}`
          }
        />
       </Typography>
       {' _ '}
        <Typography style={{color:'black',marginRight:'6%'}}>{' '}{user.firstname}{' '}{user.lastname}</Typography>
        {/* {console.log(user)} */}
      </Toolbar>

   
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
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
        // onClick={() => navigate('/editprofile')}
        onClick={() =>{ history.push(paths.editprofile);window.location.reload();}}
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

{/* *****************************Change Password Modal******************************** */}
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h3>Reset Your Password</h3>
            <TextField 
                  style={{width:'370px',marginTop: "20px"}}
                  label="old password"   
                  size="small"    
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
                  size="small"    
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
                  size="small"    
                  placeholder="Enter Confirm password"
                  value={password.confPass}
                  onChange={(e) => {setPassword({...password,confPass:e.target.value});isValidPass(e.target.value,'confPass')}}
                  error = { clickSave &&  !(err.confPass)?true:false}
                  helperText={ clickSave &&  !(err.confPass)? "confirm password is required" : ''}
                  type="password"
                  id='3' />
                  
                  <Button style={{width: '370px' ,marginTop: "20px"}} variant="contained" color="primary" onClick={() =>setClicksave(true)}>Reset Password</Button>
            </Box>
      </Modal>

      
      {/* ******************************Add New Post Modal **************************** */}

      <Modal
            open={openModalNewPostModal}
            onClose={handleNewPostmodalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
        <Box sx={style}>
            <img  
                  id="uploadIcon"
                  // component="img"
                  height="150px"
                  width="150px"
                  src={bro}
                />

                    <TextField
                      className="dragImg"
                      label={` drag photo from device to upload...`}
                      variant="standard"
                      // value = {comment}
                      // onChange={(e) => setComment(e.target.value)}
                      InputProps={{               
                        disableUnderline: true, 
                      }}
                    />
            <Typography sx={{display:'block'}}>
              <input
                type="file"
                style={{ margin: "10px 10px"  ,display:'none'}}
                multiple
                id='uploadImg'
                accept="image/*"
                onChange={(e) => {
                  handleIMG(e);
                }}
               
              />
              
              
               <br />
               <label htmlFor="uploadImg">
               <Button variant="contained"  className="uploadimgbtn" color="primary" onClick={()=> handleupload()}>Upload from Device</Button>

               </label>
                  </Typography>
            </Box>
      </Modal>



     {/* *******************************IMG Preview Modal************************** */}
    
    
     <Modal
            open={filePreviewModal}
            onClose={handleFilePreviewModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
        <Box id='previewBox' sx={style}>
           <span className='previewSpan'>
             <div style={{display: 'inline'}}>
             <KeyboardBackspaceIcon sx={{color:'gray'}} id='backarrow'/>
            <Button variant="text" id='nextbtn'  onClick={() => {setShowuploadModal(true);setFilePreviewModal(false)}}>Next</Button>
           </div>
           {/* {console.log(image)} */}
             {files.length > 1 ? (
                <>
                
                  <SimpleImageSlider
                     style={{marginTop: '-30px'}}
                    height="400px"
                    width="450px"
                    images={urls}
                    showBullets={true}
                    showNavs={true} 
                  />
                </>
              ) : (
                <CardMedia
                  id="mediaImg"
                  component="img"
                  height="400px"
                  width="400px"
                  image={`${image.length>1 &&  image[1].filepreview } `}
                />
               
              )}
              </span>
            </Box>          
      </Modal>

         {/* *******************************upload img and caption Modal************************** */}

         <Modal 
         open={showUploadModal}
         onClose={()=>setShowuploadModal(false)}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description">
         
            <Box 
           style={{
            margin: "auto",
            justifyContent: "center",
            // marginTop: "-620px",
          }}
        >      
          
            <CloseIcon
              style={{color:'white', position: "relative", top: "3%", right: "-90%" }}
              onClick={() => setShowuploadModal(false)}
            />
            <Grid container  sx={{ marginLeft:'60px',}}>
              <Grid
                item
                xs={9}
                sx={{ backgroundColor: "white", height: "60px",marginLeft:'200px',marginRight: "200px"}}
              >
                <a
                  style={{
                    float: "right",
                    color: "#1890FF",
                    fontSize: "20px",
                    margin: "15px",
                    cursor: "pointer"
                  }}
                  onClick = {()=> newPost()}
                >
                  upload
                </a>
              </Grid>
              
                <ModalWrapper showModal={showUploadModal} style={{marginLeft:'200px'}}>
                  {files.length >1 && files.length >=2 ?
                 <SimpleImageSlider
                    height="75%"
                    width="35%"
                   images={urls}
                   showBullets={true}
                   showNavs={true}
                   />
                 :
                 <CardMedia
                  // id="mediaImg"
                  component="img"
                  height="95%"
                  width="35%"
                  image={`${image.length>1 &&  image[1].filepreview } `}
                />
                 }
                  <ModalContent>
                    <label style={{ display: "flex", padding: "10px 15px" }}>
                      {" "}
                      <Avatar  src={          
                    `http://localhost:8080/${user.profilePicture}`
          } />
                      &nbsp;&nbsp;&nbsp;<p>UserName</p>
                    </label>
                    <div>
                    <TextareaAutosize
                      minRows={13}
                      value={caption}
                      onChange={(e) =>{setCaption(e.target.value)}}
                      style={{
                        width: "320px",
                        marginLeft: "15px",
                        border: "none",
                      }}
                      placeholder="Write a caption..."
                    />
                    <br />
                      <img
                        className="emoji-icon"
                        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                        onClick={() => setShowPicker((val) => !val)}
                        style={{ position: "relative", left: "4%" }}
                      />
                      {showPicker && (
                        <Picker
                          pickerStyle={{ width: "100%" }}
                          onEmojiClick={onEmojiClick}
                        />
                      )}
                    </div>
                    <br />
                    <br />
                    <br />
                    <TextField
                      variant="standard"
                      placeholder="Add location"
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              style={{ fontSize: "18px", marginRight: "8px" }}
                            >
                              <LocationOnOutlinedIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <br />
                    <br />
                    <TextField
                      variant="standard"
                      placeholder="Add images"
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              style={{ fontSize: "18px", marginRight: "8px" }}
                            >
                              <AddAPhotoOutlinedIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ModalContent>
                </ModalWrapper>
            </Grid>



          </Box>
        </Modal>
    
    </AppBar>
  );
};
