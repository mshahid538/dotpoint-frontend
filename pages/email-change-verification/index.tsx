import React, { useEffect, useState } from 'react';
import { makeStyles } from "tss-react/mui";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Box, Grid, useTheme } from '@mui/material'
import Assets from "@components/common/image_container";
import TextLabel from '@components/common/commonTextLabel';
import ErrorHandler from '@components/common/errorHandler';
import { tostify } from '@components/common/tostify';
import usePageLoader from '@redux/hooks/usePageLoader';
import { change_email, resent_email_verification } from '@redux/Redux/Actions';

const useStyles = makeStyles()(() => {
    return {
        errorMessage: {
            color: 'red',
            fontSize: '12px',
            fontFamily: 'poppins'
        },
        checkboxErrorMsg: {
            marginTop: "-6px",
            marginBottom: "10px"
        }
    };
});


const EmailChangeVerification = () => {
    //Hooks
    const router = useRouter()
    const { token, email }: any = router.query
    const { classes } = useStyles();
    const dispatch = useDispatch()
    const setFullPageLoader = usePageLoader();
    const theme = useTheme();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (router.isReady) {
            _resendEmailVerification()
        }
    }, [router.isReady]);

    const _resendEmailVerification = async () => {
        try {
            let body: any = {
                token: token,
                email: email
            }

            setFullPageLoader(true);
            const response = await dispatch(change_email(body));
            const error = ErrorHandler(response);
            if (error) {
                setErrorMessage('Email Verified Successfully')
                setFullPageLoader(false);
            } else {
                setErrorMessage(response?.payload?.message)
                setFullPageLoader(false);
            }

        } catch (error: any) {
            setErrorMessage(error.message);
            // tostify(error.message, "error")
            setFullPageLoader(false);
        }
    }
    return (
        <Grid container spacing={0} height={'100vh'} >
            <Grid xs={12} sm={12} md={12} lg={7} sx={{ backgroundColor: "#002734", alignItems: 'center', position: 'relative' }} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex' }}>
                <Box sx={{ backgroundColor: "#002734", zIndex: "1", padding: "6px", position: "relative", left: "10%" }} display={'flex'} gap={1} flexDirection={'column'}>
                    <Assets src={"/assets/images/main-logo.png"} absolutePath={true} height={75} width={250}/>
                    <TextLabel variant="h1" style={{ marginLeft: "6px" }} color="#fff" title={"Dare."} />
                    <TextLabel variant="h1" style={{ marginLeft: "6px" }} color="#fff" title={"Optimise."} />
                    <TextLabel variant="h1" style={{ marginLeft: "6px" }} color={theme.palette.bgDefultGreen.main} title={"Thrive."} />
                </Box>
                <Assets src={"/assets/images/login_vactor.png"} absolutePath={true} style={{ position: 'absolute', bottom: '0px', left: '0px' }} />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={5} sx={{ height: '100vh', display: "flex", justifyContent: "center", alignItems: "center", overflow: 'auto', background: "#FFFFFF" }}>
                <Box sx={{ width: { lg: '70%', md: '60%', sm: '70%', xs: "90%" }, height: "100%", marginTop: "10%" }} >
                    <Grid item container>
                        <Grid item xs={12} marginTop={20}>
                            <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={2}>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1}>
                                    <Assets src={"/assets/images/main-logo.png"} absolutePath={true} height={75} width={250}/>
                                </Box>
                                <TextLabel textAlign='center' fontWeight='500' variant='h5' title={"Email verification"} />
                                <TextLabel textAlign='center' variant='subtitle2' title={errorMessage} />
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1} marginTop={1} marginBottom={1.5}>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>
        </Grid >
    )
}

export default EmailChangeVerification