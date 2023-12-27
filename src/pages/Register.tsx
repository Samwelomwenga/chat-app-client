import React, { useContext,useState } from "react";
import { Button, TextField, Typography, Paper, FormLabel, Link, Stack } from "@mui/material";
import {Google as GoogleIcon,Facebook} from '@mui/icons-material';
import { AuthContext } from "../context/AuthContext";
import { baseUrl, registerUser } from "../utils/services";

type ResponseType = { message: string } | { token: string, id: string, name: string, email: string };

function Register() {

   const context= useContext(AuthContext)
   const userInfo=context?.userInfo;
   const userInfoDispatch=context?.userInfoDispatch;
   const postState=context?.postState;
   const postDispatch=context?.postDispatch;
    console.log("POSTSTATEUSER", postState)
    const [response, setResponse] = useState<ResponseType|null>(null)
    response&&console.log("response",response)



    const handleRegisterUser=async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      console.log("clicked")
      postDispatch?.({type: "POST_USER_INFO_REQUEST"});
      if (userInfo) {
        const res= await registerUser(`${baseUrl}/users/register`,userInfo)
        if (res.error) {
          setResponse(res);
          postDispatch?.({type: "POST_USER_INFO_FAIL", payload: res.error});
        }
        localStorage.setItem("user",JSON.stringify(res))
        postDispatch?.({type: "POST_USER_INFO_SUCCESS", payload: res});

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
        <form autoComplete="off" noValidate onSubmit={handleRegisterUser}>
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
        <Button variant="contained" fullWidth sx={{my:"1rem"}} type="submit">Sign Up</Button>
        <Button variant="outlined" fullWidth startIcon={<GoogleIcon/>} href="#">  Sign Up with Google</Button>
        <Button variant="outlined" fullWidth startIcon={<Facebook/> } sx={{my:"1rem"}} href="#">Sign Up with Facebook </Button>
        <Link sx={{pl:"3rem"}}>Already have an account? Login here</Link>
        </form>
        <Typography>{ response&& "message" in response? response?.message:''}</Typography>

      </Paper>
    </Stack>
  )
}
export default Register
