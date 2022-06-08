import "./home.scss";
import {Container,Typography,Box,Avatar,Divider,TextField,Button,IconButton,Grid,Modal} from "@mui/material";
import {Card,CardMedia,CardHeader} from "@mui/material";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SimpleImageSlider from "react-simple-image-slider";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import authAxios from "../../utils/http/api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { authenticationService } from "../../utils/auth.service";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

const Login = () => {

  TimeAgo.addDefaultLocale(en)
  TimeAgo.addLocale(ru)

  const [like, setlike] = useState(false);
  const [allposts, setAllposts] = useState([]);
  const [urls, setUrls] = useState([]);
  const [comment, setComment] = useState('')
  const [commentModal,setCommentModal] = useState(false)
  const [index,setIndex] = useState(0)
  const [showPicker, setShowPicker] = useState(false);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("currentUser")  || '{}')  )
  let val = [];

  const ModalWrapper = styled.div`
  width: 800px;
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

const getdata = async () => {
  const res = await authAxios.get(`/post`);
  setAllposts(res.data.results);
    val = res.data.results.map((p : any) => {
    return p.img.map((im : any) => {
      return `http://localhost:8080/${im.path}`;
    });
  });
  setUrls(val);
 
};

    useEffect(() => {
    
      getdata();
    }, []);

    // useEffect(() => {
    // getdata();
    // },[])

  // ************************Comment on Post *************************
const handlePostComment = async (postid : any) =>{
  const data = { 
    comment:comment
  }
  const res = await authAxios.patch(`/post/${postid}`,data);
  setComment(' ')
console.log(res)
}



 // ************************Like Post *************************
 const handleLikePost = async (postid : any) =>{
  const data = { 
    userId:user['_id']
  }
  const res = await authAxios.put(`/post/${postid}`,data);
  getdata();
console.log(res)
}


const onEmojiClick = (event: any, emojiObject: any) => {
  setComment((prevInput) => prevInput + emojiObject.emoji);
 setShowPicker(false);
};


