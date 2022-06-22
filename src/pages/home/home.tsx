import "./home.scss";
import {Container,Typography,Box,Avatar,Divider,TextField,Button,IconButton,Grid,Modal} from "@mui/material";
import {Card,CardMedia,CardHeader,CardContent} from "@mui/material";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SimpleImageSlider from "react-simple-image-slider";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import authAxios from "../../utils/http/api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { authenticationService } from "../../utils/auth.service";
import { useEffect, useState ,useRef} from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Picker from "emoji-picker-react";
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

import CommentsModal from '../home/CommentsModal'
const Login = () => {


  TimeAgo.setDefaultLocale(en.locale)
   TimeAgo.addLocale(en)

   const nodeRef = useRef();

  const [like, setlike] = useState(false);
  const [allposts, setAllposts] = useState([]);
  const [urls, setUrls] = useState([]);
  const [comment, setComment] = useState('')
  const [commentModal,setCommentModal] = useState(false)
  const [index,setIndex] = useState(0)
  const [showPicker, setShowPicker] = useState(false);
  const [replytocomment,setReplytocomment] =useState('');
  const [showPickers, setShowPickers] = useState([]);
  const [currentComment,setCurrentComment] = useState({
    comment: String,
commentBy: {},
likes: [],
reply: [],
time: String,
_id:String
  })
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("currentUser")  || '{}')  )
  let val = [];
//  let currentComment ={}
 
const getdata = async () => {
  const res = await authAxios.get(`/post`);
  setAllposts(res.data.results);
    val = res.data.results.map((p : any) => {
    return p.img.map((im : any) => {
      return `http://localhost:8080/${im.path}`;
    });
  });

  setUrls(val);
  // let arr =new Array()
  let arr: any[] = []
  arr.length =  res.data.results.length
 setShowPickers(arr.fill(false))

 const re = await authAxios.get(`/users/${user._id}`)
//  setSavedPosts(re.data.bookmark)
};

    useEffect(() => {
    
      getdata();
    }, []);

   

  // ************************Comment on Post *************************
const handlePostComment = async (postid : any) =>{
  const data = { 
    comment:comment
  }
  const res = await authAxios.patch(`/post/${postid}`,data);
  setComment(' ')
console.log(res)
getdata();
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

// ************************handle emoji select *************************
const onEmojiClick = (event: any, emojiObject: any) => {
  setComment((prevInput) => prevInput + emojiObject.emoji);
 setShowPicker(false);

};

// ************************ handle bookmark posts *************************
const handelBookmark =  async (postId : any) =>{
   const data = { 
     postId:postId,
   }
    const res = await authAxios.put(`/users/bookmark/post`,data);
   console.log(res);
   getdata();
  }
// ****************************handle like comment*************************
const handleLikeComment = async (commId : any,postId : any) =>{
  const data = {
    commentId : commId
  }
  const res = await authAxios.patch(`/post/likecomment/${postId}`,data);
  console.log(res)
}


// console.log(nodeRef.current);

console.log(allposts)
// console.log(showPickers)
let temp : any [] = [];
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="div" gutterBottom >
          {allposts.map((post :any, index) => (
            <Card
              key={post['_id']}
              id="mediaCard"
              className="mediaCard"
              sx={{ marginBottom: "20px" }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    src={
                      post['createdBy']['profilePicture'] &&
                      `http://localhost:8080/${post['createdBy']['profilePicture']}`
                    }
                    
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
                  style={{ color: `${post['likes'].some((like:any) => like['userId'] === user['_id']) ? "red" : ""}` }}
                  onClick={() => {   
                    setlike(!like)                
                    handleLikePost(post['_id']);
                  }}
                  />
                </IconButton>
                {/* {console.log(post['likes'].some(like => like['userId'] === user['_id']))} */}
                <ChatBubbleOutlineIcon className="addToFav" 
                data-bs-toggle="modal"
                data-bs-target="#commentsModal"
                 onClick={()=>{setCommentModal(true);setIndex(index)}} 
                 />
                {/* </ChatBubbleOutlineIcon> */}
               {post['savedBy'].some((save :any )=> save['userId'] === user['_id']) ?
               (
                <BookmarkIcon className="bookmarkIcon" onClick={()=>handelBookmark(post['_id'])}></BookmarkIcon>
               ):(
                <BookmarkBorderOutlinedIcon className="bookmarkIcon" onClick={()=>handelBookmark(post['_id'])}  />

               )}             
                
                  </Typography> 
              

              <Typography>
                {post['createdBy']['firstname']}:{post['caption']}
              </Typography>

              <Typography component='div'>
               
                {post['comments'].length > 0 ? (
                  <p id='comment' data-bs-toggle="modal"
                  data-bs-target="#commentsModal"
                   onClick={()=>{setCommentModal(true);setIndex(index)}} 
                    // onClick={()=>{setCommentModal(true);setIndex(index)}}
                    >view all {post['comments']['length']} comments...</p>
                ) : (
                  <p id='comment'>0 comments</p>
                )}
              </Typography>
              
              <Divider />
              <div className='commentMain'>  
             
                   <span className='emoji'>
                      <img
                        className="emoji-icon"
                        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                        onClick={() =>{ setShowPicker((val) => !val);
                          temp=showPickers
                          temp[index] = !(temp[index])
                          setShowPickers(temp)                          
 
                        }}
                        
                        style={{ position: "relative", left: "4%" }}
                      />
                   {showPickers[index] && (
                        <Picker
                        // id='emojiPick'
                        onEmojiClick={onEmojiClick}
                        pickerStyle={{ position:'initial', width:'300px', height:'300px',left:'270px',top:'300px' }}
                        />  
                      )}
                      </span>
                    <TextField
                      id="captionInput"
                      // id={`picker${index} `}
                      key={index}
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

<CommentsModal 
allposts={allposts}
index={index}
urls={urls}
user={user}
getdata={getdata}
commentModal={commentModal}
setCommentModal={setCommentModal}


/>
{/* {console.log(commentModal)} */}
    </Container>
  );
};
export default Login;
