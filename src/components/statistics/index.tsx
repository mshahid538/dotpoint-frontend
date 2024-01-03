import React, { useState } from 'react'
//mui
import { Box, Button } from '@mui/material'
//component
import CurrentResults from './CurrentResults'
import DotPointChallenge from './DotPointChallenge'
import Objectives from './Objectives'
import ConsistencyScore from './ConsistencyScore'
import StatisticsTbl from './StatisticsTbl'
import DailySummary from './DailySummary'
import TradingJournal from './TradingJournal'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import usePageLoader from '@redux/hooks/usePageLoader'
import { get_consistency_score } from '@redux/Redux/Actions'
import ErrorHandler from '@components/common/errorHandler'
import { tostify } from '@components/common/tostify'

const StatisticsArea = ({ statisticsModal, buyChallengeGet, historyData, challengeUserId }: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const setFullPageLoader = usePageLoader();
    //state
    const [tab, settab] = useState('1')
    const [consistencyScoreData, setConsistencyScoreData] = useState<any>([]);

    const tabName = [
        {
            id: '1',
            name: 'Current Results'
        },
        {
            id: '2',
            name: 'Dot Point Challenge'
        },
        {
            id: '3',
            name: 'Consistency Score'
        },
        {
            id: '4',
            name: 'Objectives'
        },
        {
            id: '5',
            name: 'Statistics'
        },
        {
            id: '6',
            name: 'Daily Summary'
        },
        {
            id: '7',
            name: 'Trading Journal'
        },
    ]
    const _getConsistencyScore = async () => {
        try {
            setFullPageLoader(true);
            const response = await dispatch(get_consistency_score({ challengeUserId: challengeUserId }));
            const error = ErrorHandler(response);
            if (error) {
                console.log(response, "response")
                setConsistencyScoreData(response.payload.data);
                setFullPageLoader(false);
            } else {
                setFullPageLoader(false);
            }
        } catch (error: any) {
            tostify(error.message, "error")
            setFullPageLoader(false);
        }
    };

    React.useEffect(() => {
        if (tab === "3" && challengeUserId) _getConsistencyScore()
    }, [router.isReady, tab]);
    return (
        <Box>
            <Box sx={{ display: "flex", gap: { lg: "15px", md: "14px", xs: "8px" }, flexWrap: "wrap", justifyContent: { lg: "start", md: "center", xs: "center" }, marginBottom: { sm: "24px", xs: "12px" } }}>
                {
                    tabName.map((item, i) => (
                        // <Grid item xs={2.4}>
                        <Button
                            key={i}
                            size='large'
                            variant='contained'
                            sx={{
                                padding: { md: "14px 22px", sm: "8px 6px", xs: "8px 4px" },
                                fontSize: { md: "14px", sm: "13px", xs: "11px" },
                                lineHeight: { sm: "18px", xs: "15px" },
                                width: '100%',
                                minWidth: { md: "200px", sm: "150px", xs: "125px" },
                                maxWidth: { md: "200px", sm: "150px", xs: "125px" },
                                borderRadius: '50px',
                                backgroundColor: `${item.id === tab ? '' : '#FFFFFF'}`,
                                color: `${item.id === tab ? '' : '#000000'}`,
                                boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                                '&:hover': {
                                    // backgroundColor: `${item.id === tab ? '' : '#FFFFFF'}`,
                                    color: `${item.id === tab ? '' : '#fff'}`,
                                    boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                                },
                            }}
                            onClick={() => settab(item.id)}
                        >
                            {item.name}
                        </Button>

                        // </Grid>
                    ))
                }
            </Box>
            {
                tab === '1' ?
                    <CurrentResults historyData={historyData} />
                    : tab === '2' ?
                        <DotPointChallenge statisticsModal={statisticsModal} />
                        : tab === '3' ?
                            <ConsistencyScore data={consistencyScoreData} />
                            : tab === '4' ?
                                <Objectives buyChallengeGet={buyChallengeGet} />
                                : tab === '5' ?
                                    <StatisticsTbl buyChallengeGet={buyChallengeGet} />
                                    : tab === '6' ?
                                        <DailySummary historyData={historyData?.dayWiseData} buyChallengeGet={buyChallengeGet} />
                                        : tab === '7' ?
                                            <TradingJournal historyData={historyData?.tradingJournalData} />
                                            : null
            }
        </Box>
    )
}

export default StatisticsArea
