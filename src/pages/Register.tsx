import { useContext } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const context = useContext(AuthContext);
  const userInfo = context?.userInfo;
  const userInfoDispatch = context?.userInfoDispatch;
  const postDispatch = context?.postDispatch;
  const error = context?.postState.error;

  const registerSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" })
      .max(30)
      .refine((value) => value.trim().split(/\s+/).length == 2, {
        message: "Name must include first and last name",
      }),
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
  } = useForm<RegisterInfoState>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegisterUser = async (data: RegisterInfoState) => {
    postDispatch?.({ type: "POST_USER_INFO_REQUEST" });
    try {
      if (userInfo) {
        const res = await postRequest<RegisterInfoState, UserPayload>(
          `${baseUrl}/users/register`,
          data
        );
        console.log("res", res);
        if ("message" in res) {
          throw new Error(res.message);
        }

        postDispatch?.({ type: "POST_USER_INFO_SUCCESS", payload: res.data });
        localStorage.setItem("user", JSON.stringify(res));
      }
    } catch (e) {
      const error = e as Error
      console.log("error", error);
      if (error.message) {
        postDispatch?.({ type: "POST_USER_INFO_FAIL", payload:{message:"User Already Exists",isError:true} });
        
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
              md: "40rem",
            },
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Create Account
          </Typography>
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(handleRegisterUser)}
          >
            <FormLabel sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Username
            </FormLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              placeholder="John Doe"
              {...register("name")}
              onChange={(e) => {
                userInfoDispatch?.({
                  type: "SET_NAME",
                  payload: e.target.value,
                });
              }}
            />
            {errors.name && (
              <Typography sx={{ color: "red" }}>
                {errors.name.message}
              </Typography>
            )}
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
              {...register("email")}
              onChange={(e) => {
                userInfoDispatch?.({
                  type: "SET_EMAIL",
                  payload: e.target.value,
                });
              }}
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
              onChange={(e) => {
                userInfoDispatch?.({
                  type: "SET_PASSWORD",
                  payload: e.target.value,
                });
              }}
            />
            {errors.password && (
              <Typography sx={{ color: "red" }}>
                {errors.password.message}
              </Typography>
            )}
            {error?.isError&&<Typography sx={{ color: "red",textAlign:"center",pt:"1rem" }}>{error.message}</Typography>}
            <Button
              variant="contained"
              fullWidth
              sx={{ my: "1rem" }}
              type="submit"
            >
              Sign Up
            </Button>

            <Link href="/login" sx={{ pl: { xs: "3rem", md: "10rem" } }}>
              Already have an account? Login here
            </Link>
          </form>
        </Paper>
      </Box>
    </Stack>
  );
}
export default Register;
