
import React from 'react'
import { Box, Typography } from '@mui/material';
import { makeStyles } from "tss-react/mui";
import Assets from '@components/common/image_container';
import TextLabel from '@components/common/commonTextLabel';

const useStyles = makeStyles()((theme) => {
    return {
        iconBorder: {
            borderRadius: "50px",
            padding: "5px 12px",
            backgroundColor: "#fff",
            border: `1px solid ${theme.palette.bgDefultLightSky.main}`,
            "&:hover": {
                backgroundColor: theme.palette.bgLightBlue2.main,
                border: `1px solid ${theme.palette.bgDefultLightSky.main}`,
                color: 'white'
            },
        },
        iconFilter: {
            filter: "brightness(0)",
            "&:hover": {
                color: 'white'
            },
        },
        textField: {
            color: theme.palette.bgBlack.main,
            "&:hover": {
                color: theme.palette.bgWhite.main,
            },
        }
    };
});

const label = { inputProps: { 'aria-label': 'Color switch demo' } };
const ClientDetailsLable = ({ itemStatus, img, image, text, onClick }: any) => {
    const { classes } = useStyles();


    return (
        <Box display={"flex"} gap={"8px"} alignItems={"center"} className={classes.iconBorder} onClick={onClick}>
            <Box display={"flex"} sx={{ cursor: itemStatus === 3 ? "defult" : "pointer" }}>
                <Assets src={img} absolutePath={true} className={classes.iconFilter} width={15} height={15} />
            </Box>
            <Typography variant='body2' fontSize={'12px'} style={{ cursor: itemStatus === 3 ? "defult" : "pointer" }}>{text}</Typography>
            {/* <TextLabel variant='body2' cursor={itemStatus === 3 ? "defult" : "pointer"} title={text} /> */}
        </Box>
    )
}

export default ClientDetailsLable



//  ===== OLD DESIGN =====
// import React from 'react'
// import { Box } from '@mui/material';
// import { makeStyles } from "tss-react/mui";
// import Assets from '@components/common/image_container';
// import TextLabel from '@components/common/commonTextLabel';

// const useStyles = makeStyles()((theme) => {
//     return {
//         iconBorder: {
//             border: "1px solid #E1E1E1",
//             borderRadius: "5px",
//             padding: "10px",
//         },
//         iconFilter: {

//             filter: "brightness(0)"
//         }
//     };
// });

// const label = { inputProps: { 'aria-label': 'Color switch demo' } };
// const ClientDetailsLable = ({ img, image, text, onClick }: any) => {
//     const { classes } = useStyles();


//     return (
//         <Box display={"flex"} gap={"12px"} alignItems={"center"}>
//             <Box display={"flex"} className={classes.iconBorder} >
//                 <Assets src={img} absolutePath={true} className={classes.iconFilter} />
//             </Box>
//             <TextLabel variant='body1' cursor="pointer" textDecoration="underline" onClick={onClick} title={text} />
//         </Box>
//     )
// }

// export default ClientDetailsLable


