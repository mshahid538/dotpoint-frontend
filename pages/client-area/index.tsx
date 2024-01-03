import Clientarea from '@components/clientArea'
import BreadcrumbLayout from '@components/common/Layout/breadcrumbLayout'
import Layout from '@components/common/Layout/layout'
import PaperContainer from '@components/common/PaperContainer'
import NewClientArea from '@components/newClientArea/newClientArea'
import { trading_accounts_details } from '@redux/Redux/Actions'
import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Index = () => {
    const dispatch = useDispatch()

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
            label: "Client Area",
            path: "#",
        },
    ];
    // useEffect(() => {
    //     handlePaymentModal()
    // }, [])

    // const handlePaymentModal = async () => {
    //     const getPaymentLink = await dispatch(trading_accounts_details());
    //     console.log("getPaymentLink", getPaymentLink);
    // }
    return (
        <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Utilities">
            {/* <PaperContainer title="Free Trial" >
                <Clientarea />
            </PaperContainer> */}
            <NewClientArea />
        </BreadcrumbLayout>
    )
}

export default Index

