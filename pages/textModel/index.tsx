import Layout from '@components/common/Layout/layout'
import CommonModel from '@components/common/commonModel'
import React from 'react'

const TextModel = ({ tableData }: any) => {
    const headerLabels = ['Pay', 'Dot Point Challenge', 'Dates', 'Amount', 'Amount', 'Status', 'Invoice'];

    const content = [
        {
            pay: "",
            challenge: "Account size: $100,000",
            challeng1: "Proforma no.: 18971970",
            dates: "9 Aug 2023",
            amount: "$",
            amout1: 'Swing',
        },
        {
            pay: "",
            challenge: "Account size: $100,000",
            challeng1: "Proforma no.: 18971970",
            dates: "9 Aug 2023",
            amount: "$",
            amout1: 'Swing',
        },
    ]
    return (
        <>
            <Layout>
                {/* <CustomPagination/> */}
                {/* <CommonTable content={content} headerLabels={headerLabels} /> */}
                <CommonModel />
            </Layout>
        </>
    )
}

export default TextModel