import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card"
import { Button, InputLabel } from "@mui/material";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";


export default function Signup() {
  const paperStyle = { padding: 20, width: 480, margin: "20px auto" };
  const btnstyle = { margin: "20px 0px", width: "85px", };
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
  const [emailVerifyToken, setEmailVerifyToken] = useState('');
  const [data, setData] = useState({
    "firstname":"",
    "lastname": "",
    "email": "",
    "password": "" 
  }) 

//   const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit } = useForm();
  const theme = createTheme();

  /*
   * Verify Credentials
   */

  const handleCloseModal = () => {
    setOpenModal(false);
  }
  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const doSignUp = (formData: any) => {
    // setButtonDisabled(true);
    handleOpenModal()
    // console.log(data)
    authenticationService.register1(data)
      // .verifyCredentials(formData)
      // .registerdata);
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper style={paperStyle}
        elevation={10}>
     
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(doSignUp)}
            noValidate
            sx={{ mt: 1 }}
          >
              <TextField
              margin="normal"
              required
              fullWidth
            //   defaultValue="navanath@angularminds.com"
              id="firstname"
              label="First Name"
              name="firstName"
              autoComplete="firstname"
              autoFocus
              onChange={(e) =>setData({...data, firstname: e.target.value})}
            />
             <TextField
              margin="normal"
              required
              fullWidth
            //   defaultValue="navanath@angularminds.com"
              id="lastname"
              label="Last Name"
              name="lastName"
              autoComplete="lastname"
              autoFocus
              onChange={(e) =>setData({...data, lastname: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) =>setData({...data, email: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) =>setData({...data, password: e.target.value})}
            />
           
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            //   loading={isButtonDisabled}
            >
              Sign up
            </LoadingButton>
            
          </Box>
        </Box>
       
        </Paper>
      </Container>
      <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
           <InputLabel >Verify your email</InputLabel>
            <TextField 
                  style={{width:'370px',marginTop: "20px"}}
                  label="Email"       
                  placeholder="Enter Email address"
                  variant="outlined"
                 
                  // value={password.pass}
                  onChange={(e) => setEmailVerifyToken(e.target.value)}
                  // error = { clickSave &&  !(err.pass)?true:false}
                  // helperText={ clickSave &&  !(err.pass)? "old password is required" : ''}
                  required
                  id='1'
                />

            
                  <Button style={btnstyle} variant="contained" color="primary" 
                  onClick={(e) =>authenticationService.verifyEmail(emailVerifyToken)}
                  >Verify</Button>
            </Box>
      </Modal>

    </ThemeProvider>
  );
}
