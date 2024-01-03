import React from 'react'
import { Box } from '@mui/material';
import TextLabel from '@components/common/commonTextLabel';

const ClientResult = ({ heading, subheading, fontColor, minWidth }: any) => {
    return (
        <Box minWidth={minWidth || "auto"} display={"flex"} alignItems={"center"} gap={"3px"} >
            <TextLabel fontColor={"#A2ACBD"} variant={"body1"} title={heading} />
            <TextLabel fontColor={fontColor || '#333'} variant={"body1"} ariant={"body1"} title={subheading} />
        </Box>
    )
}

export default ClientResult