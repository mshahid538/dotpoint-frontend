import { Box, InputLabel, useTheme } from '@mui/material'
import React from 'react'

const TextWithLabelInfo = ({ label, tooltip, textSize, labelColor, backgroundColor, fontWeight, value, color, }: any) => {
    const theme = useTheme()
    return (
        <>
            {label && (
                <>
                    <Box
                        mb={0.5}
                        display="flex"
                        fontSize="12px"
                        flexDirection={"row"}
                    >
                        <InputLabel
                            sx={{
                                marginRight: "2px",
                                fontWeight: fontWeight || "600",
                                fontSize: { md: textSize || "14px", sm: "12px", xs: "12px" },
                                color: labelColor || "#333333",
                                backgroundColor: backgroundColor,
                                fontFamily: "poppins",
                                border: 'none'
                            }}
                        >
                            {label}
                        </InputLabel>
                        {tooltip}
                    </Box>
                    <InputLabel
                        sx={{
                            marginRight: "2px",
                            fontWeight: fontWeight || "400",
                            fontSize: { md: "16px", sm: "16px", xs: "16px" },
                            color: color || theme.palette.bgBlack.main,
                            backgroundColor: backgroundColor,
                            fontFamily: "poppins",
                            border: 'none'
                        }}
                    >
                        {value}
                    </InputLabel>
                </>
            )}
        </>


    )
}

export default TextWithLabelInfo