import React, { useEffect } from 'react'
import { Box, Grid, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, tableCellClasses, Typography, Card, Button, useTheme, Dialog } from "@mui/material";
import TextLabel from '@components/common/commonTextLabel';
import { styled } from "@mui/material/styles";
import MUIButton from '@components/common/commonButton';
import { useRouter } from 'next/router';
import { makeStyles } from "tss-react/mui";
import ContractStep2 from './contractStep2';
import ContractStep3 from './contractStep3';
import ContractStep4 from './contractStep4';
import ContractStep5 from './contractStep5';
import ContractStep6 from './contractStep6';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import usePageLoader from '@redux/hooks/usePageLoader';
import { deleteImg, get_kyc_verificationById, update_kyc_verification, uploadImg, user_profile } from '@redux/Redux/Actions';
import { useDispatch } from 'react-redux';
import ErrorHandler from '@components/common/errorHandler';
import { toast } from 'react-toastify';
// import { addDocument, createAccessToken, createApplicant, getApplicantStatus } from '@redux/utils/kycUtils';
import CountryJson from '../../Assets/json/CountryJson.json';
import MUIAlert from '@components/common/commonAlertBox';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    };
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        padding: 8
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 5,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "& th, & td": {
        whiteSpace: "nowrap",
    },
    "&:nth-of-type(odd)": {
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));



function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad', 'Create an ad', 'Create an ad', 'Create an ad'];
}

