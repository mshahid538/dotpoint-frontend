import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { makeStyles } from "tss-react/mui";
import MUIButton from '@components/common/commonButton';
import PaperContainer from '@components/common/PaperContainer';
import CommonTextField from '@components/common/commonTextField';
import MUIAlert from '@components/common/commonAlertBox';
import { Avatar, Box, Typography, Grid, IconButton, Badge, useTheme } from '@mui/material';
import { lightTheme } from '@redux/theme';
import { Formik, ErrorMessage, Form } from 'formik';
import SelectDropDown from '@components/common/selectDropDown';
import TextLabel from '@components/common/commonTextLabel';
import FooterContent from '@components/common/footerContent';
import CountryJson from '../../Assets/json/CountryJson.json';
import { change_email, change_email_verification, social_login_change_email_verification, uploadImg, userUpdate, user_profile } from '@redux/Redux/Actions';
import ErrorHandler from '@components/common/errorHandler';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import usePageLoader from '@redux/hooks/usePageLoader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Regex } from '@redux/utils/regex';
import Image from 'next/image';
import EditOutlined from '@mui/icons-material/EditOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CommonModal from '@components/common/commonModel';
import { useRouter } from 'next/router';
import { LOGIN_TOKEN } from '@redux/Api/AuthApi';
import { tostify } from '@components/common/tostify';
import localStoreUtil from '@redux/Api/localstore.util';
const useStyles = makeStyles()(() => {
    return {
        labelBtn: {
            backgroundColor: "#F6F6F6",
            fontSize: "14px",
            padding: "10px 30px",
            borderRadius: "10px",
            marginTop: "19px",
            cursor: 'pointer'
        },
        phoneInput: {
            padding: "13px",
            height: "46px",
            width: "calc(100% - 52px)",
            borderRadius: "10px",
            border: "1px solid #EEEEEE",
            outline: 'none',
            marginLeft: 48,
            fontFamily: "Poppins"
        },
    };
});


const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must select something from the list'),
    country: Yup.string().required('You must select something from the list'),
    firstName: Yup.string().required('first name is required'),
    lastName: Yup.string().required('last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    state: Yup.string().required('City is required'),
    city: Yup.string()
        .required('City is required'),
    street: Yup.string()
        .required('Street is required'),
    postalCode: Yup.string()
        .required('postal Code is required'),
});
const title = ['Mr.', 'Mrs.', 'Ms.', 'Mx.']
// const country = ['India', 'Canada', 'Australia']
const country = CountryJson.countries.map(country => country.name);

