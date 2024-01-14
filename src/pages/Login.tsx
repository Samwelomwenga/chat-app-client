import {
  Button,
  TextField,
  Typography,
  Paper,
  FormLabel,
  Stack,
  Link,
  Box,
} from "@mui/material";
import { useContext } from "react";
import {
  AuthContext,
  LoginInfoState,
  UserPayload as User,
} from "../context/AuthContext";
import { baseUrl, postRequest } from "../utils/services";
import axios from "axios";
import { AxiosError } from "../components/PotentialChats";

function Login() {
  const authContext = useContext(AuthContext);
  const postState = authContext?.postState;
  const error = postState?.error;
  const postDispatch = authContext?.postDispatch;
  const loginInfo = authContext?.loginInfo;
  const loginInfoDispatch = authContext?.loginInfoDispatch;

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postDispatch?.({ type: "POST_USER_INFO_REQUEST" });
    if (loginInfo) {
      try {
        const res = await postRequest<LoginInfoState, User>(
          `${baseUrl}/users/login`,
          loginInfo
        );
        postDispatch?.({ type: "POST_USER_INFO_SUCCESS", payload: res });
        localStorage.setItem("user", JSON.stringify(res));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          const message = axiosError.response?.data.message;
          postDispatch?.({
            type: "POST_USER_INFO_FAIL",
            payload: { message:message||"", isError: true },
          });
        }
      }
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
          sx={{ pt: "5rem",pb:"1rem", fontWeight: "bold", textAlign: "center" }}
        >
          Login
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Enter your username and password to login to your account
        </Typography>
      </Stack>
      <Box display="flex" justifyContent="center">

      <Paper sx={{ gap: 4, display: "grid", px: ".7rem", py: {xs:"1rem",md:"6rem"},width:{md:"50%"},marginLeft:"auto",marginRight:"auto" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Sign In
        </Typography>
        <form autoComplete="off" noValidate onSubmit={handleLoginUser}>
          <FormLabel sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Email
          </FormLabel>
          <TextField
            value={loginInfo?.email}
            variant="outlined"
            type="email"
            fullWidth
            margin="dense"
            size="small"
            placeholder="johndoe@gmail.com"
            onChange={(e) =>
              loginInfoDispatch?.({
                type: "SET_EMAIL",
                payload: e.target.value,
              })
            }
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
            onChange={(e) =>
              loginInfoDispatch?.({
                type: "SET_PASSWORD",
                payload: e.target.value,
              })
            }
          />
          {error?.isError && <Typography>{error.isError}</Typography>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ my: "1rem" }}
          >
            Login
          </Button>
        <Link href="/register" sx={{pl:{xs:"3rem",md:"10rem"}}}>Don`t have an account? Sign Up here</Link>

        </form>
      </Paper>
      </Box>
    </Stack>
  );
}

export default Login;
