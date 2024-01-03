import React from 'react'
//mui
import { makeStyles } from "tss-react/mui";
import { Box, } from '@mui/material';
//component
import PaperContainer from '@components/common/PaperContainer';
import MUIAlert from '@components/common/commonAlertBox';
const useStyles = makeStyles()((theme) => {
    return {
        titleForm: {
            fontSize: "16px",
            fontWeight: "600",
        },
    };
});
const Identity = () => {
    const { classes } = useStyles();

    return (
        <>
            <PaperContainer title={"Identity"}>
                <MUIAlert
                    icon={false}
                    variant="outlined"
                    description="Two-Factor Authentication (2FA) is a security measure that helps protect your Client Area against unauthorized access. To enable the 2FA, you need to have the mobile Authenticator app synchronized with your registration. Note that if you lose access to your authenticated device, resetting the 2-FA is only possible by doing a full KYC. Please refrain from giving access to anyone else but you." />
            </PaperContainer>
        </>
    )
}

export default Identity