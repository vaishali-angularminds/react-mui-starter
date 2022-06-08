import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import signup from "../signup/singup";
import Paper from "@mui/material/Paper";
import { GoogleLogin } from "react-google-login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Login() {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { handleSubmit } = useForm();
  const theme = createTheme();

  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    console.log(data);
    setButtonDisabled(true);
    authenticationService
      .verifyCredentials(data)
      .then((response: any) => {
        setButtonDisabled(false);
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
  };

  /*
   * Render
   */
  return (
    <Paper elevation={5} className="signin_card">
      <div>
        <Typography component="h1" className="signin_title" variant="h5">
          Sign in to Social Feed
        </Typography>
      </div>

      {/* <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} 
        >*/}
      {/* <Typography component="h1" variant="h5">
          Sign in to Social Feed
          </Typography> */}
      <Box
        component="form"
        onSubmit={handleSubmit(doLogin)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          className="email"
          // defaultValue="navanath@angularminds.com"
          id="email"
          size="small"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          size="small"
          defaultValue={data.password}
          type="password"
          id="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="current-password"
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
          loading={isButtonDisabled}
        >
          Sign In
        </LoadingButton>

        <Grid container style={{ marginTop: "-15px" }}>
          <Grid item xs sx={{ textAlign: "right", mt: "0" }}>
            <Link
              href="#"
              variant="body2"
              onClick={authenticationService.forgotPassword}
            >
              Forgot password?
            </Link>
          </Grid>
        </Grid>

        <div>
          <Typography sx={{ fontSize: "small" }}>
            Don't have an account?
            <a
              style={{ color: "#1976d2" }}
              onClick={authenticationService.signup}
            >
              {" "}
              Sign Up
            </a>
          </Typography>
        </div>
      </Box>

      <Divider className="divider">OR</Divider>

      <GoogleLogin
        clientId="72753215683-bnrorqcik8r5n6caofm1p3e7mlk0lf5l.apps.googleusercontent.com"
        buttonText="Login with Google"
        // onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      {/* </Box>
    //   </Container>
    // </ThemeProvider>*/}
    </Paper>
  );
}
