
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import React, { ReactNode } from 'react'
import Layout from '@components/common/Layout/layout'
// import liff from "@line/liff"
import TradingJournal from '@components/tradingJournal'
import Billing from './billing'
import PaperContainer from '@components/common/PaperContainer'
import Dashboard from '@components/dashboard'
import { Grid } from '@mui/material'
import ChartComponent from '@components/chart'
import BreadcrumbLayout from '@components/common/Layout/breadcrumbLayout'
import ClientArea from '@components/clientArea'
import NewClientArea from '@components/newClientArea/newClientArea'
interface Breadcrumb {
  label: ReactNode;
  path: string;
}
interface MainIndexProps {
  children: ReactNode;
  breadcrumb: Breadcrumb[];
  breadcrumbTitle: string;
  description?: string;
}
const index: React.FC<MainIndexProps> = ({
}) => {
  const breadcrumbsData: Breadcrumb[] = [
    {
      label: "Trader",
      path: '/',
    },
    {
      label: 'Client Area',
      path: '#',
    },
  ];

  // React.useEffect(() => {
  //   liff.init({ liffId: '2000975203-EbKP1kj2' }).then(() => {
  //     handleLogin()
  //   })
  // }, []);

  // const handleLogin = async () => {
  //   try {
  //     const res = await liff.getProfile()
  //     console.log("res",res);

  //   } catch (err) {
  //     console.log(err);

  //   }
  // }

  return (
    <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Utilities">
      <NewClientArea />
    </BreadcrumbLayout>
    // <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Profile">
    // <Dashboard />
    //   {/* <PaperContainer title="Free Trial" /> */}
    // </BreadcrumbLayout>
  )
}

export default index