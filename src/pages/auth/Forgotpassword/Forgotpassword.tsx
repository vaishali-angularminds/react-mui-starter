import React, { useState } from "react";
import { useForm } from "react-hook-form";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Forgotpassword() {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit } = useForm();
  const theme = createTheme();

  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    setButtonDisabled(true);
    authenticationService
      .verifyCredentials(formData)
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
           forgot password
          </Typography>
          
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}
