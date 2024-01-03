import React from 'react'
import PaperContainer from '@components/common/PaperContainer'
import CommonTextField from '@components/common/commonTextField';
import { lightTheme } from '@redux/theme';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import { Avatar, Box, Typography, Button, Grid } from '@mui/material';
import { makeStyles } from "tss-react/mui";
import SelectDropDown from '@components/common/selectDropDown';
import MUIButton from '@components/common/commonButton';
import CountryJson from '../../Assets/json/CountryJson.json'

const country = CountryJson.countries.map(country => country.name);

const useStyles = makeStyles()((theme) => {
    return {
        inputFieldBox: {
            display: "grid"
        },
        errorMessage: {
            color: 'red',
            fontSize: '12px',
            fontFamily: 'poppins'
        }
    }
});
const language = ['English', "Chinese", "Japanese", "Korean"]
const timezone = ['autodetected', 'UCT-11:00', 'UCT-08:00']

const validationSchema = Yup.object().shape({
    username: Yup.string().required('user name is required'),

});
const AccountInformation = () => {
    const { classes } = useStyles();
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [data, setData] = React.useState<any>({ language: language[2], timezone: timezone[0], isRememberMe: false });

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <Box>
                            <PaperContainer title={"Account Information"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <CommonTextField
                                            text="User Name"
                                            size="medium"
                                            type="text"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            width="100%"
                                        />
                                        <ErrorMessage name="username" component="div" className={classes.errorMessage} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <SelectDropDown
                                            text="State"
                                            values={country || []}
                                            name="country"
                                            value={data?.country}
                                            onChange={(e: any) => {
                                                setData({ ...data, country: e.target.value })
                                                setFieldValue("values", e.target.value)
                                            }}
                                            // valid
                                            width={"100%"}
                                            size="medium"
                                            className="selecteeeborder"
                                        />
                                        <ErrorMessage name="country" component="div" className={classes.errorMessage} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <SelectDropDown
                                            text="Country"
                                            values={country || []}
                                            name="country"
                                            value={data?.country}
                                            onChange={(e: any) => {
                                                setData({ ...data, country: e.target.value })
                                                setFieldValue("values", e.target.value)
                                            }}
                                            // valid
                                            width={"100%"}
                                            size="medium"
                                            className="selecteeeborder"
                                        />
                                        <ErrorMessage name="country" component="div" className={classes.errorMessage} />
                                    </Grid>
                                </Grid>
                            </PaperContainer>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <MUIButton
                                type="submit"
                                disabled={isSubmitting}
                                fullWidth={true}
                                height="42px"
                                width="320px"
                                text="Save"
                                marginTop={4}
                            />
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default AccountInformation