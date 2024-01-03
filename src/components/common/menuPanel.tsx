import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Divider, Typography } from "@mui/material";
import { lightTheme } from "@redux/theme";
import { setToken } from "@redux/Api/ClientHelper";
import { makeStyles } from "tss-react/mui";
import MUIButton from "./commonButton";
import Assets from "./image_container";
import SelectDropDown from "./selectDropDown";
import localStoreUtil from "@redux/Api/localstore.util";
import { signOut, useSession } from "next-auth/react";
import { LOGIN_TOKEN, REFRESH_LOGIN_TOKEN } from "@redux/Api/AuthApi";
import { googleLogout } from "@react-oauth/google";
import CommonModal from "./commonModel";
import TextLabel from "./commonTextLabel";

const useStyles = makeStyles()((theme) => {
  return {
    menuLogoBox: {
      display: "flex",
      justifyContent: "center",
      borderBottom: "1px solid #eeeeee57",
    },
    innerHeader: {
      padding: "20px 0",
    },
    headerItems: {
      display: "flex",
      justifyContent: "space-between",
      gap: "30px",
      alignItems: "center",
    },
    HeaderSearchBox: {
      display: "flex",
      background: "#000",
      padding: "10px",
    },
    profileHeaderBtn: {
      display: "flex",
      gap: "16px",
      alignItems: "  ",
    },
    popoverPaper: {
      backgroundColor: "black",
    },
    mobileMenuItems: {
      paddingLeft: "30px",
    },
    HeaderTitleTypography: {
      fontSize: "16px",
      fontWeight: "600",
      color: lightTheme.palette.bgWhite.main,
    },
    ProfilePopoverLayout: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      cursor: "pointer",
      [theme.breakpoints.down("md")]: {
        gap: "12px",
      },
    },
    BasicProfilePopoverLayout: {
      padding: "20px 55px 20px 35px",
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    mainTitle: {
      fontSize: "18px",
      fontWeight: "600",
    },
    subTitle: {
      fontSize: "18px",
    },
    profileAvtar: {
      fontWeight: "600",
      fontSize: "16px",
      color: lightTheme.palette.bgdefultBlue.main,
      backgroundColor: lightTheme.palette.bgDefultLightSky.main,
    },
    lightGrayBG: {
      backgroundColor: lightTheme.palette.bgLightGray.main,
    },
    storeIcon: {
      display: "flex",
      gap: "20px",
      padding: "30px 0",
    },
    drawerMenuItemsMain: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      padding: "30px 30px 30px 0",
      color: "#fff",
      [theme.breakpoints.down(1450)]: {
        padding: "20px 12px 20px 0",
        gap: "16px",
      },
      "& img": {
        paddingLeft: "30px",
        border: "3px solid transparent",
        [theme.breakpoints.down(1450)]: {
          paddingLeft: "16px",
        },
      },
    },
    drawerMenuSubItems: {
      fontSize: "14px",
    },
    activeMenuItem: {
      color: lightTheme.palette.bgdefultBlue.main,
      "& img": {
        filter:
          "invert(48%) sepia(54%) saturate(3491%) hue-rotate(163deg) brightness(90%) contrast(103%)",
        borderLeft: "3px solid",
        marginLeft: "0px",
      },
    },
  };
});

