import React from 'react'
import { Box, Grid, Card, useTheme, Alert } from "@mui/material";
import TextLabel from '@components/common/commonTextLabel';
import CheckIcon from '@mui/icons-material/Check';
import SelectDropDown from '@components/common/selectDropDown';
import CommonTextField from '@components/common/commonTextField';
import { useRouter } from 'next/router';

const ContractStep2 = ({ activeStep, data, setData, countries, errors, age }: any) => {
    //Hooks
    const theme = useTheme()
    const router = useRouter()
    console.log(router.query, "query")
    //States
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
                    <TextLabel
                        variant='h3'
                        fontWeight="500"
                        title="Dot Point Trader Contract"
                    />
                </Box>

            </Grid>
            <Grid item xs={12}>
                <Card elevation={2} sx={{ padding: 2 }} variant='outlined'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
                        <TextLabel
                            variant='body1'
                            fontWeight="400"
                            textAlign='center'
                            title="Congratulations again on passing our Evaluation Process! You are now just a few steps away from managing an Dot Point Account.Please complete the form below and double check that all information is correct."
                        />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="success" component={'div'} icon={<CheckIcon fontSize='large' sx={{ color: theme.palette.bgWhite.main, fontWeight: 600 }} />} sx={{ color: theme.palette.bgWhite.main, bgcolor: theme.palette.defaultBgGreen.main, padding: 1, alignItems: 'center' }} >
                    Step {activeStep - 1} : Pass the Evaluation Process - Completed
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={1}>
                    <TextLabel
                        variant='body2'
                        fontWeight="400"
                        title={`Step ${activeStep} out of 6`}
                    />
                    <TextLabel
                        variant='h5'
                        fontWeight="400"
                        title={'Personal  Credentials'}
                    />
                    {/* <TextLabel
                        textAlign='center'
                        variant='body2'
                        fontWeight="400"
                        title={'Would you like your Dot Point Contract to be registered on your personal credentials or on your company?'}
                    />
                    <SelectDropDown
                        width={'520px'}
                        values={["Personal", "Company"]}
                        name="credentialType"
                        value={data?.credentialType}
                        valid
                        onChange={(e: any) => { setData({ ...data, credentialType: e.target.value }) }}
                    /> */}
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Card elevation={1} sx={{ padding: 2 }} variant='outlined'>
                    <TextLabel
                        variant='body1'
                        fontWeight="500"
                        title={'Trader'}
                        marginBottom='2px'
                    />
                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CommonTextField
                                text='First (Given) Name(s)'
                                width={'100%'}
                                type="text"
                                name="firstName"
                                size="medium"
                                textSize='12px'
                                value={data?.firstName}
                                onChange={(e: any) => { setData({ ...data, firstName: e.target.value }) }}
                            />
                            <Box display={'flex'} gap={2}>
                                <TextLabel variant='body2' fontWeight="400" title={'*as it appears on your ID'} marginTop='2px' />
                                <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.firstName ? errors?.firstName : " "} />
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CommonTextField
                                text='Middle Name(s)'
                                width={'100%'}
                                type="text"
                                name="middleName"
                                size="medium"
                                textSize='12px'
                                value={data?.middleName}
                                onChange={(e: any) => { setData({ ...data, middleName: e.target.value }) }}
                            />
                            {/* <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.middleName ? errors?.middleName : " "} /> */}
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CommonTextField
                                text='Surname (Family Name)'
                                width={'100%'}
                                type="text"
                                name="surname"
                                size="medium"
                                textSize='12px'
                                value={data?.surname}

                                onChange={(e: any) => { setData({ ...data, surname: e.target.value }) }}
                            />
                            <Box display={'flex'} gap={2}>
                                <TextLabel variant='body2' fontWeight="400" title={'*as it appears on your ID'} marginTop='2px' />
                                <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.surname ? errors?.surname : " "} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CommonTextField
                                text='Date of Birth'
                                width={'100%'}
                                type="date"
                                name="dateOfBirth"
                                size="medium"
                                textSize='12px'
                                value={data?.dateOfBirth}
                                onChange={(e: any) => { setData({ ...data, dateOfBirth: e.target.value }) }}
                                InputProps={{ inputProps: { max: "9999-12-31" } }}
                            />
                            <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.dateOfBirth ? errors?.dateOfBirth : " "} />
                            <TextLabel variant="caption" fontSize="11px" color="error" title={data?.dateOfBirth && age < 18 ? errors?.dateOfBirth : " "} />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card elevation={1} sx={{ padding: 2 }} variant='outlined'>
                    <TextLabel
                        variant='body1'
                        fontWeight="500"
                        title={'Address'}
                        marginBottom='2px'
                    />
                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CommonTextField
                                text='Street,house/building number'
                                width={'100%'}
                                type="text"
                                name="street"
                                size="medium"
                                textSize='12px'
                                value={data?.street}
                                onChange={(e: any) => { setData({ ...data, street: e.target.value }) }}
                            />
                            <Box display={'flex'} gap={2}>
                                <TextLabel variant='body2' fontWeight="400" title={'*as it appears on your ID'} marginTop='2px' />
                                <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.street ? errors?.street : " "} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CommonTextField
                                text='City'
                                width={'100%'}
                                type="text"
                                name="city"
                                size="medium"
                                textSize='12px'
                                value={data?.city}
                                onChange={(e: any) => { setData({ ...data, city: e.target.value }) }}
                            />
                            <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.city ? errors?.city : " "} />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CommonTextField
                                text='Zipcode (Post Code)'
                                width={'100%'}
                                type="text"
                                name="zipCode"
                                size="medium"
                                textSize='12px'
                                value={data?.zipCode}
                                onChange={(e: any) => { setData({ ...data, zipCode: e.target.value }) }}
                            />
                            <Box display={'flex'} gap={2}>
                                <TextLabel variant='body2' fontWeight="400" title={'*as it appears on your ID'} marginTop='2px' />
                                <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.zipCode ? errors?.zipCode : " "} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <SelectDropDown
                                width='100%'
                                text="Country"
                                values={countries}
                                name="country"
                                value={data?.country}
                                onChange={(e: any) => { setData({ ...data, country: e.target.value }) }}
                                labelSize='12px'
                                size='small'
                            />
                            <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.country ? errors?.country : " "} />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ContractStep2