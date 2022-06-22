import React, { Suspense, lazy } from "react";
import { useState, useEffect } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  Modal,
  Typography,
  Avatar,
  Divider,
  TextField,
} from "@mui/material";
import Picker from "emoji-picker-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SimpleImageSlider from "react-simple-image-slider";
import ReactTimeAgo from "react-time-ago";
import authAxios from "../../utils/http/api";
import CloseIcon from "@mui/icons-material/Close";
import LikesModal from "./LikesModal";

function CommentsModel({
  allposts,
  index,
  urls,
  user,
  commentModal,
  setCommentModal,
  getdata,
}: any) {
  const [replytocomment, setReplytocomment] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [likeModal, setLikeModal] = useState(false);
  const [pickerOpen, togglePicker] = React.useReducer((state) => !state, false);

  const [currentComment, setCurrentComment] = useState({
    comment: String,
    commentBy: {},
    likes: [],
    reply: [],
    time: String,
    _id: String,
  });

  // ***********************handle Like comment *************************
  const handleLikeComment = async (e: any, commId: any, postId: any) => {
    console.log(commId);
    const data = {
      commentId: commId,
    };
    const res = await authAxios.patch(`/post/likecomment/${postId}`, data);
    console.log(res);
    getdata();
  };

  // ************************handle emoji select *************************
  const onEmojiClick = (event: any, emojiObject: any) => {
    setReplytocomment((prevInput) => prevInput + emojiObject.emoji);
    //  setShowPicker(false);
  };

  // ************************ handle bookmark posts *************************
  const handelBookmark = async (postId: any) => {
    const data = {
      postId: postId,
    };
    const res = await authAxios.put(`/users/bookmark/post`, data);
    console.log(res);
    getdata();
  };



  // ************************handle reply to Comment *************************
  const handlereplyToComment = async (postid: any, commId: any) => {
    let trimmedComment = replytocomment.split("_").pop();
    // console.log(trimmedComment);
 
    const data = {
      reply: trimmedComment,
      commentId: commId,
    };
    console.log(data);
    const res = await authAxios.put(`/post/reply/${postid}`, data);
    setReplytocomment(" ");
    console.log(res);
    // getdata();
  };

  // console.log(replytocomment)
  return (
    <>
      <Modal
        open={commentModal}
        id="commentsModal"
        onClose={() => setCommentModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        aria-hidden="true"
      >
        <>
          {allposts.map(
            (post: any, i: any) =>
              i === index && (
                
                <Box key={i} style={{ justifyContent: "center" }}>
                  <Grid container sx={{ marginLeft: "2%", marginTop: "86px" }}>
                    <div
                      className="wrap"
                      // commentModal={commentModal}
                    >
                      {post["img"].length >= 2 ? (
                        <SimpleImageSlider
                          width={400}
                          height={500}
                          images={urls[i]}
                          showBullets={true}
                          showNavs={true}
                        />
                      ) : (
                        <img
                          src={`http://localhost:8080/${post["img"][0]["path"]}`}
                          alt="img"
                          style={{ width: "400px", height: "500px" }}
                        />
                      )}
                      {/* {console.log(post)} */}
                      <div className="insideWrap">
                        <Typography
                          style={{
                            display: "flex",
                            marginTop: "0px",
                            padding: "0px",
                            height: "120px",
                          }}
                        >
                          <Avatar
                            src={`http://localhost:8080/${post["createdBy"]["profilePicture"]}`}
                          />
                          <Typography
                            style={{
                              display: "block",
                              marginTop: "-10px",
                              marginLeft: "10px",
                            }}
                          >
                            <p>
                              {post["createdBy"]["firstname"]}{" "}
                              {post["createdBy"]["lastname"]}
                            </p>
                            <p
                              style={{
                                marginLeft: "5px",
                                marginTop: "-5px",
                                marginBottom: "30px",
                                color: "gray",
                                minWidth: "180px",
                                fontSize: "14px",
                              }}
                            >
                              {" "}
                              {post["location"]}
                            </p>
                            <p
                              style={{
                                marginTop: "-15px",
                                width: "200px",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                              }}
                            >
                              {post["caption"]}
                            </p>
                          </Typography>

                          <Typography
                            style={{
                              paddingRight: "-100px",
                              width: "130px",
                              alignItems: "right",
                            }}
                          >
                            <CloseIcon
                              style={{
                                position: "relative",
                                display: "block",
                                float: "right",
                              }}
                              onClick={() =>
                                setCommentModal((prev: any) => !prev)
                              }
                            />
                            <ReactTimeAgo
                              date={post["createdAt"]}
                              locale="en-US"
                              timeStyle="round"
                              style={{
                                position: "relative",
                                display: "block",
                                marginRight: "-30px",
                                float: "right",
                                marginTop: "40px",
                                fontSize: "12px",
                              }}
                            />
                          </Typography>
                        </Typography>
                   <Divider />
                        <Typography
                          style={{
                            overflow: "auto",
                            height: "245px",
                            width: "380px",
                            fontSize: "xx-small",
                          }}
                        >
                          {post["comments"].length>0?
                          (

                          
                          post["comments"].map((comment: any,index:any) =>
                            comment["comment"] ? (
                              <p key={index}> 
                                <Typography
                                  key={comment["_id"]}
                                  component="div"
                                  style={{ marginTop: "15px", display: "flex" }}
                                >
                                  <Typography>
                                    <Avatar
                                      src={`http://localhost:8080/${comment["commentBy"]["profilePicture"]}`}
                                    />
                                  </Typography>
                                  <Typography
                                    component="div"
                                    style={{
                                      display: "block",
                                      maxWidth: "300px",
                                    }}
                                  >
                                    <Typography style={{ display: "flex" }}>
                                      <p
                                        style={{
                                          marginLeft: "5px",
                                          marginTop: "5px",
                                          minWidth: "100px",
                                          fontSize: "15px",
                                        }}
                                      >
                                        {comment["commentBy"]["firstname"]}
                                        {""} {comment["commentBy"]["lastname"]}
                                      </p>
                                      <p
                                        style={{
                                          marginLeft: "5px",
                                          marginTop: "5px",
                                          color: "gray",
                                          minWidth: "180px",
                                          fontSize: "15px",
                                        }}
                                      >
                                        {" "}
                                        {comment["comment"]}
                                      </p>
                                      <FavoriteIcon
                                        href="javascript:void(0)"
                                        aria-label="add to favorites"
                                        style={{cursor:'pointer',
                                          color: `${
                                            comment["likes"].some(
                                              (like: any) =>
                                                like["userId"] === user["_id"]
                                            )
                                              ? "red"
                                              : "gray"
                                          }`,
                                        }}
                                        onClick={(e: any) => {
                                          handleLikeComment(
                                            e,
                                            comment["_id"],
                                            post["_id"]
                                          );
                                        }}
                                      />
                                    </Typography>
                                    <br />
                                    <Typography
                                      style={{
                                        color: "gray",
                                        display: "flex",
                                        marginTop: "-35px",
                                      }}
                                    >
                                      <ReactTimeAgo
                                        date={comment["time"]}
                                        locale="en-US"
                                        timeStyle="round"
                                        style={{
                                          minWidth: "100px",
                                          fontSize: "15px",
                                        }}
                                      />
                                      <div
                                        style={{
                                          padding: "0px",
                                          marginTop: "-0px",
                                          marginLeft: "10px",
                                        }}
                                        onClick={(e) => {
                                          setCurrentComment(comment);
                                          setReplytocomment(
                                            `@${comment["commentBy"]["firstname"]}_`
                                          );
                                          document.getElementById('temp')?.focus();
                                        }}
                                      >
                                        reply
                                      </div>
                                    </Typography>
                                  </Typography>
                                </Typography>
                              </p>
                            ) : (
                              ""
                            )
                          )
                          
                          ): 
                          (
                            <Typography style={{textAlign: "center"}}> 0 Comments </Typography>
                          )
                          }
                          <br />
                        </Typography>
                        <br />

                        <Card className="commentOnCommentcard">
                          <Grid
                            style={{
                              marginLeft: "10px",
                              marginRight: "10px",
                              fontSize: "15px",
                              marginTop: "-5px",
                            }}
                          >
                            <FavoriteIcon
                              style={{
                                paddingTop: "4px",
                                color: ` ${
                                  post["likes"].length !== 0 ? "red" : "gray"
                                }`,
                              }}
                            />
                            {post["savedBy"].some(
                              (save: any) => save["userId"] === user["_id"]
                            ) ? (
                              <BookmarkIcon
                                style={{ float: "right", paddingTop: "4px" }}
                                onClick={() => handelBookmark(post["_id"])}
                              ></BookmarkIcon>
                            ) : (
                              <BookmarkBorderOutlinedIcon
                                style={{ float: "right", paddingTop: "4px" }}
                                onClick={() => handelBookmark(post["_id"])}
                              />
                            )}
                            <p
                              data-bs-toggle="modal"
                              data-bs-target="#likesModal"
                              style={{
                                paddingBottom: "4px",
                                margin: "0px",
                                fontSize: "14px",
                                cursor:'pointer'
                              }}
                              onClick={() => {setCurrentPost(post);setLikeModal(true)}}
                            >
                              {post["likes"].length}likes
                            </p>
                            <ReactTimeAgo
                              date={post["createdAt"]}
                              locale="en-US"
                              timeStyle="round"
                              style={{
                                paddingBottom: "5px",
                                minWidth: "100px",
                                fontSize: "14px",
                              }}
                            />
                            <Divider style={{ padding: "5px" }} />
                          </Grid>

                          <CardContent
                            className="commentModalConnInput"
                            sx={{ width: "375px", paddingTop: "20px" }}
                          >
                            <div className="commentMain">
                              <span className="emoji1">
                                <img
                                  className="emoji-icon"
                                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                  onClick={() => {
                                    setShowPicker(!showPicker);
                                  }}
                                  style={{ position: "relative", left: "4%" }}
                                />
                                {showPicker && (
                                  <Picker
                                    // id="emojiPick"
                                    onEmojiClick={onEmojiClick}
                                    // onValueChange={console.log('backaction')}
                                    pickerStyle={{
                                      position: "fixed",
                                      // maxwidth: "25%",
                                      width:'300px',
                                      height: "40%",
                                      left: "27%",
                                      top: "300px",
                                    }}
                                 />
                                    
                                  
                                )}
                              </span>
                              <TextField
                              id='temp'
                                placeholder={` Add Your Comment...`}
                                variant="standard"
                                value={replytocomment}
                                onChange={(e) =>
                                  setReplytocomment(e.target.value)
                                }
                                InputProps={{
                                  disableUnderline: true,
                                }}
                              />

                              <Button
                                variant="text"
                                sx={{ marginLeft: "70px" }}
                                onClick={() =>
                                  handlereplyToComment(
                                    post["_id"],
                                    currentComment["_id"]
                                  )
                                }
                              >
                                Post
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </Grid>
                </Box>
              )
          )}
        </>

        {/* const [likeModal, setLikeModal] = useState(false); */}
      </Modal>
      <LikesModal likeModal={likeModal} setLikeModal={setLikeModal} post={currentPost} />
    </>
    // </Container>
  );
}

export default CommentsModel;
