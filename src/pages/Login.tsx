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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const authContext = useContext(AuthContext);
  const postDispatch = authContext?.postDispatch;
  const postState = authContext?.postState;
  const loginInfo = authContext?.loginInfo;
  const loginInfoDispatch = authContext?.loginInfoDispatch;

  const error = postState?.error;

  const loginSchema = z.object({
    email: z
      .string()
      .email()
      .min(1, { message: "Email is required" })
      .min(3, { message: "Email must be at least 3 characters" })
      .max(20),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfoState>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginUser = async (data: LoginInfoState) => {
    postDispatch?.({ type: "POST_USER_INFO_REQUEST" });
    if (loginInfo) {
      try {
        const res = await postRequest<LoginInfoState, User>(
          `${baseUrl}/users/login`,
          data
        );
        console.log("res", res);
        if ("message" in res) {
          console.log("res.message", res.message);
          throw new Error(res.message);
        }
        postDispatch?.({ type: "POST_USER_INFO_SUCCESS", payload: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (e) {
        const error = e as Error;
        console.log("error", error);
        if (error.message === "Request failed with status code 400") {
          postDispatch?.({
            type: "POST_USER_INFO_FAIL",
            payload: { message: "Invalid Credentials", isError: true },
          });
        }
        postDispatch?.({
          type: "POST_USER_INFO_FAIL",
          payload: { message: error.message, isError: true },
        });
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
          sx={{
            pt: "5rem",
            pb: "1rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Login
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Enter your username and password to login to your account
        </Typography>
      </Stack>
      <Box display="flex" justifyContent="center">
        <Paper
          sx={{
            gap: 4,
            display: "grid",
            px: ".7rem",
            py: { xs: "1rem", md: "6rem" },
            width: { md: "45rem" },
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Sign In
          </Typography>
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(handleLoginUser)}
          >
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
              {...register("email")}
              onChange={(e) =>
                loginInfoDispatch?.({
                  type: "SET_EMAIL",
                  payload: e.target.value,
                })
              }
            />
            {errors.email && (
              <Typography sx={{ color: "red" }}>
                {errors.email.message}
              </Typography>
            )}
            <FormLabel sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Password
            </FormLabel>
            <TextField
              variant="outlined"
              type="password"
              fullWidth
              margin="dense"
              size="small"
              {...register("password")}
              onChange={(e) =>
                loginInfoDispatch?.({
                  type: "SET_PASSWORD",
                  payload: e.target.value,
                })
              }
            />
            {errors.password && (
              <Typography sx={{ color: "red" }}>
                {errors.password.message}
              </Typography>
            )}
            {error?.isError && (
              <Typography sx={{ color: "red",textAlign:"center",pt:"1rem" }}>{error.message}</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ my: "1rem" }}
            >
              Login
            </Button>
            <Link href="/register" sx={{ pl: { xs: "3rem", md: "10rem" } }}>
              Don`t have an account? Sign Up here
            </Link>
          </form>
        </Paper>
      </Box>
    </Stack>
  );
}

export default Login;
