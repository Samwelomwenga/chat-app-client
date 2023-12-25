import { useContext } from "react";
import { Button, TextField, Typography, Paper, FormLabel, Link, Stack } from "@mui/material";
import {Google as GoogleIcon,Facebook} from '@mui/icons-material';
import { AuthContext } from "../context/AuthContext";
import { baseUrl, registerUser } from "../utils/services";
function Register() {

   const context= useContext(AuthContext)
   const userInfo=context?.userInfo;
   const userInfoDispatch=context?.userInfoDispatch;
    // console.log(state)
    const handleRegisterUser=async ()=>{
      if (userInfo) {
        const res= await registerUser(`${baseUrl}/users/register`,userInfo)
        res.error&&
        
      }
    }

  return (
    <Stack spacing={2} sx={{display:"grid",justifyContent:"center", gap:"1rem",width:"100%",px:".6rem"}}> 
    <Stack>
      <Typography variant="h4" sx={{py:"1rem", fontWeight:"bold",textAlign:"center"}}>Sign Up</Typography>
      <Typography variant="body1"  sx={{textAlign:"center"}}>
        Create an account to get started
      </Typography>
      </Stack>
      <Paper sx={{gap:4, display:"grid", px:".7rem", py:"1rem"}}>
        <Typography sx={{ fontWeight: "bold",fontSize:"1.5rem"  }}>Create Account</Typography>
        <form autoComplete="off" noValidate>
          <FormLabel sx={{ fontWeight: "bold",fontSize:"1rem"  }}>Username</FormLabel>
          <TextField variant="outlined" fullWidth  margin="dense" size="small" placeholder="John Doe" onChange={(e)=>{
            userInfoDispatch?.({type:"SET_NAME",payload:e.target.value})
          }}/>
          <FormLabel sx={{ fontWeight: "bold",fontSize:"1rem" }}>Email</FormLabel>
          <TextField variant="outlined" type="email" fullWidth  margin="dense" size="small" placeholder="johndoe@gmail.com" onChange={(e)=>{
            userInfoDispatch?.({type:"SET_EMAIL",payload:e.target.value})
          }}/>
          <FormLabel   sx={{ fontWeight: "bold",fontSize:"1rem" }}>Password</FormLabel>
          <TextField variant="outlined" type="password" fullWidth margin="dense" size="small"/>
          <FormLabel   sx={{ fontWeight: "bold",fontSize:"1rem" }}>Confirm Password</FormLabel>
          <TextField variant="outlined" type="password" fullWidth margin="dense" size="small" onChange={(e)=>{
            userInfoDispatch?.({type:"SET_PASSWORD",payload:e.target.value})
          }}/>
        <Button variant="contained" fullWidth sx={{my:"1rem"}}>Sign Up</Button>
        <Button variant="outlined" fullWidth startIcon={<GoogleIcon/>}>  Sign Up with Google</Button>
        <Button variant="outlined" fullWidth startIcon={<Facebook/> } sx={{my:"1rem"}}>Sign Up with Facebook </Button>
        <Link sx={{pl:"3rem"}}>Already have an account? Login here</Link>
        </form>

      </Paper>
    </Stack>
  )
}
export default Register