const countries = CountryJson.countries.map(country => country.name);
const Contracts = () => {
    //Hooks
    const router = useRouter();
    const { classes } = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()

    const setFullPageLoader = usePageLoader();

    //State
    const [isConfirmModel, setIsConfirmModel] = React.useState<boolean>(false)
    const [activeStep, setActiveStep] = React.useState(0);
    const [contractDetails, setContractDetails] = React.useState<any>([]);
    const [userDetails, setUserDetails] = React.useState<any>([]);
    const [errors, setError] = React.useState<any>({});
    const [data, setData] = React.useState<any>({
        credentialType: "Personal",
        documentType: "ID card / Driving licence",
        country: countries[0],
        step4QuestionsList: [
            {
                type: 'text',
                text: 'What do you think is the key for long term success in trading?',
                answer: ''
            },
            {
                type: 'text',
                text: 'Describe your best trade',
                answer: ''
            },
            {
                type: 'text',
                text: 'What was the hardest obstacle on your trading journey?',
                answer: ''
            },
            {
                type: 'text',
                text: 'Do you plan to take another Dot Point Challenge to manage even bigger capital?',
                answer: ''
            },
            {
                type: 'text',
                text: 'What was more difficult than expected during your Challlenge or Verification?',
                answer: ''
            },
            {
                type: 'text',
                text: 'One Piece of advice for people starting the Challenge now.',
                answer: ''
            },
            {
                type: 'file',
                text: 'Attach your photo',
                subText: 'Reader usually want to see the trader who is behind the success! Please send us your photo and we will add it to the  article.This is not required.',
                answer: ''
            },
        ],

    })
    const steps = getSteps();

    console.log(contractDetails, "contractDetails")
    // Calculate age
    const dobDate = new Date(data.dateOfBirth);
    const today = new Date();

    const age = today.getFullYear() - dobDate.getFullYear();
    console.log(data, errors, activeStep, "datadatadata")

    const validate = () => {
        let errors: any = {};
        let formIsValid = true;

        if (activeStep === 1) {
            if (!data?.firstName) {
                formIsValid = false;
                errors["firstName"] = "*Please enter first name";
            }
            // if (!data?.middleName) {
            //     formIsValid = false;
            //     errors["middleName"] = "*Please enter middle name";
            // }
            if (!data?.surname) {
                formIsValid = false;
                errors["surname"] = "*Please enter surname";
            }
            if (!data?.dateOfBirth) {
                formIsValid = false;
                errors["dateOfBirth"] = "*Please enter date of birth";
            }

            if (data?.dateOfBirth && age < 18) {
                formIsValid = false;
                errors["dateOfBirth"] = "*You must be 18 years or older";
            }
            if (!data?.street) {
                formIsValid = false;
                errors["street"] = "*Please enter street";
            }
            if (!data?.city) {
                formIsValid = false;
                errors["city"] = "*Please enter city";
            }

            if (!data?.zipCode) {
                formIsValid = false;
                errors["zipCode"] = "*Please enter zipCode";
            }
            if (!data?.country) {
                formIsValid = false;
                errors["country"] = "*Please enter country";
            }

        }

        if (activeStep === 2) {
            if (!data?.frontSideDoc) {
                formIsValid = false;
                errors["frontSideDoc"] = "*Please upload front document.";
            }
            if (data?.documentType !== 'Passport') {
                if (!data?.backSideDoc) {
                    formIsValid = false;
                    errors["backSideDoc"] = "*Please upload back document.";
                }
            }
            if (!data?.selfieDoc) {
                formIsValid = false;
                errors["selfieDoc"] = "*Please upload selfie document.";
            }
            if (!data?.documentType) {
                formIsValid = false;
                errors["documentType"] = "*Please select document type.";
            }
            if (!data?.addressProofDoc) {
                formIsValid = false;
                errors["addressProofDoc"] = "*Please upload address proof.";
            }
        }

        if (activeStep === 3) {
            data?.step4QuestionsList.forEach((question: any, index: any) => {
                console.log(question, "question")
                if (!data?.step4QuestionsList[index]?.answer) {
                    formIsValid = false;
                    errors[`answer[${index}]`] = question?.type === "file" ? "*Please upload your photo" : "*Please provide an answer";
                }
            });

            if (!data?.isQuestionAgree) {
                formIsValid = false;
                errors["isQuestionAgree"] = " ";
            }
            if (!data?.isPolicyAgree) {
                formIsValid = false;
                errors["isPolicyAgree"] = " ";
            }
        }
        if (activeStep === 4) {
            if (!data?.note) {
                formIsValid = false;
                errors["note"] = "*please provide brief note";
            }
        }
        if (activeStep === 5) {
            if (!data?.isAccountAgreement) {
                formIsValid = false;
                errors["isAccountAgreement"] = " ";
            }
        }

        setError(errors);

        return formIsValid;
    }

    const handleStep4Questions = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: any) => {
        const updatedQuestionsList = [...data.step4QuestionsList];

        if (type == "text") {
            updatedQuestionsList[index].answer = e.target.value;
        } else {
            const file: any = e.target.files && e.target.files[0];
            if (file?.size <= 10000000) {
                if (file) {
                    updatedQuestionsList[index].answer = file;
                }
            }
            handleImageUpload(file, e.target?.name, index)
        }
        setData({ ...data, step4QuestionsList: updatedQuestionsList });
    }

    const handleNext = () => {
        if (validate()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleFinal = () => {
        if (validate()) {
            setIsConfirmModel(true)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // const checkKYCVerification = async () => {
    //     let response: any;
    //     const externalUserId = "random-JSToken-" + Math.random().toString(36).substr(2, 9);
    //     const levelName = 'basic-kyc-level';

    //     response = await axios(createApplicant(externalUserId, levelName))
    //         .then((response) => {
    //             return response;
    //         })
    //         .catch((error) => {
    //             console.log("Error:\n", error.response.data);
    //         });

    //     const applicantId = response.data.id;

    //     response = await axios(addDocument(applicantId))
    //         .then((response) => {
    //             return response;
    //         })
    //         .catch((error) => {
    //             console.log("Error:\n", error.response.data);
    //         });

    //     response = await axios(getApplicantStatus(applicantId))
    //         .then((response) => {
    //             return response;
    //         })
    //         .catch((error) => {
    //             console.log("Error:\n", error.response.data);
    //         });

    //     response = await axios(createAccessToken(externalUserId, levelName, 1200))
    //         .then((response) => {
    //             return response;
    //         })
    //         .catch((error) => {
    //             console.log("Error:\n", error.response.data);
    //         });
    // }

    const handleImageUpload = async (file: any, name: any, index?: any) => {
        // checkKYCVerification()

        if (file?.size <= 10000000) {
            const updatedQuestionsList = [...data.step4QuestionsList];
            const formData = new FormData();
            formData.append("image", file)
            setFullPageLoader(true)
            try {
                let res = await dispatch(uploadImg(formData));
                const error = ErrorHandler(res)
                if (error) {
                    if (name === "uploadPhoto") {
                        const updatedQuestionsList = [...data.step4QuestionsList];
                        updatedQuestionsList[index].answer = res?.payload?.data?.image;
                    }
                    setData({ ...data, step4QuestionsList: updatedQuestionsList });
                }
                setData({ ...data, [name]: res?.payload?.data?.image })
                setFullPageLoader(false)
            } catch (error) {
                toast.error('An error occurred during upload Image', { position: toast.POSITION.TOP_RIGHT, });
                setFullPageLoader(false)

            }
        } else {
            toast.error('Upload image allowed size is 10MB', { position: toast.POSITION.TOP_RIGHT, });
        }
    };
    const validateStep = () => {

    }
    const _updateKYCVerification = async () => {
        // if (validate()) {
        try {
            setFullPageLoader(true);
            let body: any = {
                "credentialType": data?.credentialType,
                "firstName": data?.firstName,
                "middleName": data?.middleName || "",
                "surname": data?.surname,
                "dob": data?.dateOfBirth || "",
                "street": data?.street,
                "city": data?.city,
                "zipcode": data?.zipcode,
                "country": data?.country,
                "documentType": data?.documentType,
                "frontSideDoc": data?.frontSideDoc,
                "backSideDoc": data?.backSideDoc,
                "selfieDoc": data?.selfieDoc,
                "addressProofDoc": data?.addressProofDoc,
                "step4QuestionsList": data?.step4QuestionsList,
                "isQuestionAgree": data?.isQuestionAgree,
                "isPolicyAgree": data?.isPolicyAgree,
                "note": data?.note,
                "accountAgree": data?.isAccountAgreement,
                status: 0
            }
            if (data?.id) {
                body._id = data?.id
            }
            const response = await dispatch(update_kyc_verification(body));
            const error = ErrorHandler(response)
            if (error) {
                toast.success(response?.payload?.message, { position: toast.POSITION.TOP_RIGHT, });
                _getKYCVerificationById()
                router.push('/traders')
                setIsConfirmModel(false)
                setFullPageLoader(false);
                setActiveStep(0)
            } else {
                setFullPageLoader(false);
            }
        } catch (error: any) {
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT, });
            setFullPageLoader(false);
        }
        // }

    }

    const _deleteImg = async (url: any, index?: any, name?: any) => {
        try {
            setFullPageLoader(true);
            const response = await dispatch(deleteImg({ "url": url }));
            const error = ErrorHandler(response)
            if (error) {
                if (name === "uploadPhoto") {
                    const updatedQuestionsList = [...data.step4QuestionsList];
                    updatedQuestionsList[index].answer = "";
                    setData({ ...data, step4QuestionsList: updatedQuestionsList });

                } else {
                    setData({ ...data, [name]: "" });
                }
                toast.success(response.message, { position: toast.POSITION.TOP_RIGHT, });
                setFullPageLoader(false);
            } else {
                setFullPageLoader(false);
            }
        } catch (error: any) {
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT, });
            setFullPageLoader(false);
        }
    }


    const _getKYCVerificationById = async () => {
        try {
            setFullPageLoader(true);
            const response = await dispatch(get_kyc_verificationById());
            const error = ErrorHandler(response)
            if (error) {
                setContractDetails(response?.payload?.data)
                setFullPageLoader(false);
            } else {
                setFullPageLoader(false);
            }
        } catch (error: any) {
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT, });
            setFullPageLoader(false);
        }
    }
    function getStepContent(step: any) {
        switch (step + 1) {
            case 2:
                return <ContractStep2 activeStep={activeStep + 1} data={data} setData={setData} countries={countries} errors={errors} age={age} />;
            case 3:
                return <ContractStep3 activeStep={activeStep + 1} data={data} setData={setData} handleImageUpload={handleImageUpload} deleteImg={_deleteImg} errors={errors} />;
            case 4:
                return <ContractStep4 activeStep={activeStep + 1} data={data} setData={setData} handleStep4Questions={handleStep4Questions} deleteImg={_deleteImg} errors={errors} />;
            case 5:
                return <ContractStep5 activeStep={activeStep + 1} data={data} setData={setData} errors={errors} />;
            case 6:
                return <ContractStep6 activeStep={activeStep + 1} data={data} setData={setData} setIsConfirmModel={setIsConfirmModel} errors={errors} />;
            default:
                return 'default'
        }
    }


    const _getUserDetails = async () => {
        try {
            setFullPageLoader(true);
            const response = await dispatch(user_profile());
            const error = ErrorHandler(response)
            if (error) {
                setUserDetails(response.payload.data)
                setFullPageLoader(false);
            } else {
                setFullPageLoader(false);
            }
        } catch (error: any) {
            toast.success(error.message, { position: toast.POSITION.TOP_RIGHT, });
            setFullPageLoader(false);
        }
    }

    React.useEffect(() => {
        if (contractDetails || userDetails) {
            console.log(contractDetails?.addressProofDoc, "contractDetails?.addressProofDoc")
            setData({
                ...data,
                id: contractDetails?._id,
                credentialType: contractDetails?.credentialType,
                documentType: contractDetails?.documentType,
                firstName: contractDetails?.firstName ? contractDetails?.firstName : userDetails?.firstName,
                middleName: contractDetails?.middleName,
                surname: contractDetails?.surname ? contractDetails?.surname : userDetails?.lastName,
                dateOfBirth: contractDetails?.dob,
                street: contractDetails?.street ? contractDetails?.street : userDetails?.street,
                city: contractDetails?.city ? contractDetails?.city : userDetails?.city,
                zipCode: contractDetails?.zipcode ? contractDetails?.zipcode : userDetails?.postalCode,
                country: contractDetails?.country ? contractDetails?.country : userDetails?.country,
                frontSideDoc: contractDetails?.frontSideDoc,
                backSideDoc: contractDetails?.backSideDoc,
                selfieDoc: contractDetails?.selfieDoc,
                addressProofDoc: contractDetails?.addressProofDoc,
                step4QuestionsList: contractDetails?.step4QuestionsList?.length > 0 ? contractDetails?.step4QuestionsList : data?.step4QuestionsList,
                isQuestionAgree: contractDetails?.isQuestionAgree,
                isPolicyAgree: contractDetails?.isPolicyAgree,
                note: contractDetails?.note,
                isAccountAgreement: contractDetails?.accountAgree,
            })
        }
    }, [contractDetails, userDetails])

    useEffect(() => {
        _getKYCVerificationById()
    }, [])

    useEffect(() => {
        _getUserDetails()
    }, [])

    return (
        <Grid container spacing={5}>
            {activeStep === 0 && <>
                <Grid item xs={12}>
                    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={1}>
                        <TextLabel
                            variant='h3'
                            fontWeight="500"
                            title="Dot Point Trader Contract(s)"
                        />
                        <TextLabel
                            variant='body1'
                            fontWeight="400"
                            title="Once you pass the Verification and we perform routine checks on your track record, you will be able to fill out the contract form. You will also be able to track the progress of your contract's processing after completing the form, as well as download it."
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Card elevation={2} sx={{ padding: 2 }} variant='outlined'>
                        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={2}>
                            {contractDetails?.status === 0 || contractDetails?.status === 2 ?
                                <>
                                    <TextLabel
                                        variant='h4'
                                        fontWeight="500"
                                        title="Contract(s) awaiting your action"
                                    />
                                    <TextLabel
                                        variant='body1'
                                        fontWeight="400"
                                        title="Please fill out the contract form(s), read through the contract preview, and confirm your acceptance so we can finalize the contract and send you your new Dot Point Account."
                                    />
                                    <TableContainer sx={{ marginBottom: "30px" }}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center" style={{ color: "#0099CB", fontSize: "16px", fontWeight: 600 }}>
                                                        Verification
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" style={{ color: "#0099CB", fontSize: "16px", fontWeight: 600 }}>
                                                        Order number
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" style={{ color: "#0099CB", fontSize: "16px", fontWeight: 600 }}>
                                                        Status
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" style={{ color: "#0099CB", fontSize: "16px", fontWeight: 600 }}>
                                                        Action
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 }, }}
                                                >
                                                    <StyledTableCell component="th" scope="row" align="center">
                                                        {contractDetails?.verificationNo}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {contractDetails?.orderNo}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Typography variant='body2' color={contractDetails?.status === 0 ? "primary" : theme.palette.error.main} fontWeight={500}>{contractDetails?.status === 0 ? "Pending" : "Rejected"} </Typography>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <MUIButton
                                                            fullWidth={true}
                                                            height="40px"
                                                            width="140px"
                                                            text={contractDetails?.status === 2 ? "Verify again" : "Proceed"}
                                                            fontSize="14px"
                                                            fontWeight="600"
                                                            onClick={() => {
                                                                handleNext()
                                                            }}
                                                        />
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                                : contractDetails?.status === null ?
                                    <Box width={'100%'} >
                                        <MUIAlert icon={<ReportGmailerrorredIcon fontSize='medium' />} variant="outlined" fontSize='14px' severity="warning" description="Contarct details will be shown after your challenge will be complete" />
                                    </Box>
                                    : contractDetails?.status === 3 ?
                                        <Box width={'100%'} >
                                            <MUIAlert icon={<HourglassBottomIcon fontSize='medium' />} variant="outlined" fontSize='14px' severity="info" description="Thank you for submitting your KYC documents and the Dot Point Trader Contract. Our administrative team is currently reviewing your submission. We will notify you as soon as there is an update on the status of your application. The review process typically takes 2-3 business days. We appreciate your patience." />
                                        </Box>
                                        : contractDetails?.status === 1 ?
                                            <Box width={'100%'} >
                                                <MUIAlert icon={<CheckCircleIcon fontSize='medium' />} variant="outlined" fontSize='14px' severity="success" description="Thank you for your patience.your KYC Verification is successfully approved." />
                                            </Box> : ""
                            }
                        </Box>
                    </Card>
                </Grid>
            </>
            }
            {activeStep !== 0 &&
                <Grid item xs={12}>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <Box>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <Box display={'flex'} justifyContent={'space-between'} gap={2} marginTop={2}>
                                <MUIButton
                                    fullWidth={true}
                                    height="44px"
                                    backgroundColor={theme.palette.error.main}
                                    hoverBgColor={theme.palette.error.main}
                                    text={"Previous step"}
                                    fontSize="14px"
                                    fontWeight="600"
                                    onClick={handleBack}
                                    disabled={activeStep === 1}
                                    borderRadius={'0px'}
                                />
                                <MUIButton
                                    fullWidth={true}
                                    height="44px"
                                    text={activeStep === steps.length - 1 ? 'I agree with the Dot Point Account Agreement' : 'Go to next step'}
                                    fontSize="14px"
                                    fontWeight="600"
                                    onClick={activeStep === steps.length - 1 ? handleFinal : handleNext}
                                    borderRadius={'0px'}
                                />
                            </Box>
                        </Box>
                    )}
                </Grid>
            }
            {isConfirmModel &&
                <Dialog
                    fullWidth
                    onClose={() => { setIsConfirmModel(false) }}
                    open={isConfirmModel}
                    maxWidth={'sm'}
                >
                    <Grid container xs={12} spacing={2} padding={'10px 10px 10px 20px'} >
                        <Grid item xs={12}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <ErrorOutlineOutlinedIcon style={{ fontSize: '6rem', color: theme.palette.info.main }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextLabel
                                variant='subtitle2'
                                fontWeight="400"
                                title="This is the final step and once you confirm the information, you won't be able to make any changes."
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextLabel
                                color={theme.palette.bgBlack.main}
                                variant='body1'
                                fontWeight="400"
                                title="“some changes (for example change of Dot Point Account Agreement from personal registration to company) can be made in the future through direct communication with Dot Point at support@dotpointcapital.com ”" />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <MUIButton
                                    backgroundColor={theme.palette.defaultBgGreen.main}
                                    hoverBgColor={theme.palette.defaultBgGreen.main}
                                    fullWidth={true}
                                    height="44px"
                                    width={'380px'}
                                    text={<Typography variant='body2' fontSize={'12px'} p={2}>I confirm all information is correct and I accept the Dot Point Account Agreement</Typography>}
                                    fontWeight="600"
                                    onClick={() => {
                                        _updateKYCVerification()
                                    }}
                                    borderRadius={'2px'}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <MUIButton
                                    backgroundColor={theme.palette.defultError.main}
                                    hoverBgColor={theme.palette.defultError.main}
                                    fullWidth={true}
                                    height="44px"
                                    text={<Typography variant='body2'>Go Back</Typography>}
                                    fontSize="14px"
                                    fontWeight="600"
                                    onClick={() => { setIsConfirmModel(false) }}
                                    borderRadius={'2px'}
                                    width={'140px'}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Dialog>
            }

        </Grid>
    )
}

export default Contracts