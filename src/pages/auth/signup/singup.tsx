import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import "./login.scss";
import "./signup.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import { Button, InputLabel } from "@mui/material";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import history from '../../../routes/history'

export default function Signup() {
  const paperStyle = { padding: 20, width: 480, margin: "20px auto" };
  const btnstyle = { margin: "20px 0px", width: "85px" };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openModal, setOpenModal] = useState(false);
  const [emailVerifyToken, setEmailVerifyToken] = useState("");
  const [fname,setFName] = useState("");
  const [lname,setLName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  // const [data, setData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  // });

  //   const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit } = useForm();
  const theme = createTheme();

  /*
   * Verify Credentials
   */

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const doSignUp = () => {
    const data ={ 
      name:`${fname}  ${lname}`,
      email:email,
      password:password
    }
    console.log(data);
    handleOpenModal();
  
    authenticationService
      .register1(data)
       .then((response: any) => {
        // setButtonDisabled(false);
        // console.log(response);
      })
      .catch((error) => {
        // setButtonDisabled(false);
        console.log(error);
      });
  };
  /*
   * Render
   */
  return (
    <Paper elevation={5} className="card_singup">
      <div>
        <Typography component="h1" className="signup_title" variant="h5">
          Sign up to Social Feed
        </Typography>
      </div>

      <CardContent>
        <Box
          component="form"
          className="signup_form"
          onSubmit={handleSubmit(doSignUp)}
          noValidate
          // sx={{ mt: 1 }}
        >
          <div className="name">
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              //   defaultValue="navanath@angularminds.com"
              id="firstname"
              label="First Name"
              name="firstName"
              autoComplete="firstname"
              autoFocus
              onChange={(e) => setFName(e.target.value )}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              //   defaultValue="navanath@angularminds.com"
              id="lastname"
              label="Last Name"
              name="lastName"
              autoComplete="lastname"
              autoFocus
              onChange={(e) =>setLName(e.target.value )}
            />
          </div>
          <TextField
            // margin="normal"
            required
            fullWidth
            className="email"
            id="email"
            size="small"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value )}
          />
          <TextField
            // margin="normal"
            required
            size="small"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value )}
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            //   loading={isButtonDisabled}
          >
            Sign up
          </LoadingButton>
          <div>
            <Typography>
              Already having an account?
              <a style={{ color: "#1976d2" }} onClick={(e)=>{history.push("/auth/login");
           window.location.reload()}}> Sign in</a>
            </Typography>
          </div>
        </Box>
      </CardContent>
     
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputLabel>Verify your email</InputLabel>
          <TextField
            style={{ width: "370px", marginTop: "20px" }}
            label="Token"
            placeholder="Enter Token"
            variant="outlined"
            // value={password.pass}
            onChange={(e) => setEmailVerifyToken(e.target.value)}
            // error = { clickSave &&  !(err.pass)?true:false}
            // helperText={ clickSave &&  !(err.pass)? "old password is required" : ''}
            required
            id="1"
          />

          <Button
            style={btnstyle}
            variant="contained"
            color="primary"
            onClick={(e) => {
              authenticationService.verifyEmail(emailVerifyToken);
              history.push("/auth/login");
                 window.location.reload()
              handleCloseModal();
            }}
          >
            Verify
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
}
