import {
  Button,
  TextField,
  Typography,
  Paper,
  FormLabel,
  Link,
  Stack,
} from "@mui/material";
import { Google as GoogleIcon, Facebook } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { baseUrl, postRequest } from "../utils/services";

function Login() {
  const context = useContext(AuthContext);
  const postDispatch = context?.postDispatch;
  const loginInfo = context?.loginInfo;
  const loginInfoDispatch = context?.loginInfoDispatch;

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked")
    postDispatch?.({ type: "POST_USER_INFO_REQUEST" });
    if (loginInfo) {
      const res = await postRequest(`${baseUrl}/users/login`, loginInfo);
      if (res.error) {
        postDispatch?.({ type: "POST_USER_INFO_FAIL", payload: res.error });
      }
      postDispatch?.({ type: "POST_USER_INFO_SUCCESS", payload: res });
      localStorage.setItem("user", JSON.stringify(res));
    }
  };
  return (
    <Stack
      spacing={2}
      sx={{
        display: "grid",
        justifyContent: "center",
        gap: "1rem",
        width: "100%",
        px: ".6rem",
      }}
    >
      <Stack>
        <Typography
          variant="h4"
          sx={{ py: "1rem", fontWeight: "bold", textAlign: "center" }}
        >
          Login
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Enter your username and password to login to your account
        </Typography>
      </Stack>
      <Paper sx={{ gap: 4, display: "grid", px: ".7rem", py: "1rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Sign In
        </Typography>
        <form autoComplete="off" noValidate onSubmit={handleLoginUser}>
          <FormLabel sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Email
          </FormLabel>
          <TextField
            variant="outlined"
            type="email"
            fullWidth
            margin="dense"
            size="small"
            placeholder="johndoe@gmail.com"
            onChange={(e) =>loginInfoDispatch?.({type:"SET_EMAIL",payload:e.target.value})}
          />
          <FormLabel sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Password
          </FormLabel>
          <TextField
            variant="outlined"
            type="password"
            fullWidth
            margin="dense"
            size="small"
            onChange={(e) =>loginInfoDispatch?.({type:"SET_PASSWORD",payload:e.target.value})}
          />
          <Button  type="submit" variant="contained" fullWidth sx={{ my: "1rem" }}>
            Login
          </Button>
          <Button variant="outlined" fullWidth startIcon={<GoogleIcon />}>
            {" "}
            Login with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Facebook />}
            sx={{ my: "1rem" }}
          >
            Login with Facebook{" "}
          </Button>
          <Link sx={{ pl: "5rem" }}> Forgot Your Password?</Link>
        </form>
      </Paper>
    </Stack>
  );
}

export default Login;
