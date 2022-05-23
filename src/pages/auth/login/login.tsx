import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import signup from '../signup/singup'
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Login() {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [data, setData] = useState({
   
    "email": "",
    "password": "" ,
  }) 

  const { handleSubmit } = useForm();
  const theme = createTheme();

  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    console.log(data)
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
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
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
              defaultValue="navanath@angularminds.com"
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
              defaultValue={data.password}
              type="password"
              id="password"
              onChange={(e) =>setData({...data, password: e.target.value})}
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"
                onClick={authenticationService.forgotPassword}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#"  variant="body2" onClick={authenticationService.signup}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
