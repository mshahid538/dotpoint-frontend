import React, {
  useState,
  createRef,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import {
  Grid,
  Box,
  Switch,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { makeStyles } from "tss-react/mui";
import Link from "next/link";
import MUIButton from "@components/common/commonButton";
import Certificate1 from "@components/certificate/CertiFfcate1";
import Layout from "@components/common/Layout/layout";
import AlertBox from "@components/common/alertBox";
import TextLabel from "@components/common/commonTextLabel";
import Assets from "@components/common/image_container";
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import PaperContainer from "@components/common/PaperContainer";
import MUIAlert from "@components/common/commonAlertBox";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import moment from "moment";
import { userProfileWithdrawalGet, user_profile } from "@redux/Redux/Actions";
import { toast } from "react-toastify";
import ErrorHandler from "@components/common/errorHandler";
import usePageLoader from "@redux/hooks/usePageLoader";
import { useDispatch } from "react-redux";
import RadioButtonBox from "@components/common/RadioButtonBox";
import SvgComponent from "@components/certificate/NewCertificate";
import PayoutSvgComponent from "@components/certificate/PayoutCertificate";
import { useRouter } from "next/router";
const useStyles = makeStyles()((theme) => {
  return {
    mainbox: {
      marginTop: "50px",
    },

    subTitle: {
      paddingTop: "20px",
      fontSize: "14px",
      color: "#262729",
      padding: "15px",
      fontWeight: "bold",
    },
    nickname: {
      textAlign: "end",
    },
    discription: {
      textAlign: "end",
    },
    link: {
      color: "black",
    },
  };
});

interface Breadcrumb {
  label: ReactNode;
  path: string;
}
const buttonsData = [
  { label: "All", id: 1 },
  { label: "Evaluation Process", id: 2 },
  { label: "Payouts", id: 3 },
  // { label: 'Max Allocation', id: 4 },
  // { label: 'Overall payouts', id: 5 },
  // { label: "Dot Point Academy", id: 6 }
];
const breadcrumbsData: Breadcrumb[] = [
  {
    label: "Trader",
    path: "/",
  },
  {
    label: "Certificate",
    path: "#",
  },
];
function Certificate() {
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();
  const theme = useTheme()
  const router = useRouter()
  const [checked, setChecked] = useState(true);
  const [clientData, setClientData] = useState<any>();
  const [payouts, setPayouts] = useState<any>([]);
  const [payoutAmount, setPayoutAmount] = useState<any>("");
  const [selectedAccountBalance, setSelectedAccountBalance] = useState<any>('All');
  const ref: any = createRef<any>();
  const ref2: any = createRef<any>();
  const [display, setDisplay] = useState("none");
  const [display2, setDisplay2] = useState("none");
  const userDataLocal: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataLocal);
  console.log(payouts, "payouts")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const { classes } = useStyles();

  const handleAccountBalance = (e: any) => {
    setSelectedAccountBalance(e);
  };

  const _getUserDetails = async () => {
    try {
      setFullPageLoader(true);
      const response = await dispatch(user_profile());
      const error = ErrorHandler(response);
      if (error) {
        setClientData(response.payload.data);
        setFullPageLoader(false);
      } else {
        setFullPageLoader(false);
      }
    } catch (error: any) {
      toast.success(error.message, { position: toast.POSITION.TOP_RIGHT });
      setFullPageLoader(false);
    }
  };

  const downloadSVG = () => {
    const svgElement = ref.current;
    if (!svgElement) {
      console.error("SVG element not found");
      return;
    }
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDisplay("none");
    URL.revokeObjectURL(url);
  };

  const downloadSVG2 = () => {
    const svgElement = ref2.current;
    if (!svgElement) {
      console.error("SVG element not found");
      return;
    }
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDisplay2("none");
    setPayoutAmount("")
    URL.revokeObjectURL(url);
  };

  const _getPayouts = async () => {
    setFullPageLoader(true);
    const body = {
      "page": 1,
      "limit": 10
    }
    try {
      const response = await dispatch(userProfileWithdrawalGet(body));
      const error = ErrorHandler(response);
      if (error) {
        let config =
          response?.payload?.data?.profit_withdrawal_list_data?.length > 0 ? response?.payload?.data?.profit_withdrawal_list_data?.map((e: any) => {
            return {
              ...e,
              title: "Payouts",
              image: "/assets/images/newPayoutCertificate.png",
              isPayout: true,
              isShow: ((selectedAccountBalance === "All" || selectedAccountBalance === "Payouts")) ? true : false,
            };
          }) : [];

        setPayouts(config)
        setFullPageLoader(false);
      } else {
        setFullPageLoader(false);
      }
    } catch (error: any) {
      toast.error(error.message, { position: toast.POSITION.TOP_RIGHT, });
      setFullPageLoader(false);
    }
  }

  useEffect(() => {
    if (display2 === "block") {
      downloadSVG2();
    }
  }, [display2]);

  useEffect(() => {
    _getUserDetails();
    _getPayouts()
  }, []);

  const CertificateCardData = [
    {
      title: "Phase 2",
      image: "/assets/images/newCertificate.png",
      isPayout: false,
      isShow:
        ((selectedAccountBalance === "All" || selectedAccountBalance === "Evaluation Process") &&
          clientData?.tradingAccounts?.filter(
            (item: any) => item?.step2Status == "1"
          )?.length > 0)
          ? true
          : false,
    },
    {
      title: "Phase 1",
      image: "/assets/images/newCertificate.png",
      isPayout: false,
      isShow:
        ((selectedAccountBalance === "All" || selectedAccountBalance === "Evaluation Process") && clientData?.tradingAccounts?.filter(
          (item: any) => item?.step1Status == "1"
        )?.length > 0)
          ? true
          : false,
    },
    {
      title: "Funding",
      image: "/assets/images/newCertificate.png",
      isPayout: false,
      isShow: ((selectedAccountBalance === "All" || selectedAccountBalance === "Payouts") && clientData?.tradingAccounts?.length > 0) ? true : false,
    },
    ...payouts
    // {
    //   title: "Payouts",
    //   image: "/assets/images/newPayoutCertificate.png",
    //   isPayout: true,
    //   isShow: ((selectedAccountBalance === "All" || selectedAccountBalance === "Payouts") && clientData?.tradingAccounts?.length > 0) ? true : false,
    // },
  ];

  useEffect(() => {
    if (display === "block") {
      downloadSVG();
    }
  }, [display]);

  return (
    <>
      <BreadcrumbLayout
        breadcrumb={breadcrumbsData}
        breadcrumbTitle="Certificate"
      >
        {CertificateCardData?.length > 0 ?
          <PaperContainer title={"Certificate"}>
            <TextLabel
              marginBottom="20px"
              fontWeight="600"
              margin="auto auto 12px auto "
              variant="body1"
              title="Download your respective certificate and pride yourself on your success and achievement! The inactive/greyed out certificates will unlock shortly after you pass the respective stage or status for its criteria."
            />
            <Grid container spacing={{ xs: 0, sm: 2 }} xs={12} sm={12} md={12} lg={12} rowGap={2}>
              {buttonsData?.map((val: any, i: number) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={2} key={i}>
                    <RadioButtonBox
                      key={i}
                      padding={9}
                      value={val?.label}
                      label={val?.label}
                      handleChange={() => handleAccountBalance(val?.label)}
                      count={selectedAccountBalance}
                      name={val?.label}
                      num={val?.label}
                      border={"2px solid #91D14F"}
                      backgroundColor={"#91D14F"}
                      textColor={"white"}
                      borderRadius={50}
                    />
                  </Grid>
                );
              })}
              <Grid item container spacing={2}>

                {CertificateCardData.map((data: any, i: any) => {
                  return (
                    <>
                      {data?.isShow && (
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={i}>
                          <CertificateCard withdrawalAmount={data?.withdrawalAmount} data={data} setDisplay={data?.isPayout ? setDisplay2 : setDisplay} setPayoutAmount={setPayoutAmount} />
                        </Grid>
                      )}
                    </>
                  )
                })}
              </Grid>
            </Grid>
            {/* <Box sx={{ marginY: "24px" }}>
              <MUIAlert
                iconName={<Assets src={"/assets/icons/medal-star.svg"} absolutePath={true} height='40px' width='40px' style={{ background: theme.palette.bgdefultBlue.main, padding: 5, borderRadius: 5 }} />}
                icon={false}
                variant="outlined"
                severity="info"
                description="EAs and Indicators are available for download for traders who had at least one paid Dot Point Challenge in the past. Accept our Dot Point Challenge and enjoy our Dot Point Indicators"
              />
            </Box> */}

            {/* </Grid> */}
            <div ref={ref}>
              <SvgComponent
                display={display}
                date={moment(new Date()).format("DD.MM.YYYY")}
                name={userData?.firstName + " " + userData?.lastName}
              />
            </div>
            <div ref={ref2}>
              <PayoutSvgComponent
                display={display2}
                // date={formatDate(currentDate)}
                payoutAmount={payoutAmount}
                date={moment(new Date()).format("DD.MM.YYYY")}
                name={userData?.firstName + " " + userData?.lastName}
              />
            </div>
          </PaperContainer>
          :
          <PaperContainer title={"Certificate"}>
            <Box sx={{ marginY: "20px" }}>
              <MUIAlert
                iconName={<Assets src={"/assets/icons/medal-star.svg"} absolutePath={true} height='40px' width='40px' style={{ background: theme.palette.bgdefultBlue.main, padding: 5, borderRadius: 5 }} />}
                icon={false}
                variant="outlined"
                severity="info"
                description="Haven't got your certificate yet? Dare to dive in! At Dot Point, we believe in optimizing your trading performance and strategies every step of the way. Join us and thrive in the world of trading"
                buttonProps={<MUIButton text="Buy Dot Point Challenge" height='40px' onClick={() => { router.push("/new-challenge"); }} backgroundColor={theme.palette.bgdefultBlue.main} hoverBgColor={theme.palette.bgdefultBlue.main} marginTop={2} />}
                sx={{ display: 'block' }}

              />
            </Box>
          </PaperContainer>
        }
      </BreadcrumbLayout >
    </>
  );
}
export default Certificate;

function CertificateCard({ data, setDisplay, withdrawalAmount, setPayoutAmount }: any) {
  return (
    <Box
      sx={{
        borderRadius: "15px",
        border: "1px solid #eee",
        padding: { sm: "12px", xs: "8px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <IconButton aria-label="delete" sx={{ border: "1px solid #eee" }}>
            <StarOutlineRoundedIcon />
          </IconButton>
          <TextLabel
            variant="subtitle2"
            fontWeight="500"
            title={data?.title || "-"}
          />
        </Box>
        {/* <Chip label={data?.data?.date} /> */}
        <TextLabel
          variant="body1"
          title={moment(new Date()).format("DD-MM-YYYY")}
        />
      </Box>
      <Assets
        width={"100%"}
        height={"250px"}
        src={data?.image}
        absolutePath={true}
        style={{ borderRadius: "15px", margin: "12px 0" }}
      />
      <Box sx={{ display: "flex", gap: { sm: "12px", xs: "6px" } }}>
        <MUIButton
          type="submit"
          fullWidth={true}
          text="Download"
          startIcon={<DownloadRoundedIcon />}
          onClick={() => { setPayoutAmount(withdrawalAmount); setDisplay("block"); }}
        />
      </Box>
    </Box>
  );
}
