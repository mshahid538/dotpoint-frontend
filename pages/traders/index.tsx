import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
//mui
import { Box, Grid, Tab, Tabs, Tooltip, Typography } from "@mui/material";
//component
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import PaperContainer from "@components/common/PaperContainer";
import { get_kyc_verificationById, userProfileWithdrawalGet, user_profile } from "@redux/Redux/Actions";
import usePageLoader from '@redux/hooks/usePageLoader';
import Payouts from "@components/payouts";
import Contracts from "@components/contracts";
import ErrorHandler from "@components/common/errorHandler";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
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



function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, marginTop: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Traders: React.FC<ProfileProps> = ({
}) => {
  //Hooks
  const router = useRouter();
  const dispatch = useDispatch()
  const setFullPageLoader = usePageLoader();

  //States
  const [userData, setUserData] = useState<any>({});
  const [tradingAccount, setTradingAccount] = useState<any>();
  const [invoiceData, setInvoiceData] = useState<any>()
  const [tab, setTab] = React.useState(0);

  const breadcrumbsData: Breadcrumb[] = [
    {
      label: "Trader",
      path: "/",
    },
    {
      label: "Dot Point Traders",
      path: "#",
    },
  ];

  const headerLabels = ["Trading Account", "Total Profit", ""];

  const content = [
    {
      Trading_Accoun: `$${userData?.tradingAccountId}`,
      Total_Profit: `$${userData?.totalProfit}`,
      button_text: "Start Processing",
    },
  ];

  const invoicesContent = [
    {
      invoice: "2090969004",
      date: "17 Feb 2023",
      payout: "$25,645.61",
      button_text: "Open",
    },
  ];

  const invoicesHeaderLabels = ["Invoice", "Date", "Payout"];

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };



  const getUserData = async () => {
    const user: any = await localStorage.getItem('userInfo');
    const data: any = JSON.parse(user)
    setUserData(data);
  }

  const _getTradingAc = async () => {
    try {
      setFullPageLoader(true);
      const response = await dispatch(user_profile());
      if (response?.payload?.status === 200) {
        setTradingAccount(response?.payload?.data)
        setFullPageLoader(false);
      }
    } catch (error: any) {
      toast.error(error.message, { position: toast.POSITION.TOP_RIGHT, });
      setFullPageLoader(false);
    }
  }

  const _getInvoice = async () => {
    const body = {
      "page": 1,
      "limit": 10
    }
    try {
      setFullPageLoader(true);
      const response = await dispatch(userProfileWithdrawalGet(body));
      setInvoiceData(response?.payload?.data)
      // setFullPageLoader(false);
    } catch (error: any) {
      toast.error(error.message, { position: toast.POSITION.TOP_RIGHT, });
      setFullPageLoader(false);
    }
  }


  useEffect(() => {
    _getTradingAc();
    _getInvoice();
  }, []);

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Traders">

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PaperContainer
              fontSize='25px'
              title={"Dot Point Traders"}
              bodyPadding="0px"
              sx={{ overflow: "hidden" }}
              tabContent={
                <Box sx={{ borderBottom: 1, borderColor: 'ButtonShadow', marginRight: 5 }}>
                  <Tabs value={tab} onChange={handleTab} aria-label="basic tabs example">
                    <Tab label="Contracts" {...a11yProps(0)} />
                    <Tab label="Payouts" {...a11yProps(1)} />
                    {/* <Tab label="Payouts" {...a11yProps(1)} disabled={tradingAccount?.isKYCVerified ? false : true} /> */}
                  </Tabs>
                </Box>}
            >
              <CustomTabPanel value={tab} index={0}>
                <Contracts />
              </CustomTabPanel>
              <CustomTabPanel value={tab} index={1}>
                <Payouts tradingAccount={tradingAccount} invoiceData={invoiceData} invoicesContent={invoicesContent} invoicesHeaderLabels={invoicesHeaderLabels} userData={userData} content={content} headerLabels={headerLabels} />
              </CustomTabPanel>
            </PaperContainer>
          </Grid>
        </Grid>
      </BreadcrumbLayout>
    </>
  );
};

export default Traders;
