import { Avatar,Box,Grid,IconButton,InputAdornment,TextareaAutosize,TextField} from "@mui/material";
import React, { useState, useRef, useEffect, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Picker from "emoji-picker-react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import SimpleImageSlider from "react-simple-image-slider";
import styled from "styled-components";
import {post} from '../../utils/http/httpMethods'
const ModalWrapper = styled.div`
  width: 990px;
  height: 550px;
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
interface booleanProps {
  showModal: boolean;
  setShowModal: boolean;
  image: image;
}
const UploadImg = ({ showModal, setShowModal, image }: booleanProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const[previewImage,setPreviewImage] = useState([]);
  const [inputStr, setInputStr] = useState("");
  useEffect(() => {
    let a = image && image.filepriview.map((file:any) =>{
        return file
     })
     setPreviewImage(a)
  },[image])
  const onEmojiClick = (event: any, emojiObject: any) => {
     setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  const addPost = () => {
    const formData = new FormData();
    if (image.file.length > 1) {
      let imgArr = image.file.map((f:any) => { return f })
      for (var key of Object.keys(imgArr)) {
        formData.append("photos", imgArr[key]);
      }
    } else {
      let imageArr = image.file.map((f:any) => { return f})
      console.log("imageArr",imageArr)
      formData.append("photos",imageArr[0]);
     }
     formData.append("caption", inputStr);
      post("http://localhost:8080/feeds", formData).then((response: any) => {
    });
    setShowModal(false);
}
  return (
    <>
      {showModal ? (
        <>
          <Box
            style={{
              margin: "auto",
              justifyContent: "center",
              marginTop: "-620px",
            }}
          >
            <CloseIcon
              style={{ position: "relative", top: "3%", right: "-103%" }}
              onClick={() => setShowModal((prev) => !prev)}
            />
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ backgroundColor: "white", height: "60px" }}
              >
                <a
                  style={{
                    float: "right",
                    color: "#1890FF",
                    fontSize: "20px",
                    marginRight: "5px",
                    cursor: "pointer"
                  }}
                  onClick = {()=> addPost()}
                >
                  upload
                </a>
              </Grid>
                <ModalWrapper showModal={showModal}>
                  {previewImage && previewImage.length >=2 ?
               <SimpleImageSlider
                   width={632}
                   height={550}
                   images={previewImage}
                   showBullets={true}
                   showNavs={true}
                   />
                 :
                 <img src={image.filepriview} alt="img" style={{ width:"630px",
                 height:"550px"}} />
                 }
                  <ModalContent>
                    <label style={{ display: "flex", padding: "10px 15px" }}>
                      {" "}
                      <Avatar />
                      &nbsp;&nbsp;&nbsp;<p>UserName</p>
                    </label>
                    <div>
                    <TextareaAutosize
                      minRows={13}
                      value={inputStr}
                      onChange={(e) =>{setInputStr(e.target.value)}}
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
        </>
      ) : null}
    </>
  );
};
export default UploadImg;