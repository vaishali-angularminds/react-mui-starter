
import { useState, useEffect } from "react";
import {
 
  Box, 
  Button,
  Modal,
  Typography, 
  TextField,
} from "@mui/material";
import authAxios from "../../utils/http/api";
import CloseIcon from "@mui/icons-material/Close";
function ChangePassModal({openModal,setOpenModal}: any) {

  const [clickSave, setClicksave] = useState(false);
  const [password,setPassword] = useState({
    pass:'',
    newPass:'',
    confPass:'',
  })
  const [err,setErr] = useState({     
    pass:false,
    newPass:false,
    confPass:false,
  });

  // ************************ Check is valid password***********************
  const isValidPass = (pass:any,term:string) =>{ 

    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
   
   const temp =  pass.match(passPattern) !== null?true: false

    if(term === 'pass')
    {
      // err.pass=false
      setErr({...err,pass:temp})
    }
    if(term === 'newPass')
    {
      // err.newPass=false
      setErr({...err,newPass:temp})
    }
    if(term === 'confPass')
    {
      // err.confPass=false
      setErr({...err,confPass:temp})
    }   
   return err;

   
  }

// *************************** handle sunbmit ************************
const handleSubmit = async() => {
      let user = JSON.parse(localStorage.getItem("currentUser")  || '{}') 
      if(password.newPass !== password.confPass)
      {
        alert('new password and confirm password not match ') 
      }
      else{
        const data ={
          password:password.newPass,
          oldPassword:password.pass
        }
        console.log(data)
     const res = await authAxios.put(`http://localhost:8080/users/password/62a6f9ba8d739a7edae997e2`,data)
     console.log(res)
     setOpenModal(false)
      }
}
  return (
    <Modal
    open={openModal}
    id='changePassModal'
    onClose={()=>setOpenModal(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    aria-hidden="true"
  >
    <Box style={{ padding: 20, width: 400, margin: "150px auto",backgroundColor:'white'}}
                >
        <Typography style={{display :'flex',width:'400px'}}>
          <Typography sx={{fontSize:'20px', marginLeft:'90px'}}>Reset Your Password</Typography>
          
          <div style={{marginLeft:'70px'}}>
        <CloseIcon
        style={{
          padding:'10px',
          display: "flex",
          alignItems: "right",
          marginTop:'-10px',
                           
        }}
        onClick={() =>  setOpenModal((prev: any) => !prev)}
        />
        </div>
        
        </Typography> 
        <div style={{marginLeft:'20px'}}>
        <TextField 
          style={{width:'370px',marginTop: "20px"}}
          label="old password"   
          size="small"    
          placeholder="Enter old password"
          variant="outlined"
          value={password.pass}
          onChange={(e) => {setPassword({...password,pass:e.target.value});isValidPass(e.target.value,'pass')}}
          error = { clickSave &&  !(err.pass)?true:false}
          helperText={ clickSave &&  !(err.pass)? "old password is required" : ''}
          required
          id='1'
        />

      <TextField
          label="New Password"
          style={{ width: '370px' ,marginTop: "20px"}}
          variant="outlined"
          size="small"    
          placeholder="Enter new password"
          value={password.newPass}
          onChange={(e) => {setPassword({...password,newPass:e.target.value});isValidPass(e.target.value,'newPass')}}
          error = { clickSave && !(err.newPass)?true:false}
          helperText={ clickSave &&  !(err.newPass)? "new password is required" : ''}
          type="password"
          id='2'
        />  
        <TextField
          label="Confirm Password"
          style={{ width: '370px' ,marginTop: "20px"}}
          variant="outlined"
          size="small"    
          placeholder="Enter Confirm password"
          value={password.confPass}
          onChange={(e) => {setPassword({...password,confPass:e.target.value});isValidPass(e.target.value,'confPass')}}
          error = { clickSave &&  !(err.confPass)?true:false}
          helperText={ clickSave &&  !(err.confPass)? "confirm password is required" : ''}
          type="password"
          id='3' />
          <Button style={{width: '370px' ,marginTop: "20px"}} variant="contained" color="primary" onClick={() =>{setClicksave(true);handleSubmit()}}>Reset Password</Button>
         </div> 
    </Box>
</Modal>
  )
}

export default ChangePassModal