const MenuPanel = () => {
  //hooks
  const { classes } = useStyles();
  const router = useRouter();
  const { data: session } = useSession();
  //state
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [modal, setModel] = React.useState(false);

  const languages = ["English", "Chinese", "Japanese", "Korean"];
  const countryFlagIcons = {
    English: "/assets/language_logo/icon-english.png",
    Chinese: "/assets/language_logo/icon-chinese.png",
    Japanese: "/assets/language_logo/Flag_of_Japan.svg.webp",
    Korean: "/assets/language_logo/icon-korean.png",
    // Add more countries as needed...
  };
  const [data, setData] = React.useState<any>({
    language: languages[0],
    isRememberMe: false,
  });

  const mobileMainMenu = [
    // {
    //     icon: "/assets/icons/statistics.svg",
    //     text: "Statistics",
    //     path: "/"
    // },
    {
      icon: "/assets/icons/home.svg",
      text: "Client Area",
      path: "/client-area",
    },
    {
      icon: "/assets/icons/profile.svg",
      text: "Profile",
      path: "/profile",
    },
    {
      icon: "/assets/icons/dollar.svg",
      text: "Billing",
      path: "/billing",
    },
    {
      icon: "/assets/icons/cup.svg",
      text: "Traders League",
      path: "/leaderboard",
    },
    {
      icon: "/assets/icons/medal-star.svg",
      text: "Certificates",
      path: "/certificate",
    },
    // {
    //     icon: "/assets/icons/security.svg",
    //     text: "KYC Verification",
    //     path: ""
    // },
    {
      icon: "/assets/icons/wallet.svg",
      text: "Dot Point Traders",
      path: "/traders",
    },
    {
      icon: "/assets/icons/24-support.svg",
      text: "Customer Support",
      path: "/customer-support",
    },
    {
      icon: "/assets/icons/frame.svg",
      text: "Utilities",
      path: "/utilities",
    },
    {
        icon: "/assets/icons/calendar.svg",
        text: "Economic Calendar",
        path: "/economic-calendar"
    }
  ];
  const toggleText = () => {
    setIsTextVisible(!isTextVisible);
  };
  // useEffect(() => {
  //     const currentURL = window.location.href;
  //     console.log('Current URL:', currentURL);
  // }, []);
  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);
  return (
    <>
      <Box sx={{ backgroundColor: "#002734" }}>
        <Box>
          <Box
            sx={{
              height: { md: "55px", sm: "50px" },
              padding: { md: "10px", xs: "0 12px 12px" },
            }}
            className={classes.menuLogoBox}
          >
            <Assets
              src={"/assets/images/main-logo.png"}
              absolutePath={true}
              width={"180px"}
              height={"auto"}
            />
          </Box>
          <Divider />
        </Box>
        <Box
          sx={{
            overflowY: "auto",
            height: {
              md: "calc(100vh - 260px)",
              sm: "calc(100vh - 260px)",
              xs: "auto",
            },
          }}
        >
          <Box sx={{ padding: { xl: "30px 30px 0", xs: "24px 12px 0" } }}>
            <MUIButton
              fullWidth={true}
              height="42px"
              width="100%"
              text="New Challenge"
              // fontSize="16px"
              fontWeight="600"
              borderRadius="50px"
              onClick={() => {
                router.push("/new-challenge");
              }}
            // marginTop={5}
            />
            {/* <Hidden smUp>
                        <Box className={classes.storeIcon}>
                            <Assets src={"/assets/images/apple-store.svg"} absolutePath={true} width={'150px'} height={'auto'} />
                            <Assets src={"/assets/images/google-play.svg"} absolutePath={true} width={'150px'} height={'auto'} />
                        </Box>
                    </Hidden> */}
          </Box>
          <Box className={classes.drawerMenuItemsMain}>
            {mobileMainMenu.map((item, index) => (
              <Box
                onClick={() => {
                  router.push(item.path);
                }}
                className={`${classes.ProfilePopoverLayout} ${item.path === location.pathname ? classes.activeMenuItem : ""
                  }`}
                key={index}
              >
                <Assets
                  src={item.icon}
                  absolutePath={true}
                  width={20}
                  height={20}
                />
                <Typography
                  className={`${classes.drawerMenuSubItems} ${item.path === location.pathname
                    ? classes.activeMenuItem
                    : ""
                    }`}
                  onClick={toggleText}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{ padding: { xl: "30px", xs: "24px 12px" } }}
          borderTop={"1px solid #eeeeee57"}
        >
          <SelectDropDown
            color="#fff"
            // height="40px"
            values={languages || []}
            name="language"
            value={data?.language}
            onChange={(e: any) => {
              setData({ ...data, language: e.target.value });
            }}
            sx={{
              "& .MuiSelect-select ": {
                padding: "10px !important",
              },
            }}
            valid
            width="100%"
            countryFlagIcons={countryFlagIcons}
          />
          <MUIButton
            fullWidth={true}
            height="42px"
            width="100%"
            text="Log out"
            fontWeight="600"
            marginTop={2}
            variant={"outlined"}
            color={lightTheme.palette.bgDefultGreen.main}
            backgroundColor={"transparent"}
            hoverBgColor={"transparent"}
            textHoverColor={lightTheme.palette.bgDefultGreen.main}
            border={`1px solid ${lightTheme.palette.bgDefultGreen.main}`}
            onClick={() => { setModel(true); }}
          />
          <CommonModal
            dialogSx={{ padding: 0 }}
            open={modal}
            onClose={() => setModel(false)}
          >
            <>
              <Box p={1}>
                <TextLabel textAlign='center' variant="subtitle2" title={"Are you sure you want to logout ?"} />
              </Box>
              <Box sx={{ display: "flex", gap: "12px", justifyContent: "center", paddingLeft: 2, paddingRight: 2, paddingBottom: 2 }}>
                <MUIButton
                  onClick={async () => {
                    googleLogout();
                    const remove_all = ['userData', LOGIN_TOKEN, REFRESH_LOGIN_TOKEN, 'isEmailVerified'];
                    remove_all.forEach(itm => {
                      localStoreUtil.remove_data(itm)
                    })
                    // localStoreUtil.remove_all();
                    router.push("/login")
                  }}
                  fullWidth={true}
                  height="42px"
                  width="320px"
                  text="Yes"
                // marginTop={8}
                />
                <MUIButton
                  onClick={async () => {
                    setModel(false)
                  }}
                  fullWidth={true}
                  height="42px"
                  width="320px"
                  text="No"
                />
              </Box>
            </>
          </CommonModal>
        </Box>
      </Box>
    </>
  );
};

export default MenuPanel;
