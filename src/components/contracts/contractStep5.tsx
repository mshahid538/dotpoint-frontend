import React from 'react'
import { Box, Grid, Card, useTheme, Alert } from "@mui/material";
import TextLabel from '@components/common/commonTextLabel';
import CheckIcon from '@mui/icons-material/Check';
import CommonTextField from '@components/common/commonTextField';
import OutlinedCheckbox from '@components/common/commonCheckBox';


const ContractStep5 = ({ activeStep, data, setData, errors }: any) => {
    //Hooks
    const theme = useTheme()

    //States

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
                    <TextLabel variant='h3' fontWeight="500" title="Dot Point Trader Contract" />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="success" component={'div'} icon={<CheckIcon fontSize='large' sx={{ color: theme.palette.bgWhite.main, fontWeight: 600 }} />} sx={{ color: theme.palette.bgWhite.main, bgcolor: theme.palette.defaultBgGreen.main, padding: 1, alignItems: 'center' }} >
                    Step {activeStep - 1} : We&apos;d love to know you more - Completed
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={1}>
                    <TextLabel variant='body2' fontWeight="400" title={`Step ${activeStep} out of 6`} />
                    <TextLabel variant='h5' fontWeight="500" title={`Anything important we need to be aware of?`} />
                    <TextLabel variant='body1' fontWeight="400" title={'If there is anything relevant to your upcoming Dot Point Account, please let us know. For example, this could be merging of more Dot Point Accounts into one master account. If you have a request, please be specific and state the login numbers of all relevant accounts.'} />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid container item xs={12} spacing={3} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Card sx={{ padding: 2, width: '500px' }} variant='outlined' >
                        <Grid item xs={12}>
                            <TextLabel variant='body1' fontWeight="500" title={'Note'} />
                            <CommonTextField
                                width={'100%'}
                                type={'text'}
                                name={'note'}
                                size="medium"
                                textSize='14px'
                                onChange={(e: any) => setData({ ...data, note: e?.target?.value })}
                                multiline
                                rows={2}
                                fontWeight='500'
                                value={data?.note}
                            />
                            <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.note ? errors.note : ""} />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default ContractStep5