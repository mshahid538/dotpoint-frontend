import React from 'react'
import {Box} from "@mui/material";
const MuiIconWrapper = ({ icon, sx }: any) => {
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            width={40}
            height={40}
            borderRadius={2}
            sx={sx}
        >
            {icon}
        </Box>
    )
}
export default MuiIconWrapper