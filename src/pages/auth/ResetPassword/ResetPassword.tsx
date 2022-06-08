import React, { useState ,useEffect } from "react";
import { useForm } from "react-hook-form";
import './ResetPassword.scss'
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
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel"

export default function ResetPassword() {

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


  const [newPass,setNewPass] = useState('');
  const [confPass,setConfPass] = useState('');
  const [token,setToken] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { handleSubmit } = useForm();
  const theme = createTheme();

  
  const handleBack = ()=>{
    history.push(paths.login);
  window.location.reload();
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const openInNewTab = () => {
    handleOpenModal();
    window.open('https://ethereal.email/messages', '_blank');

  };

  useEffect(()=>{
    openInNewTab()
  },[])


  const handleResetPass = () =>{

 const data ={
   password:newPass
 }
//  authenticationService.setPassword(data,token).then((response: any) => {
// console.log(response)
// })
console.log(data,token)
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
            Reset your password
          </Typography>

         
          <TextField
                  label="New Password"
                  style={{marginTop: "20px"}}
                  fullWidth
                  variant="outlined"
                  size="small"    
                  placeholder="Enter new password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                //   error = { clickSave && !(err.newPass)?true:false}
                //   helperText={ clickSave &&  !(err.newPass)? "new password is required" : ''}
                  type="password"
                  id='2'
                />  
                <TextField
                  label="Confirm New Password"
                  style={{marginTop: "20px"}}
                  fullWidth
                  variant="outlined"
                  size="small"    
                  placeholder="Enter Confirm password"
                  value={confPass}
                  onChange={(e) => setConfPass(e.target.value)}
                //   error = { clickSave &&  !(err.confPass)?true:false}
                //   helperText={ clickSave &&  !(err.confPass)? "confirm password is required" : ''}
                  type="password"
                  id='3' />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          onClick={()=>{handleResetPass()}}
          >
            Reset password
          </Button>
          <Button variant="text" id='backbtn' onClick={()=>handleBack()}>Back</Button>
        </Box>
      </Container>

{/* *********************** Getting token for reset password************************ */}
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
            onChange={(e) => setToken(e.target.value)}
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
            //   authenticationService.verifyEmail(emailVerifyToken);
              handleCloseModal();
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>


    </Paper>
  );
}
