import React from 'react';
import { Box, Grid } from '@mui/material';
import TextLabel from '@components/common/commonTextLabel';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const ConsistencyScore = ({ data }: any) => {
    console.log(data?.consistencyScore, "data?.consistencyScore")
    let score = data?.consistencyScore ? data?.consistencyScore : 0
    console.log(score, "score")
    const blueWidth = Math.min(data?.consistencyScore, 30);
    const greenWidth = Math.min(Math.max(data?.consistencyScore - 30, 0), 80 - 30);
    const yellowWidth = Math.min(Math.max(data?.consistencyScore - 80, 0), 100 - 80);
    const getLabelColor = (score: any) => {
        if (score <= 30) {
            return "#0099CB"
        } else if (score > 30 && score <= 80) {
            return "#91D14F"
        } else if (score > 80 && score <= 100) {
            return "#F2C94C"
        } else {
            return "#CCCCCC"
        }
    }

    const labelStyle = {
        color: 'white',
        padding: '0px 5px',
        backgroundColor: getLabelColor(score),
        borderRadius: '50px',
        position: 'absolute',
        left: `${score - 1.5}%`,
    }

    return (
        <>
            <Grid container spacing={3} xs={12}>
                <Grid item xs={12}>
                    <TextLabel fontWeight="600" variant="h6" title="Consistency Score" />
                </Grid>
                <Grid item xs={12}>
                    <Box display={'flex'} justifyContent={'flex-end'} >
                        <Box display={'flex'} justifyContent={'space-between'} gap={2} flexWrap={'wrap'}>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                                <Box bgcolor={'#0099CB'} height={'20px'} width={'20px'} />
                                <TextLabel fontWeight="500" variant="body1" title="0% To 30%" />
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                                <Box bgcolor={'#91D14F'} height={'20px'} width={'20px'} />
                                <TextLabel fontWeight="500" variant="body1" title="30% To 80%" />
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                                <Box bgcolor={'#F2C94C'} height={'20px'} width={'20px'} />
                                <TextLabel fontWeight="500" variant="body1" title="80% To 100%" />
                            </Box>
                            {/* <Box display={'flex'} alignItems={'center'} gap={1}>
                                <Box bgcolor={'#CCCCCC'} height={'20px'} width={'20px'} />
                                <TextLabel fontWeight="500" variant="body1" title="Remaining %" />
                            </Box> */}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", borderRadius: "50px", overflow: "hidden" }}>
                        <Box sx={{ width: `${30}%`, height: "36px", bgcolor: '#0099CB' }} />
                        <Box sx={{ width: `${50}%`, height: "36px", bgcolor: '#91D14F' }} />
                        <Box sx={{ width: `${20}%`, height: "36px", bgcolor: '#F2C94C' }} />
                        {/* <Box sx={{ flex: 1, height: "36px", bgcolor: '#CCCCCC' }} /> */}
                    </Box>
                    <Box sx={{ display: 'flex', position: 'relative', marginTop: 0.7 }}>
                        <TextLabel
                            fontWeight="400"
                            fontSize="10px"
                            textAlign="center"
                            width="30%"
                            title={`${score}%`}
                            style={labelStyle}
                        />
                        <Box sx={{ position: 'absolute', top: 1, left: `${score - 0}%`, transform: 'translate(-50%, -50%)' }}>
                            <ArrowDropUpIcon style={{ fontSize: 30, color: getLabelColor(score) }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};
export default ConsistencyScore;