const PersonalInformation = ({ isEmailVerfied }: any) => {
    const dispatch = useDispatch()
    const setFullPageLoader = usePageLoader();
    const { classes } = useStyles();
    const router = useRouter();
    const theme = useTheme()
    const [modal, setModel] = React.useState(false);
    const [isEmailVerifyModel, setIsEmailVerifyModel] = React.useState(false);
    const userDataLocal: any = localStorage.getItem('userData')
    const userData: any = JSON.parse(userDataLocal)
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [data, setData] = React.useState<any>({ title: title[2], country: country[0], isRememberMe: false });
    const [selectedImage, setSelectedImage] = React.useState<any>(null);

    const [error, setError] = React.useState<any>({});
    const [updateEmail, setUpdateEmail] = React.useState('');

    const formValidation = () => {
        let validFormValue = true;
        let errors: any = {};
        if (!data?.title) {
            validFormValue = false;
            errors["title"] = "*Please enter title";
        }
        if (!data?.firstName) {
            validFormValue = false;
            errors["firstName"] = "*Please enter first name";
        }
        if (!data?.lastName) {
            validFormValue = false;
            errors["lastName"] = "*Please enter last name";
        }
        if (!data?.email) {
            validFormValue = false;
            errors["email"] = "*Please enter email.";
        } else if (!data?.email?.match(Regex.emailRegex)) {
            validFormValue = false;
            errors["invalidEmail"] = "*Invalid email address";
        }

        // if (!data?.country) {
        //     validFormValue = false;
        //     errors["country"] = "*Please select country";
        // }
        if (!data?.state) {
            validFormValue = false;
            errors["state"] = "*Please enter state";
        }
        if (!data?.street) {
            validFormValue = false;
            errors["street"] = "*Please enter street";
        }
        if (!data?.city) {
            validFormValue = false;
            errors["city"] = "*Please enter city";
        }
        if (!data?.contactNumber) {
            validFormValue = false;
            errors["contactNumber"] = "*Please enter phone number";
        }

        setError(errors);
        return validFormValue;
    };

    const validateEmail = () => {
        let validFormValue = true;
        let errors: any = {};
        if (!updateEmail) {
            validFormValue = false;
            errors["updateEmail"] = "Please enter email.";
        } else if (!updateEmail?.match(Regex.emailRegex)) {
            validFormValue = false;
            errors["invalidEmail"] = "Invalid email address";
        }
        setError(errors);
        return validFormValue;
    }

    const validateOnChangeEmail = (updateEmail: any) => {
        let validFormValue = true;
        let errors: any = {};
        if (!updateEmail) {
            validFormValue = false;
            errors["updateEmail"] = "Please enter email.";
        } else if (!updateEmail?.match(Regex.emailRegex)) {
            validFormValue = false;
            errors["invalidEmail"] = "Invalid email address";
        }
        setError(errors);
        return validFormValue;
    }
    console.log(data, "dataaaaaaaaaaaa")

    const _getUserDetails = async () => {
        try {
            setFullPageLoader(true);
            const response = await dispatch(user_profile());
            const error = ErrorHandler(response)
            if (error) {
                const userData = response?.payload?.data || {};
                setData({
                    ...data,
                    countryCode: response?.payload?.data?.countryCode || "",
                    countryCode1: response?.payload?.data?.countryCode1 || "",
                    country: response?.payload?.data?.country || "",
                    contactNumber: response?.payload?.data?.phoneNumber ? response?.payload?.data?.phoneNumber?.trim(" ") : "",
                    email: response?.payload?.data?.email || "",
                    firstName: response?.payload?.data?.firstName || "",
                    lastName: response?.payload?.data?.lastName || "",
                    state: response?.payload?.data?.state || "",
                    city: response?.payload?.data?.city || "",
                    street: response?.payload?.data?.street || "",
                    postalCode: response?.payload?.data?.postalCode || "",
                    title: response?.payload?.data?.title || "",
                    image: response?.payload?.data?.image || "",
                    airWallexUserId: response?.payload?.data?.airWallexUserId
                });
                if (!response?.payload?.data?.email) {
                    setIsEmailVerifyModel(true)
                } else {
                    setIsEmailVerifyModel(false)
                }
                setFullPageLoader(false);
            } else {
                setFullPageLoader(false);
            }

        } catch (error: any) {
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT, });
            setFullPageLoader(false);
        }
    }

    const handleImageChange = async (val: any) => {
        const formData = new FormData();
        formData.append("image", val)
        try {
            let res = await dispatch(uploadImg(formData));
            if (res?.payload?.status === 200) {
                setSelectedImage(res?.payload?.data?.image)
            } else {
                toast.error('Incorrect email or password', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            toast.error('An error occurred during login', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setSelectedImage("")
        }
    };
    const handleSubmit = async () => {
        if (formValidation()) {
            setSubmitting(true);
            setFullPageLoader(true);
            const body: any = {
                // email: values.email,
                firstName: data?.firstName,
                lastName: data?.lastName,
                phoneNumber: data?.contactNumber,
                state: data?.state,
                city: data?.city,
                street: data?.street,
                postalCode: data?.postalCode,
                title: data?.title,
                country: data?.countryName,
                countryCode1: data?.countryCode1,
                countryCode: data?.countryCode,
                // image: selectedImage === null ? data?.image : selectedImage,
                airWallexUserId: data?.airWallexUserId
            };
            if ((selectedImage !== null && selectedImage !== "") || (data?.image !== null && data?.image !== "")) {
                (body.image = selectedImage === null ? data?.image as string : selectedImage)
            }
            try {
                const res = await dispatch(userUpdate(body));
                if (res?.payload?.status === 200) {
                    toast.success(res?.payload?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    localStorage.setItem('userData', JSON.stringify(res?.payload?.data))
                } else {
                    toast.error(res.payload.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                setFullPageLoader(false);
            } catch (error) {
                toast.error('An error occurred during login', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setFullPageLoader(false);
            }
            setSubmitting(false);
            setFullPageLoader(false);
        }
    };

    const handleEditEmail = async () => {
        if (validateEmail()) {
            const body = { oldEmail: data.email, newEmail: updateEmail }
            try {
                const res = await dispatch(change_email_verification(body));
                if (res?.payload?.status === 200) {
                    toast.success(res?.payload?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setModel(false)
                    // localStorage.setItem('userData', JSON.stringify(res?.payload?.data))
                    setFullPageLoader(false);
                } else {
                    toast.error(res.payload.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setFullPageLoader(false);
                    setModel(false)
                }
            } catch (error) {
                toast.error('An error occurred during login', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setModel(false)
                setFullPageLoader(false);
            }
        }
    }

    const updateAndVerifyEmail = async () => {
        if (validateEmail()) {
            setFullPageLoader(true);

            let login_token = await localStoreUtil.get_data(LOGIN_TOKEN);
            try {
                let body: any = {
                    token: login_token,
                    email: updateEmail
                }
                const response = await dispatch(social_login_change_email_verification(body));
                const error = ErrorHandler(response);
                if (error) {
                    tostify('Verification mail has been sent to your email', "success")
                    router.push({
                        pathname: '/emailVerification',
                        query: { email: updateEmail }
                    })
                }
                setFullPageLoader(false);

            } catch (error: any) {
                tostify(`An error occurred during email verification`, "error")
                setFullPageLoader(false);
            }
        }
    }

    useEffect(() => {
        _getUserDetails()
    }, [])

    return (
        < >
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <MUIButton
                    onClick={handleSubmit}
                    fullWidth={true}
                    height="42px"
                    width="160px"
                    text="Update"
                    marginTop={-7.5}
                    marginBottom={0}
                />
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={9} sx={{ order: { lg: 1, md: 1, sm: 2, xs: 2 } }}>
                    <PaperContainer title={"Client"}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    text="First Name"
                                    size="medium"
                                    type="text"
                                    name="firstName"
                                    value={data?.firstName}
                                    onChange={(e: any) => { setData({ ...data, firstName: e.target.value }) }}
                                    width="100%"
                                />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.firstName ? error?.firstName : " "} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    text="Last Name"
                                    size="medium"
                                    type="text"
                                    name="lastName"
                                    value={data?.lastName}
                                    onChange={(e: any) => { setData({ ...data, lastName: e.target.value }) }}
                                    width="100%"
                                />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.lastName ? error?.lastName : " "} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <SelectDropDown
                                        text="Title"
                                        width={'100%'}
                                        size="medium"
                                        values={title || []}
                                        name="title"
                                        value={data?.title}
                                        onChange={(e: any) => { setData({ ...data, title: e.target.value }) }}
                                        backgroundColor={'transparent'}
                                        color={'#333333'}
                                    />
                                    <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.title ? error?.title : " "} />

                                </Box>
                            </Grid>
                        </Grid>
                    </PaperContainer>
                </Grid>
                <Grid item xs={12} sm={12} lg={3} md={4} style={{ order: 1 }}>
                    <PaperContainer padding={'22px 30px'} textAlign={"center"}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Avatar sx={{ width: 84, height: 84, margin: "0 auto" }} alt={data?.firstName} src={selectedImage ? "https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/" + selectedImage : "https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/" + data?.image} />
                            <Box htmlFor="image-upload" component={'label'} style={{ display: "inline-block", cursor: 'pointer' }}>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    // onChange={handleImageChange}
                                    onChange={(e: any) => { handleImageChange(e?.target?.files[0]) }}
                                />
                                <ModeEditOutlineOutlinedIcon color='primary' style={{ borderRadius: '50%', border: `1px solid ${theme.palette.primary.main}`, height: '20px', width: '20px', padding: 2 }} />
                            </Box>
                            <TextLabel marginTop={"8px"} fontWeight="600" variant={"subtitle2"} title={`${data?.firstName || "-"} ${data?.lastName || ""}`} textAlign={"center"} />
                            <TextLabel variant={"body1"} title={data?.email || "-"} textAlign={"center"} />

                        </Box>

                    </PaperContainer>
                </Grid>
                <Grid item xs={12} style={{ order: 3 }}>
                    <PaperContainer title={"Contact Info"} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextLabel fontSize="14px" title={'Contact Number'} marginBottom={5} />
                                {/* <PhoneInput
                                    country={'hk'}
                                    value={data?.countryCode + data?.contactNumber}
                                    onChange={(value: any, country: any, e, formattedValue) => {
                                        const [code, number] = formattedValue.split(' ');
                                        setData({ ...data, countryCode: code, contactNumber: formattedValue?.replace(code, ""), countryCode1: country?.countryCode, countryName: country?.name })
                                    }}
                                    inputProps={{ required: true, className: classes.phoneInput }}
                                    placeholder='Contact Number'
                                /> */}
                                <PhoneInput
                                    country={'hk'}
                                    value={(data?.countryCode && data?.contactNumber) && data?.countryCode + data?.contactNumber}
                                    onChange={(value: any, country: any, e, formattedValue: any) => {
                                        const [code, number] = formattedValue.split(' ');

                                        // Ensure that formattedValue is a string before using replace
                                        const formattedValueString = typeof formattedValue === 'string' ? formattedValue : formattedValue?.toString() || '';

                                        // Use replace on the string
                                        const updatedNumber = formattedValueString.replace(code, '');

                                        setData({
                                            ...data,
                                            countryCode: code,
                                            contactNumber: updatedNumber,
                                            countryCode1: country?.countryCode,
                                            countryName: country?.name
                                        });
                                    }}
                                    inputProps={{ required: true, className: classes.phoneInput }}
                                    placeholder='Contact Number'
                                />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.contactNumber ? error?.contactNumber : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Grid position="relative">
                                    <CommonTextField
                                        text="E-mail Address"
                                        size="medium"
                                        type="text"
                                        name="email"
                                        value={data?.email}
                                        onChange={(e: any) => { setData({ ...data, email: e.target.value }) }}
                                        width="100%"
                                        disabled
                                    />
                                    <EditOutlined sx={{ fontSize: "18px", position: 'absolute', right: 15, bottom: 15 }} onClick={() => { setModel(true); }} />
                                </Grid>
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.email ? error?.email : " "} />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={data?.email && data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                                <SelectDropDown
                                    text="Country"
                                    values={country || []}
                                    name="country"
                                    value={data?.country}
                                    onChange={(e: any) => { setData({ ...data, country: e.target.value }) }}
                                    width={"100%"}
                                    size="medium"
                                />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.country ? error?.country : " "} />
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    text="State"
                                    size="medium"
                                    type="text"
                                    name="state"
                                    value={data?.state}
                                    onChange={(e: any) => { setData({ ...data, state: e.target.value }) }}
                                    width="100%"
                                />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.state ? error?.state : " "} />

                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    text="City"
                                    size="medium"
                                    type="text"
                                    name="city"
                                    value={data?.city}
                                    onChange={(e: any) => { setData({ ...data, city: e.target.value }) }}
                                    width="100%"
                                />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.city ? error?.city : " "} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    text="Street"
                                    size="medium"
                                    type="text"
                                    name="street"
                                    value={data?.street}
                                    onChange={(e: any) => { setData({ ...data, street: e.target.value }) }}
                                    width="100%"
                                />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.street ? error?.street : " "} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    text="Postal Code"
                                    size="medium"
                                    type="text"
                                    inputMode="numeric"
                                    name="postalCode"
                                    value={data?.postalCode}
                                    //   onChange={(e: any) => { setData({ ...data, postalCode: e.target.value }) }}
                                    onChange={(e: any) => {
                                        const isValidPostalCode = /^[0-9]+$/.test(e.target.value);

                                        if (isValidPostalCode || e.target.value === "") {
                                            setData({ ...data, postalCode: e.target.value });
                                        }
                                    }}
                                    width="100%"
                                />
                                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.postalCode ? error?.postalCode : " "} />
                            </Grid>
                        </Grid>
                    </PaperContainer>
                </Grid>
                <Grid item xs={12} style={{ order: 4 }}>
                    <MUIAlert icon={false} variant="outlined" fontSize='14px' severity="success" description="Please be aware that the registration is non-transferable and can't be changed to another person. Changes in your credentials can only be accepted in cases where you change your address or officially have your own name changed (e.g. in case of a marriage). Attempts to transfer the account to another person contradict the T&Cs and can be seen as a fraudulent attempt leading to a suspension of your registration." />
                </Grid>
            </Grid>
            <CommonModal
                // sx={{ padding: 0 }}
                dialogSx={{ padding: 0 }}
                open={modal}
                onClose={() => setModel(false)}
                title={`${data?.email ? "Edit Email" : "Verify email"} `}>
                <>
                    <Box p={2}>
                        <TextLabel variant="body1" fontSize="12px" color="error" title={'An email with instructions to verify your email address has been sent to your email address'} />
                    </Box>
                    <Box p={2}>
                        <CommonTextField
                            text="E-mail Address"
                            size="medium"
                            type="text"
                            name="email"
                            value={updateEmail}
                            onChange={(e: any) => {
                                validateOnChangeEmail(e.target.value)
                                setUpdateEmail(e.target.value);
                            }}
                            width="100%"
                        />
                        <TextLabel variant="caption" fontSize="12px" color="error" title={!updateEmail ? error?.updateEmail : " "} />
                        <TextLabel variant="caption" fontSize="12px" color="error" title={updateEmail && updateEmail?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", paddingLeft: 2, paddingRight: 2, paddingBottom: 2 }}>
                        <MUIButton
                            onClick={handleEditEmail}
                            fullWidth={true}
                            height="42px"
                            width="320px"
                            text="Save"
                        // marginTop={8}
                        />
                    </Box>
                </>
            </CommonModal>
            <CommonModal
                dialogSx={{ padding: 0 }}
                open={isEmailVerifyModel}
                // onClose={() => setIsEmailVerifyModel(true)}
                title={"Verify your email"}>
                <>
                    <Box p={2}>
                        <TextLabel variant="subtitle2" fontSize="12px" color="primary" title={'An email with instructions to verify your email address has been sent to your email address !!'} />
                    </Box>
                    <Box p={2}>
                        <CommonTextField
                            text="E-mail Address"
                            size="medium"
                            type="text"
                            name="email"
                            value={updateEmail}
                            onChange={(e: any) => {
                                validateOnChangeEmail(e.target.value)
                                setUpdateEmail(e.target.value);
                            }}
                            width="100%"
                            placeholder='Please enter email.'
                        />
                        <TextLabel variant="caption" fontSize="12px" color="error" title={!updateEmail ? error?.updateEmail : " "} />
                        <TextLabel variant="caption" fontSize="12px" color="error" title={updateEmail && updateEmail?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", paddingLeft: 2, paddingRight: 2, paddingBottom: 2 }}>
                        <MUIButton
                            onClick={updateAndVerifyEmail}
                            fullWidth={true}
                            height="42px"
                            width="320px"
                            text="Verify"
                        />
                    </Box>
                </>
            </CommonModal>
            <FooterContent />

        </ >
    )
}

export default PersonalInformation