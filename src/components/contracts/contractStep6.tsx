import React from 'react'
import { Box, Grid, Card, useTheme, Alert } from "@mui/material";
import TextLabel from '@components/common/commonTextLabel';
import CheckIcon from '@mui/icons-material/Check';
import CommonTextField from '@components/common/commonTextField';
import OutlinedCheckbox from '@components/common/commonCheckBox';
import DocPreview from '@components/common/docPreview';


const ContractStep6 = ({ activeStep, data, setData, errors }: any) => {
    //Hooks
    const theme = useTheme()

    //States

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
                    <TextLabel variant='h3' fontWeight="500" title="Dot Point Trader Contract" />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="success" component={'div'} icon={<CheckIcon fontSize='large' sx={{ color: theme.palette.bgWhite.main, fontWeight: 600 }} />} sx={{ color: theme.palette.bgWhite.main, bgcolor: theme.palette.defaultBgGreen.main, padding: 1, alignItems: 'center' }} >
                    Step {activeStep - 1} : Anything important we need to be aware of? - Completed
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={1}>
                    <TextLabel variant='body2' fontWeight="400" title={`Step ${activeStep} out of 6`} />
                    <TextLabel variant='h5' fontWeight="500" title={`Review and sign your Contract Agreement`} />
                    <TextLabel variant='body1' fontWeight="400" title={'Please thoroughly review the Contract Agreement below. Confirm that al data is correct and that you agree with the Contract Agreement terms. Confirm your undorstanding by signing the contract and submitting the form.'} />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
                    <Card sx={{ padding: 2, width: '1000px' }} variant='outlined'>
                        <DocPreview link={"/assets/doc/DotPointAccountAgreement.pdf"} iconName={"pdf"} octateFile={false} isSideView={true} />
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Box width={'900px'}>
                    <OutlinedCheckbox
                        color={theme.palette.bgBlack.main}
                        label={"I acknowledge, confirm and agree that I have read and fully understood the Dot Point Account Agreement as displayed in the window above. I confirm that by pressing the button below “I agree with the Dot Point Account Agreement”, electronically sign the Dot Point Account Agreement."}
                        name={'isAccountAgreement'}
                        handleSelect={(e: any) => {
                            setData({ ...data, isAccountAgreement: e?.target?.checked })
                        }}
                        value={data?.isAccountAgreement}
                        fontWeight={600}
                        fontSize={'13px'}
                        selected={data?.isAccountAgreement}
                        error={errors?.isAccountAgreement}
                    />
                </Box>
            </Grid>
        </Grid >
    )
}

export default ContractStep6