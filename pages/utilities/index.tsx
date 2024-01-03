import React, { ReactNode } from "react";
//mui
import { makeStyles } from "tss-react/mui";
import { Box, Card, CardContent, Grid } from "@mui/material";
//component
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import PaperContainer from "@components/common/PaperContainer";
import TextLabel from "@components/common/commonTextLabel";
import Assets from "@components/common/image_container";

const useStyles = makeStyles()(() => {
  return {
    customerCard: {
      borderRadius: "10px",
      border: "1px solid #eeeeee",
      boxShadow: "none",
      "& .MuiCardContent-root ": {
        paddingBottom: "12px !important",
      },
    },
  };
});

const utilitiesData = [
  // {
  //   id: 1,
  //   icon: "/assets/icons/utility_1.svg",
  //   subIcons: [{
  //     link: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader5.com&utm_campaign=download",
  //     icon: "/assets/icons/window_icon.svg"
  //   }, {
  //     link: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.pkg.zip?utm_source=www.metatrader5.com&utm_campaign=download.mt5.macos",
  //     icon: "/assets/icons/apple_icon.svg"
  //   }],
  // },
  {
    id: 2,
    icon: "/assets/icons/utility_2.svg",
    subIcons: [{
      link: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader5.com&utm_campaign=download",
      icon: "/assets/icons/window_icon.svg"
    }, {
      link: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.pkg.zip?utm_source=www.metatrader5.com&utm_campaign=download.mt5.macos",
      icon: "/assets/icons/apple_icon.svg"
    }],
  },
  // {
  //   id: 3,
  //   icon: "/assets/icons/utility_3.svg",
  //   subIcons: ["/assets/icons/window_icon.svg"],
  // },
];

const itemsData = [
  {
    id: 1,
    icon: "/assets/icons/zip_icon.svg",
    title: "Dot Point Background 1920x1080px (ZIP)",
  },
  {
    id: 2,
    icon: "/assets/icons/zip_icon.svg",
    title: "Wallpapers",
  },
  {
    id: 3,
    icon: "/assets/icons/zip_icon.svg",
    title: "Piggy Bank 3D Model",
  },
  {
    id: 4,
    icon: "/assets/icons/zip_icon.svg",
    title: "Printable Dot Point Posters",
  },
];

const Utility = () => {
  const { classes } = useStyles();
  interface Breadcrumb {
    label: ReactNode;
    path: string;
  }

  const breadcrumbsData: Breadcrumb[] = [
    {
      label: "Trader",
      path: "/",
    },
    {
      label: "Utilities",
      path: "#",
    },
  ];
  return (
    <>
      <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Utilities">
        <PaperContainer
          title={"Utilities"}
        >
          <TextLabel fontWeight="600" title="Platforms" variant="subtitle2" />
          <Grid container spacing={2} mt={0}>
            {/* Platforms
            <a href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en&referrer=ref_id%3d4946019784992326989%26utm_source%3dwww.metatrader5.com%26utm_campaign%3dinstall.metaquotes" target="_blank" style={{ textDecoration: 'none' }}>
              <TextLabel fontWeight="400" variant='subtitle2' title="Download" color="#0099CB" />
            </a> */}
            {utilitiesData.map((item) => (
              <Grid item key={item.id} md={3} sm={4} xs={12}>
                <Box
                  p={1.5}
                  border={"1px solid #eeeeee"}
                  textAlign={"center"}
                  borderRadius={2}
                  // height="80px"
                  width="auto"
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={1}
                >
                  <Assets width="100%" height="auto" style={{ maxWidth: "160px" }} src={item.icon} absolutePath={true} />
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
                    {item.subIcons.map((subIcon, index) => (
                      <>
                        <a href={subIcon.link} target="_blank" >
                          <Assets key={index} src={subIcon.icon} absolutePath={true} style={{ marginTop: index === 0 ? 5 : 0 }} />
                        </a>
                      </>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          {/* <TextLabel marginTop="28px" fontWeight="600" title="Others" />
          <Grid container spacing={2} mt={0}>
            {itemsData.map((item) => (
              <Grid item lg={6} xs={12} key={item.id}>
                <Card className={classes.customerCard}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: { sm: "center", xs: "start" },
                      gap: { sm: "18px", xs: "6px" },
                      flexWrap: "wrap",
                      padding: "12px 18px",
                      flexDirection: { sm: "row", xs: "column" },
                      justifyContent: "start"
                    }}
                  >
                    <Box sx={{ flexShrink: "0" }}>
                      <Assets src={item.icon} absolutePath={true} />
                    </Box>
                    <Box sx={{ flexGrow: "1" }}>
                      <TextLabel fontWeight="600" variant="body1" title={item.title} />
                    </Box>
                    <Box sx={{}}>
                      <Assets src={"/assets/icons/download_icon.svg"} absolutePath={true} style={{ height: "24px", width: "24px" }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid> */}
        </PaperContainer>
      </BreadcrumbLayout>
    </>
  );
};

export default Utility;
