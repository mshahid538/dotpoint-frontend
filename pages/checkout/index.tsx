import React, { ReactNode } from 'react';
import { makeStyles } from "tss-react/mui";
import BreadcrumbLayout from '@components/common/Layout/breadcrumbLayout';
import { Box, Paper, Typography } from '@mui/material';
import Assets from '@components/common/image_container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { lightTheme } from "@redux/theme";

const useStyles = makeStyles()(() => {
    return {
        typographyTitle: {
            fontWeight: 600,
            fontSize: 27,
            lineHeight: 2
        },
        typographyBody: {
            fontSize: 15,
            lineHeight: 2,
            textAlign: 'center',
        },
        typographyText: {
            borderBottom: "1px solid #dfdfdf",
            fontSize: "14px",
            lineHeight: 3.8,
            width: "50%",
            paddingLeft: "20px",
        },
        typographyText2: {
            backgroundColor: "#EEEEEE",
            borderBottom: "1px solid #dfdfdf",
            fontSize: "14px",
            lineHeight: 3.8,
            textAlign: "end",
            paddingRight: "20px",
            width: "50%"
        },
        box1: {
            display: "flex",
            width: "100%",
        },
        toBePaidMain: {
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            backgroundColor: lightTheme.palette.bgdefultBlue.main
        },
        toBePaidTypography: {
            fontSize: "14px",
            lineHeight: "50px",
            paddingLeft: "22px",
            color: lightTheme.palette.bgWhite.main,
            fontWeight: "600",
        },
        toBePaidTypography2: {
            fontSize: "14px",
            lineHeight: "50px",
            paddingRight: "22px",
            textAlign: "end",
            color: lightTheme.palette.bgWhite.main,
            fontWeight: "600",
        },
        paymentText: {
            fontWeight: 600,
            fontSize: 22,
            lineHeight: 2,
            marginBottom: 24
        },
        poweredBy: {
            fontSize: "18px",
        },
        poweredBy2: {
            fontSize: "18px",
            fontWeight: "700",
            paddingLeft: 4
        }

    };
});

interface Breadcrumb {
    label: ReactNode;
    path: string;
}
interface ProfileProps {
    children: ReactNode;
    breadcrumb: Breadcrumb[];
    breadcrumbTitle: string;
    description?: string;
}

const Traders: React.FC<ProfileProps> = () => {
    const { classes } = useStyles();

    const breadcrumbsData: Breadcrumb[] = [
        {
            label: "Trader",
            path: '/',
        },
        {
            label: 'Client Area',
            path: '/',
        },
        {
            label: 'Start Dot Point Challenge',
            path: '/',
        },
        {
            label: 'Order',
            path: '#',
        },

    ];

    return (
        <>
            <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Profile">
                <Paper elevation={0} sx={{
                    backgroundColor: lightTheme.palette.bgWhite.main,
                    filter: "drop-shadow(0 0 5px rgba(0, 0, 0, .1))",
                    borderRadius: "15px",
                    padding: "20px",
                    margin: "24px 0"
                }}>

                    <Box sx={{ padding: "12px 0", width: "90%", margin: "0 auto" }} display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
                        <Assets src={"/assets/images/checkout-img.png"} absolutePath={true} style={{ height: "150px", width: "150px" }} />
                        <Typography className={classes.typographyTitle}>The order has been received</Typography>
                        <Typography className={classes.typographyBody}> We will start processing your Dot Point Challenge as soon as we receive the payment. Your login
                            credentials will be emailed to you within 24 hours of receiving the payment.
                        </Typography>

                        <Card sx={{ borderRadius: "20px", marginTop: 5, marginBottom: 5 }}>
                            <Grid container spacing={2} border="1px solid #EEEEEE" borderRadius="20px">
                                <Grid xs={12} md={12} className={classes.box1} paddingTop={2}>
                                    <Typography className={classes.typographyText}>
                                        Order number
                                    </Typography>
                                    <Typography className={classes.typographyText2}>
                                        19102891
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12} className={classes.box1}>
                                    <Typography className={classes.typographyText}>
                                        Account Size
                                    </Typography>
                                    <Typography className={classes.typographyText2}>
                                        $10,000
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12} className={classes.box1}>
                                    <Typography className={classes.typographyText}>
                                        Risk Mode
                                    </Typography>
                                    <Typography className={classes.typographyText2}>
                                        Normal
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12} className={classes.box1}>
                                    <Typography className={classes.typographyText}>
                                        Account Type
                                    </Typography>
                                    <Typography className={classes.typographyText2}>
                                        Dot Point
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12} className={classes.box1}>
                                    <Typography className={classes.typographyText}>
                                        Platform
                                    </Typography>

                                    <Typography className={classes.typographyText2}>
                                        MT4
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12} className={classes.box1}>
                                    <Typography className={classes.typographyText}>
                                        Trading Account Currency
                                    </Typography>
                                    <Typography className={classes.typographyText2}>
                                        USD
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12} className={classes.toBePaidMain}>
                                    <Typography className={classes.toBePaidTypography}>
                                        To be paid
                                    </Typography>
                                    <Typography className={classes.toBePaidTypography2}>
                                        €155.00
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>

                        <Typography className={classes.paymentText}>Choose the payment method</Typography>

                        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={3}>
                                    <Grid item>
                                        <img src='/assets/images/visa-img.png' width={215} height={79} />
                                    </Grid>
                                    <Grid item>
                                        <img src='/assets/images/master-card-img.png' width={215} height={79} />
                                    </Grid>
                                    <Grid item>
                                        <img src='/assets/images/aliPay-img.png' width={215} height={79} />
                                    </Grid>
                                    <Grid item>
                                        <img src='/assets/images/weChatPay-img.png' width={215} height={79} />
                                    </Grid>
                                    <Grid item>
                                        <img src='/assets/images/coinBase-img.png' width={215} height={79} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <div style={{ display: "flex", alignItems: "center", marginTop: 50 }}>
                            <Typography className={classes.poweredBy} gutterBottom>Powered by</Typography>
                            <Typography className={classes.poweredBy2} gutterBottom>Stripe</Typography>
                        </div>
                    </Box>

                </Paper>
            </BreadcrumbLayout>
        </>
    );
};

export default Traders;

