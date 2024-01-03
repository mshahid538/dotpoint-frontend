import * as React from 'react';
//mui
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from "tss-react/mui";
import { Divider, Accordion, Box, AccordionSummary, AccordionDetails } from '@mui/material';
//component
import MUIAlert from '@components/common/commonAlertBox';
import MUIButton from '@components/common/commonButton';
import PaperContainer from '@components/common/PaperContainer';
import TextLabel from '@components/common/commonTextLabel';

const useStyles = makeStyles()((theme) => {
    return {
        noBoxShadowAccordion: {
            boxShadow: "none",
            border: "1px solid #EEEEEE",
        },
        signinTwofactorBox: {
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "center",
            padding: "24px 0",
            flexWrap:"wrap",
            [theme.breakpoints.down('md')]: {
                gap: '10px',
              }
        }
    }
});
const Security = () => {
    const { classes } = useStyles();
    return (
        <>
            <PaperContainer title={"Security"}>
                <Accordion className={classes.noBoxShadowAccordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <TextLabel variant="subtitle2" fontWeight={"600"} title={"Two-Factor Authentication"} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <MUIAlert icon={false} variant="outlined" severity="info" description="Two-Factor Authentication (2FA) is a security measure that helps protect your Client Area against unauthorized access. To enable the 2FA, you need to have the mobile Authenticator app synchronized with your registration. Note that if you lose access to your authenticated device, resetting the 2-FA is only possible by doing a full KYC. Please refrain from giving access to anyone else but you." />
                        <Box className={classes.signinTwofactorBox}>
                            <TextLabel variant="subtitle2" fontWeight={"500"} title={"Sign in with Two-Factor Authentication"} />
                            <MUIButton
                                fullWidth={true}
                                height="42px"
                                width="160px"
                                text="Activate"
                            />
                        </Box>
                        <Divider />
                        <TextLabel variant="subtitle2" marginTop="24px" marginBottom="12px" fontWeight={"600"} title={"Authenticator devices"} />
                        <MUIAlert icon={false} variant="outlined" description="You haven't added any authenticator device" />
                    </AccordionDetails>
                </Accordion>
            </PaperContainer>
        </>
    )
}

export default Security