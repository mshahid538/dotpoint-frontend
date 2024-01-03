import React from 'react'
import { Box, Divider, Typography, } from "@mui/material";
import MUIButton from './commonButton';
const LayoutHeader = ({ type, onClick, padding }: any) => {
    return (
        <>
            <Box padding={padding || '0px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'}>
                {type && <Typography fontSize={'16px'} fontWeight={600} lineHeight={'24px'}>{type}</Typography>}
                {onClick && <MUIButton
                    fullWidth={true}
                    height="40px"
                    width="153px"
                    text={`Add ${type}`}
                    onClick={onClick}
                />}
            </Box>
            <Divider sx={{ marginTop: 1 }} />
        </>
    )
}
export default LayoutHeader;