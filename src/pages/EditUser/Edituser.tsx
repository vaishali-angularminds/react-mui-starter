import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import Avatar from "@mui/material/Avatar";
import history from "../../routes/history";
import { paths } from "../../routes/routes.config";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { authenticationService } from '../../utils/auth.service';
import { useState, useEffect } from "react";
const Edituser = () => {
  let err1 = {
    email: false,
    mobNo: false,
  };
  const paperStyle = { padding: 20, width: 480, margin: "20px auto" };
  const btnstyle = { margin: "20px 100px", width: "85px" };

 
  const [userData, setUserData] = useState({});
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("other");
  const [DOB, setDOB] = useState("");
  const [email, setEmail] = useState("");
   const [err, setErr] = useState(err1);
  
  const [image, setImage] = useState({
    file: [],
    filepreview: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser")  || '{}') ;
    
    setUserData(user);
    setImage({ ...image, filepreview: `http://localhost:8080/${user.profilePicture}` });
    // setUId(JSON.parse(localStorage.getItem("currentUser"))._id || ' ');
    setEmail(user.email);
    setFName(user.firstname);
    setLName(user.lastname);
    setBio(user.bio);
    setDOB(user.dob);
    setGender(user.gender || '');
    // window.location.reload('true');
  }, []);

  const handleIMG = (event: any) => {
  //  console.log(URL.createObjectURL(event.target.files[0]))
    setImage({
      ...image,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]) ,
    });
   
    const formData = new FormData();
    formData.append('path',event.target.files[0])
    
    authenticationService.updateProfilePicture(userData._id,formData)
  };

   const handleRemoveProfile = () =>{
   
    setImage({
        ...image,
        file: [],
        filepreview:  '',
      })
    const formData = new FormData();
    formData.append('path'," ")
    
    authenticationService.updateProfilePicture(userData._id,formData)


   }

 


  const handleSubmit = async() => {
    // isValidmail(email)
   
  
        let data = {
         
          "firstname":fname,
          "lastname":lname,
          "email":email,
          "gender":gender,
          "dob":DOB,
          "bio":bio,
                    
        }
        //  console.log(data)        
          authenticationService.updateUser(data,userData._id)
       
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          {/* <Grid style={{alignItems: 'center'}}> */}
            {/* <></>
          </Grid> */}
          <Avatar
            
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // color="inherit"
            src={`${image.filepreview && image.filepreview}`}
            // src={`http://localhost:8080/${userData.profilePicture && userData.profilePicture}`}

          />
          <h2>Edit Profile</h2>
          <div style={{display: 'flex'}}>
            <div style={{display: 'block', marginLeft: "20px"}}>
                <InputLabel>Add Profile</InputLabel>
                <input
                  style={{ marginLeft: "40px"}}
                  type="file"
                  name="Change Profile Picture"
                  onChange={(e) => {
                    handleIMG(e);
                  }}
                  ></input>
          </div>
          <div style={{display: 'block'}}>

          <InputLabel>Delete Profile</InputLabel>
          <Button onClick={() =>handleRemoveProfile()}>Delete</Button>
          </div>

        </div>

        </Grid>

        <TextField
          style={{ width: "470px", marginTop: "20px" }}
          label="first name"
          // error={erName}
          placeholder="Enter first name"
          variant="outlined"
          value={fname}
          onChange={(e) => setFName(e.target.value)}
          required
        />
        <TextField
          style={{ width: "470px", marginTop: "20px" }}
          label="last name"
          // error={erName}
          placeholder="Enter last name"
          variant="outlined"
          value={lname}
          onChange={(e) => setLName(e.target.value)}
          required
        />
        <div style={{ marginTop: "20px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Birth Date"
              value={DOB}
              onChange={(newValue) => {
                  setDOB(newValue);
               
                
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <TextField
          style={{ width: "470px", marginTop: "20px" }}
          label="email"
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

        <InputLabel
          style={{ marginTop: "20px" }}
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
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
        </RadioGroup>

        

        <TextareaAutosize
          style={{
            width: "470px",
            marginTop: "20px",
            height: "45px",
            borderRadius: "5px",
          }}
          // error={erName}
          placeholder="Enter Bio"
          variant="outlined"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />

        

        <Button
          color="primary"
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          style={btnstyle}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            
            history.push(paths.home);
           window.location.reload();
          }}
          color="error"
          variant="contained"
          
        >
          Cancel
        </Button>
      </Paper>
    </div>
  );
};

export default Edituser;
