import { Button, TextField, Typography, Paper, FormLabel, Link, Stack } from "@mui/material";
import {Google as GoogleIcon,Facebook} from '@mui/icons-material';

function Login() {
  return (
    <Stack spacing={2} sx={{display:"grid",justifyContent:"center", gap:"1rem",width:"100%",px:".6rem"}}> 
    <Stack>
      <Typography variant="h4" sx={{py:"1rem", fontWeight:"bold", textAlign:"center"}}>Login</Typography>
      <Typography variant="body1" sx={{textAlign:"center"}}>
        Enter your username and password to login to your account
      </Typography>
      </Stack>
      <Paper sx={{gap:4, display:"grid", px:".7rem", py:"1rem"}}>
        <Typography sx={{ fontWeight: "bold",fontSize:"1.5rem"  }}>Sign In</Typography>
        <form autoComplete="off" noValidate>
          <FormLabel sx={{ fontWeight: "bold",fontSize:"1rem"  }}>Username</FormLabel>
          <TextField variant="outlined" fullWidth  margin="dense" size="small" placeholder="John Doe"/>
          <FormLabel sx={{ fontWeight: "bold",fontSize:"1rem" }}>Email</FormLabel>
          <TextField variant="outlined" type="email" fullWidth  margin="dense" size="small" placeholder="johndoe@gmail.com"/>
          <FormLabel   sx={{ fontWeight: "bold",fontSize:"1rem" }}>Password</FormLabel>
          <TextField variant="outlined" type="password" fullWidth margin="dense" size="small"/>
        <Button variant="contained" fullWidth sx={{my:"1rem"}}>Login</Button>
        <Button variant="outlined" fullWidth startIcon={<GoogleIcon/>}>  Login with Google</Button>
        <Button variant="outlined" fullWidth startIcon={<Facebook/> } sx={{my:"1rem"}}>Login with Facebook </Button>
        <Link sx={{pl:"5rem"}}> Forgot Your Password?</Link>
        </form>

      </Paper>
    </Stack>
  )
}

export default Login