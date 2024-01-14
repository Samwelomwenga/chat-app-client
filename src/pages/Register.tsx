import React, { useContext } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  FormLabel,
  Link,
  Stack,
  Box,
} from "@mui/material";
import {
  AuthContext,
  RegisterInfoState,
  UserPayload,
} from "../context/AuthContext";
import { baseUrl, postRequest } from "../utils/services";
import axios from "axios";
import { AxiosError } from "../components/PotentialChats";

function Register() {
  const context = useContext(AuthContext);
  const userInfo = context?.userInfo;
  const userInfoDispatch = context?.userInfoDispatch;
  const postState = context?.postState;
  const postDispatch = context?.postDispatch;

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postDispatch?.({ type: "POST_USER_INFO_REQUEST" });
    try {
      if (userInfo) {
        const res = await postRequest<RegisterInfoState, UserPayload>(
          `${baseUrl}/users/register`,
          userInfo
        );

        postDispatch?.({ type: "POST_USER_INFO_SUCCESS", payload: res });
        localStorage.setItem("user", JSON.stringify(res));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const message = axiosError.response?.data.message;
        postDispatch?.({
          type: "POST_USER_INFO_FAIL",
          payload: { message: message || "", isError: true },
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
            pt: { xs: "1rem", md: "10rem" },
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Sign Up
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Create an account to get started
        </Typography>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            gap: 4,
            display: "grid",
            px: { xs: ".7rem", md: "2rem" },
            py: { xs: "1rem", md: "5rem" },
            width: {
              md: "50%",
            },
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Create Account
          </Typography>
          <form autoComplete="off" noValidate onSubmit={handleRegisterUser}>
            <FormLabel sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Username
            </FormLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              placeholder="John Doe"
              onChange={(e) => {
                userInfoDispatch?.({
                  type: "SET_NAME",
                  payload: e.target.value,
                });
              }}
            />
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
              onChange={(e) => {
                userInfoDispatch?.({
                  type: "SET_EMAIL",
                  payload: e.target.value,
                });
              }}
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
              onChange={(e) => {
                userInfoDispatch?.({
                  type: "SET_PASSWORD",
                  payload: e.target.value,
                });
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ my: "1rem" }}
              type="submit"
            >
              Sign Up
            </Button>
            {postState?.error?.isError && (
              <Typography>
                {postState?.error?.message && postState.error.message}
              </Typography>
            )}
            <Link href="/login" sx={{ pl: { xs: "3rem", md: "20rem" } }}>
              Already have an account? Login here
            </Link>
          </form>
        </Paper>
      </Box>
    </Stack>
  );
}
export default Register;