console.log(allposts)

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="div" gutterBottom >
          {allposts.map((post, index) => (
            <Card
              key={post['_id']}
              id="mediaCard"
              className="mediaCard"
              sx={{ marginBottom: "20px" }}
            >
              <CardHeader
                // style ={{backgroundColor: 'lightGray'}}
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    src={
                      post['createdBy']['profilePicture'] &&
                      `http://localhost:8080/${post['createdBy']['profilePicture']}`
                    }
                    // src={''}
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post['createdBy']['firstname']}
              />
             
              {post['img']['length'] > 1 ? (
                <>
                  <SimpleImageSlider
                    height="400px"
                    width="600px"
                    images={urls[index] ? urls[index] : []}
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
                  image={`http://localhost:8080/${post['img'][0]['path']}`}
                />
              )}
              <Typography style={{display:'flex'}}>
              <IconButton >
                <FavoriteIcon
                  aria-label="add to favorites"
                  style={{ color: `${post['likes'].some(like => like['userId'] === user['_id']) ? "red" : ""}` }}
                  onClick={() => {   
                    setlike(!like)                
                    handleLikePost(post['_id']);
                  }}
                  />
                </IconButton>
                {/* {console.log(post['likes'].some(like => like['userId'] === user['_id']))} */}
                <ChatBubbleOutlineIcon className="addToFav" onClick={()=>{setCommentModal(true);setIndex(index)}} />
                <BookmarkBorderOutlinedIcon className="bookmarkIcon" />
                  </Typography> 
              

              <Typography>
                {post['createdBy']['firstname']}:{post['caption']}
              </Typography>

              <Typography component='div'>
               
                {post['comments'].length > 0 ? (
                  <p id='comment' onClick={()=>{setCommentModal(true);setIndex(index)}}>view all {post['comments']['length']} comments...</p>
                ) : (
                  <p id='comment'>0 comments</p>
                )}
              </Typography>
              
              <Divider />
              <div className='commentMain'>  
             
                   <span className='emoji'> <img
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
                      </span>
                    <TextField
                      id="captionInput"
                      key={index}
                      // style={{ width: "100%" }}
                      // label={`${`&#128522`}Add Your Comment...`}
                      label={` Add Your Comment...`}
                      variant="standard"
                      value = {comment}
                      onChange={(e) => setComment(e.target.value)}
                      InputProps={{               
                        disableUnderline: true, 
                      }}
                    />
                    <Button variant="text" className='postbtn' onClick={()=>handlePostComment(post['_id'])}>Post</Button>
              </div>

            
            </Card>
          ))}
        </Typography>
      </Box>
{/* ***********************************Comment Modal***************************** */}

      <Modal open={commentModal}
            onClose={() =>setCommentModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            // style={{ margingLeft:'200px'}}
            >  
                {/* {commentModal ? ( */}
        <>
        {allposts.map((post,i) =>
           i===index && 
           
         
          <Box
            style={{
              // margin: "auto",
             
              justifyContent: "center",
              // marginTop: "-620px",
            }}
          >
          
            <Grid container sx={{ marginLeft:'16%',marginTop:'6px'}} >
              
                <ModalWrapper commentModal={commentModal}>
                  {post['img'].length >=2 ?
               <SimpleImageSlider
                   width={400}
                   height={500}
                   images={urls[i]}
                   showBullets={true}
                   showNavs={true}
                   />
                 :
                 <img src={`http://localhost:8080/${post['img'][0]['path']}`} alt="img" style={{ width:"400px",
                 height:"500px"}} />
                
                 }
                  <ModalContent>
                    <CloseIcon
                        style={{position: "relative",  right: "-87%" }}
                        onClick={() => setCommentModal((prev) => !prev)}
                      />
                   <Typography style={{ display: "flex"}}>
                                  
                        <Avatar src={ `http://localhost:8080/${user.profilePicture}`}/>
                         <Typography style={{display: "block",marginTop: "-10px",marginLeft: "10px"}}>
                               <p >{user.firstname}{ " "} {user.lastname}</p>
                               <p style={{marginLeft:'5px',marginTop:'-5px',marginBottom:'30px',color:'gray',minWidth:'180px',fontSize:'14px'}}> {post['location']}</p>
                                <p style={{marginTop: "-15px" }}>{post['caption']}</p>
                         </Typography>

                    </Typography>

                    <div>
                    {post['comments'].map((comment : any) =>
                  comment['comment']?
                (
                  <>
               
                    <Typography key={comment['_id']} component='div'  style={{marginTop: "15px",display: "flex"}}>
                        <Typography >
                              <Avatar src={ `http://localhost:8080/${comment['commentBy']['profilePicture']}`}/>
                        </Typography>
                      <Typography component='div' style={{display: "block",maxWidth:'300px'}}>
                        <Typography style={{display: 'flex' }} >
                              <p style={{marginLeft:'5px',marginTop:'5px',minWidth:'100px'}}>{comment['commentBy']['firstname']}{''} {comment['commentBy']['lastname']}</p>   
                              <p style={{marginLeft:'5px',marginTop:'5px',color:'gray',minWidth:'180px'}}> {comment['comment']}</p>
                              <FavoriteIcon
                                aria-label="add to favorites"
                                style={{ color: `${like ? "red" : "gray"}` }}
                                onClick={() => {
                                  setlike(!like);
                                  // handleLike(post._id, post);
                                }}
                              />
                          
                        </Typography>
                          <br />
                        <Typography style={{color:'gray' ,display:'flex',marginTop: "-35px" }}>
                            <ReactTimeAgo date={comment['time']} locale="en-US" timeStyle="round" style={{minWidth:'100px'}}/>
                            <TextField
                                  id="captionInput"
                                  key={index}
                                  style={{padding:'0px',marginTop:'-0px',marginLeft:'10px' }}
                                  size="small"
                                 
                                  placeholder="reply"
                                  variant="standard"
                                  // value = {comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  InputProps={{               
                                    disableUnderline: true, 
                                  }}
                                />
                        </Typography>
                        </Typography>

                      </Typography>
                   
                  
                  </>
                    
                  
                    ):(
                      ''
                    )
                    )
                  // }
                  }
                    <br />

                     
                    </div>
                    <br />
                    <br />
                    <br />
                   
                    <br />
                    <br />
                    
                  </ModalContent>
                </ModalWrapper>
            </Grid>
          </Box>
            )}
        </>
      {/* ) : null} */}
    </Modal>


    </Container>
  );
};
export default Login;
