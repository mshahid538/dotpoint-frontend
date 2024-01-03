import React from 'react'
import { Box, Grid, Card, useTheme, Alert } from "@mui/material";
import TextLabel from '@components/common/commonTextLabel';
import CheckIcon from '@mui/icons-material/Check';
import CommonTextField from '@components/common/commonTextField';
import OutlinedCheckbox from '@components/common/commonCheckBox';
import Assets from '@components/common/image_container';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ContractStep4 = ({ activeStep, data, setData, handleStep4Questions, deleteImg, errors }: any) => {
    //Hooks
    const theme = useTheme()

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
                <Alert severity="success" component={'div'} icon={<CheckIcon fontSize='large' sx={{ color: theme.palette.bgWhite.main, fontWeight: 600 }} />} sx={{ color: theme.palette.bgWhite.main, bgcolor: theme.palette.defaultBgGreen.main, padding: 1, alignItems: 'center' }} >
                    Step {activeStep - 1} : Upload your documents - Completed
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
                        fontWeight="500"
                        title={`We'd love to know you more`}
                    />
                    <TextLabel
                        // textAlign='center'
                        variant='subtitle2'
                        fontWeight="400"
                        title={'Since you are joining a team of our experienced traders, we would like to know a bit more about you and your experience with us so far.Let us know anything you consider important about your trading. You can inspire other traders with your answers ond help them achieve their desired profitabiity.'}
                    />
                </Box>
                <TextLabel
                    // textAlign='center'
                    variant='body2'
                    fontWeight="400"
                    title={'*The information you provide will not be published unless you give us your expicit consent below.'}
                />
            </Grid>
            {data?.step4QuestionsList?.map((ques: any, index: number) => {
                const errorKey = `answer[${index}]`;
                return <Grid item xs={12} key={index}>
                    <Grid container item xs={12} spacing={3} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Card sx={{ padding: 2, width: '500px' }} variant='outlined' >
                            <Grid item xs={12}>
                                {ques?.type === 'file' ? (
                                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                                        <TextLabel textAlign='center' variant='body1' fontWeight="500" title={ques?.text} />
                                        <TextLabel
                                            variant='body1'
                                            fontWeight="400"
                                            title={ques?.subText}
                                        />
                                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                                            <Box display={'flex'} gap={5}>

                                                {ques?.answer ?
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
                                                        <Assets src={`https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/${ques?.answer}`} absolutePath={true} height='100px' width='100px' style={{ border: `1px solid ${theme.palette.bgGray.main}`, borderRadius: '50%' }} />
                                                        <TextLabel variant="body2" fontWeight="400" title={'Delete photo'} marginTop="2px" color={theme.palette.defultError.main} />
                                                        <Box
                                                            display={"flex"}
                                                            alignItems={"center"}
                                                            justifyContent={"center"}
                                                            width={20}
                                                            height={20}
                                                            borderRadius={'50%'}
                                                            sx={{ backgroundColor: theme.palette.defultError.main, cursor: "pointer" }}
                                                            onClick={(e: any) => deleteImg(ques?.answer, index, 'uploadPhoto')}
                                                        >
                                                            <CloseOutlinedIcon sx={{ color: "#fff", fontSize: "18px" }} />
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <>
                                                        <input
                                                            type="file"
                                                            onChange={(e: any) => handleStep4Questions(e, index, ques.type)}
                                                            style={{ border: `1px solid ${theme.palette.bgGray.main}`, padding: 12 }}
                                                            name='uploadPhoto'
                                                            accept="image/png,image/jpeg,image/jpg"
                                                            alt={ques?.answer}
                                                            onClick={(e: any) => {
                                                                e.target.value = null;
                                                            }}
                                                        />
                                                    </>
                                                }
                                            </Box>
                                            <TextLabel variant="body2" fontWeight="400" title={'*Maximum allowed size is 10MB'} marginTop="2px" />
                                            <TextLabel variant="caption" fontSize="11px" color="error" title={!ques?.answer ? errors?.[errorKey] : ""} />
                                        </Box>
                                    </Box>

                                ) : (
                                    <>
                                        <TextLabel
                                            variant='body1'
                                            fontWeight="500"
                                            title={ques?.text}
                                        />
                                        <CommonTextField
                                            width={'100%'}
                                            type={ques?.type}
                                            name={ques?.text}
                                            size="medium"
                                            textSize='14px'
                                            onChange={(e: any) => handleStep4Questions(e, index, ques.type)}
                                            multiline={ques?.type === "file" ? false : true}
                                            rows={2}
                                            fontWeight='500'
                                            value={ques?.answer}
                                        />
                                        <TextLabel variant="caption" fontSize="11px" color="error" title={!ques?.answer ? errors?.[errorKey] : ""} />

                                    </>
                                )}
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            })}
            <Grid item xs={12}>
                <OutlinedCheckbox
                    color={theme.palette.bgBlack.main}
                    label={"I agree with possible publishing of an article containing my first name, answers above and my photograph on the Dot Point blog (Optional)"}
                    name={'isQuestionAgree'}
                    handleSelect={(e: any) => {
                        setData({ ...data, isQuestionAgree: e?.target?.checked })
                    }}
                    value={data?.isQuestionAgree}
                    selected={data?.isQuestionAgree}
                    error={errors.isQuestionAgree}
                />
                <OutlinedCheckbox
                    color={theme.palette.bgBlack.main}
                    label={"I agree with the data processing according to Dot Point Privacy Policy."}
                    name={'isPolicyAgree'}
                    handleSelect={(e: any) => {
                        setData({ ...data, isPolicyAgree: e?.target?.checked })
                    }}
                    value={data?.isPolicyAgree}
                    selected={data?.isPolicyAgree}
                    error={errors.isPolicyAgree}

                />
            </Grid>
        </Grid >
    )
}

export default ContractStep4