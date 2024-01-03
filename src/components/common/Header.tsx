import React, { useEffect, useState } from 'react'
//mui
import { makeStyles } from "tss-react/mui";
import { Box, Hidden, Drawer, IconButton, Avatar, Grid, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// component
import { lightTheme } from '@redux/theme';
import MenuPanel from './menuPanel';
import TextLabel from './commonTextLabel';
import Assets from './image_container';
import { setToken } from "@redux/Api/ClientHelper";
import { LOGIN_TOKEN, REFRESH_LOGIN_TOKEN } from '@redux/Api/AuthApi';
import { useDispatch } from 'react-redux';
import { socialLineLogin } from '@redux/Redux/Actions';
import { tostify } from './tostify';
import ErrorHandler from './errorHandler';
import { useRouter } from 'next/router';

const useStyles = makeStyles()((theme) => {
  return {
    innerHeader: {
      padding: "30px 24px",
      height: "30px",
      borderBottom: "1px solid #eeeeee",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down('md')]: {
        padding: "15px 24px",
      },
      [theme.breakpoints.down('sm')]: {
        padding: "15px 12px",
      },
      [theme.breakpoints.between(600, 900)]: {
        height: "40px",
      },
      [theme.breakpoints.between(320, 600)]: {
        height: "30px",
      },
    },
    headerItems: {
      display: "flex",
      justifyContent: "space-between",
      gap: "18px",
      alignItems: "center",
      [theme.breakpoints.down('md')]: {
        gap: "12px",
      },
    },
    profileHeaderBtn: {
      display: "flex",
      gap: "16px",
      alignItems: "center",
      [theme.breakpoints.down('md')]: {
        gap: "8px",
      },
    },
    profileAvtar: {
      fontWeight: "600",
      fontSize: "20px",
      textTransform: "capitalize",
      border:`1px solid #e3e1e1`,
      [theme.breakpoints.down('md')]: {
        height: "30px",
        width: "30px",
        fontSize: "16px",
      },
    },
    drawer: {
      '& .MuiDrawer-paper': {
        backgroundColor: "#002734"
      }
    }
  };
});

const Header = () => {
  //Hooks
  const { classes } = useStyles();
  const dispatch = useDispatch()
  const router = useRouter()
  const { code }: any = router.query;

  //States
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const userData: any = localStorage.getItem('userData')
  const data: any = JSON.parse(userData)


  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };


  const socialLoginLine = async () => {
    try {
      let response: any
      response = await dispatch(socialLineLogin({
        "idToken": code
      }));

      const error = ErrorHandler(response)
      if (error) {
        tostify(response?.payload?.message, "success")
        localStorage.setItem('userData', JSON.stringify(response?.payload?.data))
        localStorage.setItem(LOGIN_TOKEN, response?.payload?.data?.token)
        localStorage.setItem(REFRESH_LOGIN_TOKEN, response?.payload?.data?.refresh_token)
        setToken(response?.payload?.data?.token)
        if(!response?.payload?.data?.email){
          router.push("/profile")
        }else{
          router.push("/")
        }
      }
    } catch (error) {
      tostify(`An error occurred during login`, "error")
    }
  }

  useEffect(() => {
    if (!localStorage.getItem(LOGIN_TOKEN) && code) {
      socialLoginLine()
    }
  }, [code])

  // React.useEffect(() => {
  //   if (!session?.user) {
  //     router.push('/login');
  //   }
  // }, [session, router]);

  let labelText = '';

  if (router.pathname === '/' || router.pathname === '/dashboard') {
    labelText = 'Client Area';
  } else if (router.pathname === '/client-area') {
    labelText = 'Client Area';
  } else if (router.pathname === '/profile') {
    labelText = 'Profile';
  } else if (router.pathname === '/billing') {
    labelText = 'Billing';
  } else if (router.pathname === '/leaderboard') {
    labelText = 'Traders League';
  } else if (router.pathname === '/certificate') {
    labelText = 'Certificate';
  } else if (router.pathname.split('/')?.[1] === 'traders') {
    labelText = 'Traders';
  } else if (router.pathname === '/customer-support') {
    labelText = 'Customer Support ';
  } else if (router.pathname === '/utilities') {
    labelText = 'Utilities';
  } else if (router.pathname === '/economic-calendar') {
    labelText = 'Economic Calendar';
  } else if (router.pathname === '/new-challenge') {
    labelText = 'New Challenge';
  }

  return (
    <>
      <Box sx={{ backgroundColor: "#f5fafe", borderRadius: { md: "50px 0 0 0", sm: "0px" }, position: "sticky", top: 0, zIndex: 100 }}>
        <Box className={classes.innerHeader} >
          <Hidden mdUp>
            <Box >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ marginTop: "-16px" }}
              >
                <MenuIcon style={{ color: "#000" }} />
              </IconButton>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={toggleDrawer}
                    className={classes.drawer}
                  >
                    <Box sx={{ textAlign: "right", padding: "12px 10px 0px", backgroundColor: "#002734" }}>
                      <CloseIcon onClick={toggleDrawer} sx={{ fontSize: "24px", color: lightTheme.palette.bgGray.main, zIndex: "2" }} />
                    </Box>
                    <MenuPanel />
                  </Drawer>
                </Grid>
              </Grid>
            </Box>
          </Hidden>
          <TextLabel variant="h2" fontWeight="600" title={labelText} />
          <Box className={classes.headerItems}>
            {/* <Assets height="25px" width="25px" src={"/assets/icons/notification.svg"} absolutePath={true} /> */}
            <Box className={classes.profileHeaderBtn}  >
              <Hidden smDown>
                <TextLabel variant="subtitle1" fontWeight="500" title={data?.firstName ? data?.firstName + " " + data?.lastName : data?.email} />
              </Hidden>
              <Avatar className={classes.profileAvtar} alt={data?.firstName ? data?.firstName : "profileAvtar"} src={data?.image ? "https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/" + data?.image : "/"} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Header