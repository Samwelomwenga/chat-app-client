import { Avatar, Box, Typography } from "@mui/material"
import { StyledBadge } from "./UserChat"
import stringAvatar from "../utils/functions/stringAvatar"
import { PotentialUser } from "../hooks/useFetchPotentialChatUsers"

function PotentialUser({potentialUser}: {potentialUser: PotentialUser}) {
  return (
    <Box sx={{display:"flex",gap:"1rem"}}>
        <StyledBadge>
        <Avatar
          {...stringAvatar(potentialUser.name || "Anonyms")}
        />
        </StyledBadge>
        <Typography>{potentialUser.name}</Typography>
    </Box>
  )
}

export default PotentialUser