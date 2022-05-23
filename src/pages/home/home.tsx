import React from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
// import ChatIcon from '@mui/icons-material/Chat';
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import Skeleton from '@mui/material/Skeleton';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from '@mui/icons-material/Chat';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState } from "react";



const Login = () => {

  const [like, setlike] = useState(false);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
        <Card
              // key={post._id}
              id='mediaCard'
              className='mediaCard'
              // sx={{  height: "70%", maxWidth: "50%", margin: "40px auto" }}
            >
              <CardHeader
                // style ={{backgroundColor: 'lightGray'}}
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    // src={post.userProfile ? post.userProfile : post.desc[0]}
                    // src={''}
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title='My First post'

                // subheader="September 14, 2016"
              />
              <CardMedia
                id='mediaImg'
                component="img"
                height="400px"
                width="400px"
                image={'http://localhost:3000/public/images/1652422456688pic4.jpg'}
                // alt="Paella dish"
              />

              <TextField
                id="captionInput"
                // style={{ width: "90%" }}
                label="add comment"
                variant="standard"
                // value = {comment}
                // onChange={(e) => setComment(e.target.value)}
              ></TextField>
              <SendIcon
                style={{ marginTop: "20px" }}
                // onClick={() => handleAddComment(post._id)}
              />
             
             
             {/* <CardActions disableSpacing> */}
                <IconButton
                  aria-label="add to favorites"
                  style={{ color: `${like ? "red" : ""}` }}
                  onClick={() => {
                    setlike(!like);
                    // handleLike(post._id, post);
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <ChatIcon></ChatIcon> 
                  
                {/*  {post.likes.length}
                
                <ChatIcon sx={{marginLeft:"10px"}} />{post.comments.length}
                 <ExpandMore
                  expand={expanded1}
                  onClick={() => handleExpandClick(i)}
                  aria-expanded={expanded1}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                  {/* <ChatIcon></ChatIcon> 
              </CardActions>
              <Collapse in={expanded1} timeout="auto" unmountOnExit>
                <CardContent>
                  {post.comments.map((com, index) => (
                    <Typography paragraph key={index}>
                     
                      <div style={{display: 'flex'}}>
                      <Avatar src={com.userProfile?com.userProfile:''}></Avatar>
                  

                  <b style={{marginLeft:'10px',marginTop:'15px'}}>{com.userName+':'}</b><p style={{marginLeft:'10px'}}> {com.comment}</p>
                     </div>
                    </Typography>
                  ))}
                </CardContent>
              </Collapse> */}
            </Card>
        </Typography>
      </Box>
    </Container>
  );
}
export default Login