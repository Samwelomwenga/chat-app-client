import {  Box, Typography } from "@mui/material"

import { PotentialUser } from "../hooks/useFetchPotentialChatUsers"

function PotentialUser({potentialUser}: {potentialUser: PotentialUser}) {
  return (
    <Box sx={{display:"flex",gap:"1rem"}}>
       
        <Typography>{potentialUser.name}</Typography>
    </Box>
  )
}

export default PotentialUser