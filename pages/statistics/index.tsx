
import React, { ReactNode } from 'react'
// import liff from "@line/liff"
import Dashboard from '@components/dashboard'
import BreadcrumbLayout from '@components/common/Layout/breadcrumbLayout'
import PaperContainer from '@components/common/PaperContainer';
import Statistics from '@components/statistics/index'
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
            label: "Client Area",
            path: '/client-area',
        },
        {
            label: 'Statistics',
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
        <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Profile">
            <Dashboard />
            {/* <PaperContainer title="Free Trial" /> */}
            {/* <Statistics /> */}
        </BreadcrumbLayout>
    )
}

export default index