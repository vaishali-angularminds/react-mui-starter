import {
  Button,
  TextField,
  TextareaAutosize,
  FormControlLabel,
  Avatar,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Divider,
  InputLabel,
  Typography,
} from "@mui/material";
import { MenuItem, Menu } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { authenticationService } from "../../utils/auth.service";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
function EditUserModal({ editModal, setEditModal }: any) {
  let err1 = {
    email: false,
    mobNo: false,
  };
  const paperStyle = { padding: 20, width: 480, margin: "20px auto" };
  const btnstyle = { margin: "20px 100px", width: "85px" };
  // const addPhotostyle = { padding:3,borderRadius: '50%', width: 20, margin: "20px auto" ,marginTop:'75px',marginLeft:'55px',backgroundColor:'white',color:'#1e90ff',position:'absolute'};

  const [userData, setUserData] = useState({
    bookmark: [],
    createdAt: String,
    deleted: Boolean,
    email: String,
    firstname: String,
    gender: String,
    isEmailVerified: Boolean,
    lastname: String,
    profilePicture: String,
    role: String,
    updatedAt: String,
    _id: String,
  });
  const [name, setName] = useState("");
  // const [lname, setLName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("other");
  const [DOB, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateProfileModal, setUpdateProfileModal] = useState(false);

  const [image, setImage] = useState({
    file: [],
    filepreview: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

    setUserData(user);
    setImage({
      ...image,
      filepreview: `http://localhost:8080/${user.profilePicture}`,
    });

    setEmail(user.email);
    // setName(user.firstname);
    setName(user.name);
    setBio(user.bio);
    setDOB(user.dob);
    setGender(user.gender || "");
    setPhone(user.mobNo && user.mobNo.toString());
  }, []);

  const handleIMG = (event: any) => {
    setImage({
      ...image,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });

    const formData = new FormData();
    formData.append("path", event.target.files[0]);

    authenticationService.updateProfilePicture(userData["_id"], formData);
  };

  const handleRemoveProfile = () => {
    setImage({
      ...image,
      file: [],
      filepreview: "",
    });
    const formData = new FormData();
    formData.append("path", " ");

    authenticationService.updateProfilePicture(userData._id, formData);
  };

  const handleSubmit = async () => {
    let data = {
      name: name,
      email: email,
      bio: bio,
      gender: gender,
      dob: DOB,
      mobNo: phone,
    };
    console.log(data);
    authenticationService.updateUser(data, userData._id);
  };

  // console.log(phone)
  return (
    <Grid>
      <Modal
        open={editModal}
        id="editUserModal"
        onClose={() => setEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        aria-hidden="true"
      >
        <Paper elevation={10} style={paperStyle}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "5vh" }}
          >
            <Grid sx={{ display: "flex" }}>
              <Typography sx={{ fontSize: "20px", marginLeft: "170px" }}>
                Profile Update
              </Typography>

              <div style={{ marginLeft: "130px" }}>
                <CloseIcon
                  style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "right",
                    marginTop: "-10px",
                    // paddingRight:'10px',
                  }}
                  onClick={() => setEditModal((prev: any) => !prev)}
                />
              </div>
            </Grid>
            <Avatar
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{ width: 70, height: 70, position: "relative" }}
              src={`${image.filepreview && image.filepreview}`}
              //   src={`http://localhost:8080/${userData.profilePicture && userData.profilePicture}`}
            />
            <AddAPhotoIcon
              style={{
                padding: 3,
                borderRadius: "50%",
                width: 20,
                marginTop: "100px",
                marginLeft: "50px",
                backgroundColor: "white",
                color: "#1e90ff",
                position: "absolute",
              }}
              onClick={(e) => setUpdateProfileModal(true)}
            />
          </Grid>
          <TextField
            style={{ width: "470px", marginTop: "20px" }}
            label="Name"
            // error={erName}
            size="small"
            placeholder="Enter name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            style={{ width: "470px", marginTop: "20px" }}
            label="Email id"
            size="small"
            //  error={err.email}
            placeholder="Enter email address"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // isValidmail(e.target.value)
            }}
            required
          />
          <TextareaAutosize
            style={{
              width: "470px",
              marginTop: "20px",
              height: "90px",
              borderRadius: "5px",
            }}
            // error={erName}
            placeholder="Enter your bio here"
            // variant="outlined"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />

          <InputLabel
            style={{ marginTop: "10px" }}
            id="demo-row-radio-buttons-group-label"
          >
            Gender
          </InputLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            value={gender}
            name="radio-buttons-group"
            onChange={(e) => setGender(e.target.value)}
            //   required
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>

          <div style={{ marginTop: "10px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label=" Date Of Birth"
                value={DOB}
                onChange={(newValue: any) => {
                  setDOB(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </div>

          <InputLabel
            style={{ marginTop: "20px" }}
            id="demo-row-radio-buttons-group-label"
          >
            Enter Contact Number
          </InputLabel>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            defaultCountry="IN"
            style={{ width: "470px", marginTop: "5px" }}
            onChange={(e: any) => setPhone(e)}
          />

          <Button
            style={{ marginTop: "20px" }}
            color="primary"
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            fullWidth
          >
            Save Profile
          </Button>
        </Paper>
      </Modal>

      {/* ************************* update profile modal******************** */}
      <Modal
        open={updateProfileModal}
        onClose={() => setUpdateProfileModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
          <Grid
            sx={{
              padding: 2,
              marginTop:'150px',
              borderRadius: 3,
              height: "150px",
              width: "200px",
              marginLeft: "380px",
              backgroundColor: "white",
            }}>
               <input
                    style={{ display: "none"}}
                    type="file"
                    id="updateProfilePhoto"
                    name="Change Profile Picture"
                    onChange={(e) => {
                      handleIMG(e);
                    }}
                  />
              <MenuItem>
               <label  htmlFor="updateProfilePhoto">
                <AddAPhotoOutlinedIcon />                 
                  Update Profile
                  </label>
              </MenuItem>



              <MenuItem onClick={() =>handleRemoveProfile()}>
                  <DeleteOutlineIcon />
                    Remove Photo
              </MenuItem>
           <Divider />
              <MenuItem onClick={()=>setUpdateProfileModal(false)} >
                  <CloseIcon/>
                    cancel
              </MenuItem>
          </Grid>
      </Modal>
    </Grid>
  );
}

export default EditUserModal;
