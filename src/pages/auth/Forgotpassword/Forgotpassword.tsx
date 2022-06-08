import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Forgotpassword.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import history from "../../../routes/history";
import { paths } from "../../../routes/routes.config";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");

  const { handleSubmit } = useForm();
  const theme = createTheme();

  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    // setButtonDisabled(true);
    authenticationService
      .verifyCredentials(formData)
      .then((response: any) => {
        // setButtonDisabled(false);
      })
      .catch((error) => {
        // setButtonDisabled(false);
      });
  };
  
  const handleBack = ()=>{
    history.push(paths.login);
  window.location.reload();
  }
  const handleforgotPass = () =>{
 const data ={
   email:email
 }
 authenticationService.requestForgotPassword(data).then((response: any) => {
    //  history.push('https://ethereal.email/messages')
    history.push(paths.resetpassword)
    window.location.reload();
})
  }

  return (
    <Paper elevation={4} className="mainCard">
     
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot your password?
          </Typography>

          <Typography className="typoText">
            Please enter the email address associated with your account, and
            we'll email you a link to reset your password.
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            className="email"
            // defaultValue="navanath@angularminds.com"
            id="email"
            size="small"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          onClick={()=>handleforgotPass()}
          >
            Forgot password
          </Button>
          <Button variant="text" id='backbtn' onClick={()=>handleBack()}>Back</Button>
        </Box>
      </Container>
    
    </Paper>
  );
}
