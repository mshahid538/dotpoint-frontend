import React from 'react'
import { makeStyles } from "tss-react/mui";
import { Box, Container, Typography } from '@mui/material';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';

//this is not nessesary for yet

const useStyles = makeStyles()(() => {
    return {
        alertbox: {
            color: "#262729",
            backgroundColor: "#ffc70026",
            border: "3px solid #ffc700",
            fontWeight: "600",
            textAlign: "center",
            padding: "1.875rem"
        },
        alerticon:{
            backgroundColor:"#ffc700",
            color:"white",
            backgroundSize:"59%",
            backgroundPosition:"center",
            borderRadius:"5px",
            width:"60px",
            height:"60px"
        }
    };
});

function Ftmotraders() {
    const { classes } = useStyles();
    return (
        <>
            <Container>
                <Box>
                    <Typography className={classes.alertbox}>
                        <AnnouncementOutlinedIcon className={classes.alerticon}/>
                        <Typography >Sorry, this page is accessible only to Dot Point Traders.</Typography>
                    </Typography>
                </Box>
            </Container>
        </>
    )
}

export default Ftmotraders
