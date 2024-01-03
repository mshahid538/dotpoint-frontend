import React, { useEffect, useState } from 'react';
import { makeStyles } from "tss-react/mui";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Box, Grid, Typography, useTheme } from '@mui/material'
import ErrorHandler from '@components/common/errorHandler';
import { tostify } from '@components/common/tostify';
import usePageLoader from '@redux/hooks/usePageLoader';
import { email_verification, resent_email_verification } from '@redux/Redux/Actions';
import { LOGIN_TOKEN, REFRESH_LOGIN_TOKEN } from '@redux/Api/AuthApi';
import { setToken } from '@redux/Api/ClientHelper';
import Assets from '@components/common/image_container';
import TextLabel from '@components/common/commonTextLabel';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MUIButton from '@components/common/commonButton';

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

const Verification = () => {
    //Hooks
    const router = useRouter()
    const { token, email } = router.query
    const { classes } = useStyles();
    const dispatch = useDispatch()
    const setFullPageLoader = usePageLoader();
    const theme = useTheme()
    console.log(email, "email")
    //State
    const [isVerified, setIsVerified] = React.useState(true);

    const _checkEmailVerification = async () => {
        try {
            let body: any = {
                token: token
            }
            setFullPageLoader(true);
            const response = await dispatch(email_verification(body));
            const error = ErrorHandler(response)
            if (error) {
                tostify(response?.payload?.message, "success")
                localStorage.setItem('userData', JSON.stringify(response?.payload?.data))
                localStorage.setItem(LOGIN_TOKEN, response?.payload?.data?.token)
                localStorage.setItem(REFRESH_LOGIN_TOKEN, response?.payload?.data?.refresh_token)
                localStorage.setItem('isEmailVerified', 'true')
                setToken(response?.payload?.data?.token)
                setFullPageLoader(false);
                router.push('/client-area')
            } else {
                setIsVerified(false)
                setFullPageLoader(false);
            }

        } catch (error: any) {
            tostify(error.message, "error")
            setFullPageLoader(false);
        }
    }

    const _resendEmailVerification = async () => {
        try {
            let body: any = {
                token: token
            }
            setFullPageLoader(true);
            const response = await dispatch(resent_email_verification(body));
            const error = ErrorHandler(response)
            if (error) {
                tostify(response?.payload?.message, "success")
                setFullPageLoader(false);
                router.push({
                    pathname: '/emailVerification',
                    query: { token: token, email: email }
                })
                localStorage.setItem('isEmailVerified', 'false')
            } else {
                setFullPageLoader(false);
            }

        } catch (error: any) {
            tostify(error.message, "error")
            setFullPageLoader(false);
        }
    }

    React.useEffect(() => {
        const isEmailVerified: any = localStorage.getItem('isEmailVerified')
        if (router.isReady && isEmailVerified !== 'true') {
            _checkEmailVerification()
        } else {
            localStorage.setItem('isEmailVerified', 'false')
        }
    }, [router.isReady])
    return (
        !isVerified && <Grid container spacing={0} style={{ minHeight: '100vh' }}>
            <Grid xs={12} sm={12} md={12} lg={12}>
                <Box display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    gap={2}
                    style={{ minHeight: '100%', maxWidth: '500px', margin: 'auto' }}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1}>
                        <MailOutlineIcon style={{ fontSize: '5rem' }} color='error' />
                    </Box>
                    <TextLabel textAlign='center' color={theme.palette.error.main} fontWeight='500' variant='h5' title={"Email verification link expired"} />
                    <TextLabel textAlign='center' color={theme.palette.bgWhite.main} variant='subtitle2' title={`Looks like the verification link has expired. Not to worry,we can send the link again`} />
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1} marginTop={1} marginBottom={1.5}>
                        <MUIButton
                            backgroundColor={theme.palette.bgdefultBlue.main}
                            hoverBgColor={theme.palette.bgdefultBlue.main}
                            fullWidth={true}
                            height="44px"
                            width={'380px'}
                            text={<Typography variant='body2' fontSize={'12px'} p={2}>Resend verification link</Typography>}
                            fontWeight="600"
                            onClick={() => _resendEmailVerification()}
                            borderRadius={'2px'}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Verification