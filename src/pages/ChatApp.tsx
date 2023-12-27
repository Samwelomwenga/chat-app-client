import { useContext } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SendRounded, BorderColorRounded } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

function ChatApp() {

  const user= useContext(AuthContext)?.postState.user;
  // const{name}=context&&context;


  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
        children: `${name?.split(' ')[0]?.[0]}${name.split(' ')[1] ? (name?.split(' ')[1]?.[0] ? name?.split(' ')[1]?.[0] : '') : ''}`.toUpperCase(),
    };
  }
  return (
    <Box sx={{height:"100vh", position:"relative"}}>
      <Stack direction={"row"} spacing={2} sx={{bgcolor:"greenyellow",p:"1.5rem",mb:"1.5rem"}}>
        <Avatar {...stringAvatar(user?.name||"Anonymous User")} />
        <Typography sx={{ textAlign: "center", fontWeight:"semi-bold", fontSize:"1.5rem" }}>{user?.name}</Typography>
      </Stack>
      <Stack sx={{px:".5rem"}}>
        <Card sx={{width:"75%",mb:"2rem",bgcolor:"red"}}>
            <CardContent>
                <Typography>Lorem ipsum dolor, sit amet consectng elit. Voluptas tenetur repellenduBeatae?</Typography>
            </CardContent>
        </Card>
        <Card sx={{width:"75%"}}>
            <CardContent>
                <Typography>Lorem ipsum dolor, sit amet consectng elit. Voluptas tenetur repellenduBeatae?</Typography>
            </CardContent>
        </Card>
      </Stack>
      <Stack direction={"row"} spacing={1} sx={{width:"100%",display:"flex", justifyContent:"center", mt:"1.5rem"}}>
        <BorderColorRounded />
        <Typography sx={{ fontStyle: "italic" }}>Killer is typing</Typography>
      </Stack>

      <TextField
      sx={{position:"absolute",bottom:".4rem"}}
      placeholder="Type Message..."
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                sx={{ fontWeight: "bold", pr: ".3rem", fontSize: "1.2rem" }}
              >
                Send
              </Typography>
              <SendRounded color="primary" fontSize="large" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default ChatApp;
