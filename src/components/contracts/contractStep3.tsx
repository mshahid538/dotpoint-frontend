import React from 'react'
import { Box, Grid, Button, useTheme, Alert } from "@mui/material";
import TextLabel from '@components/common/commonTextLabel';
import CheckIcon from '@mui/icons-material/Check';
import SelectDropDown from '@components/common/selectDropDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from "@mui/material/styles";
import Assets from '@components/common/image_container';
import usePageLoader from '@redux/hooks/usePageLoader';
import { useDispatch } from 'react-redux';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { deleteImg } from '@redux/Redux/Actions';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ContractStep3 = ({ activeStep, data, setData, handleImageUpload, deleteImg, errors }: any) => {
  //Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  const setFullPageLoader = usePageLoader();


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
          Step {activeStep - 1} : Personal / Company Credentials - Completed
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
            title={'Personal Credentials'}
          />
          <TextLabel
            textAlign='center'
            variant='body2'
            fontWeight="400"
            title={'Please upload photos or copies of government-issued ID card, driving licence or passport so we can verify your identity. Each scan/photo has to be of good quality, in colour and in one of the standard image formats (JPG / PNG / BMP).'}
          />
          <TextLabel
            textAlign='center'
            variant='body1'
            fontWeight="400"
            title={'Which document are you using to confirm your identity?'}
          />
          <Box>
            <SelectDropDown
              width={'520px'}
              values={["ID card / Driving licence", "Passport"]}
              name="documentType"
              value={data?.documentType}
              valid
              onChange={(e: any) => { setData({ ...data, documentType: e.target.value }) }}
            />
            <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.documentType ? errors?.documentType : " "} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TextLabel
          variant='body1'
          fontWeight="500"
          title={'Front side :'}
          marginBottom='2px'
        />
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'end'} gap={10}>
              {!data?.frontSideDoc &&
                <Box display="flex" flexDirection="column" gap={1} alignItems={'end'}>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '160px' }} color='inherit'>
                    Upload file
                    <VisuallyHiddenInput type="file" name='frontSideDoc' accept="image/png,image/jpeg,image/jpg"
                      onClick={(e: any) => { e.target.value = null; }}
                      onChange={(e: any) => { const { name, value, files } = e.target; handleImageUpload(files[0], name) }}
                    />
                  </Button>
                  <TextLabel variant="body2" fontWeight="400" title={'*Maximum allowed size is 10MB'} marginTop="2px" />
                  <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.frontSideDoc ? errors?.frontSideDoc : " "} />
                </Box>
              }
              {data?.frontSideDoc ?
                <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'} gap={1}>
                  <TextLabel variant="body1" fontWeight="400" title={'Uploaded'} marginTop="2px" />
                  <Assets src={`https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/${data?.frontSideDoc}`} absolutePath={true} height='120px' width='220px' />
                  <DeleteIcon value={data?.frontSideDoc} name='frontSideDoc' deleteImg={deleteImg} />
                </Box>
                :
                <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'}>
                  <TextLabel variant="body1" fontWeight="400" title={'Example'} marginTop="2px" />
                  <Assets src={"/assets/images/sample-licence.jpg"} absolutePath={true} height='120px' width='220px' />
                </Box>
              }

            </Box>
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12}>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <TextLabel
            variant='body1'
            fontWeight="500"
            title={'Back side :'}
            marginBottom='2px'
          />
          {data?.documentType === 'Passport' &&
            <TextLabel
              variant='body2'
              fontWeight="400"
              title={'(Optional)'}
              marginBottom='2px'
              color={theme.palette.bgGray.main}
            />
          }
        </Box>

        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'end'} gap={10}>
              {!data?.backSideDoc &&
                <Box display="flex" flexDirection="column" gap={1} alignItems={'end'}>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '160px' }} color='inherit'>
                    Upload file
                    <VisuallyHiddenInput type="file" name='backSideDoc' accept="image/png, image/jpeg,image/jpg"
                      onChange={(e: any) => { const { name, value, files } = e.target; handleImageUpload(files[0], name) }}
                      onClick={(e: any) => { e.target.value = null; }}

                    />
                  </Button>
                  <TextLabel variant="body2" fontWeight="400" title={'*Maximum allowed size is 10MB'} marginTop="2px" />
                  <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.backSideDoc ? errors?.backSideDoc : " "} />
                </Box>
              }
              {data?.backSideDoc ?
                <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'} gap={1}>
                  <TextLabel variant="body1" fontWeight="400" title={'Uploaded'} marginTop="2px" />
                  <Assets src={`https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/${data?.backSideDoc}`} absolutePath={true} height='120px' width='220px' />
                  <DeleteIcon value={data?.backSideDoc} name='backSideDoc' deleteImg={deleteImg} />
                </Box>
                :
                <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'}>
                  <TextLabel variant="body1" fontWeight="400" title={'Example'} marginTop="2px" />
                  <Assets src={"/assets/images/sample-licence.jpg"} absolutePath={true} height='120px' width='220px' />
                </Box>
              }
            </Box>
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12}>
        <TextLabel
          variant='body1'
          fontWeight="500"
          title={'Selfie with your ID :'}
          marginBottom='2px'
        />
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'end'} gap={10}>
              {!data?.selfieDoc && <Box display="flex" flexDirection="column" gap={1} width={'500px'} alignItems={'end'}>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '160px' }} color='inherit'>
                  Upload Image
                  <VisuallyHiddenInput type="file" name='selfieDoc' accept="image/png, image/jpeg,image/jpg"
                    onChange={(e: any) => { const { name, value, files } = e.target; handleImageUpload(files[0], name) }}
                    onClick={(e: any) => { e.target.value = null; }}
                  />
                </Button>
                <TextLabel variant="body2" fontWeight="400" title={'*Maximum allowed size is 10MB'} marginTop="2px" />
                <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.selfieDoc ? errors?.selfieDoc : " "} />
                <TextLabel variant="body2" fontWeight="400" title={'Please hold the document you have uploaded close to your face so we can verify your identity. Make sure not to cover any part of the document with your fingers.'} marginTop="2px" />
              </Box>}

              {data?.selfieDoc ?
                <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'} gap={1}>
                  <TextLabel variant="body1" fontWeight="400" title={'Uploaded'} marginTop="2px" />
                  <Assets src={`https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/${data?.selfieDoc}`} absolutePath={true} height='120px' width='220px' />
                  <DeleteIcon value={data?.selfieDoc} name='selfieDoc' deleteImg={deleteImg} />
                </Box>
                :
                <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'}>
                  <TextLabel variant="body1" fontWeight="400" title={'Example'} marginTop="2px" />
                  <Assets src={"/assets/images/selfie-doc.jpg"} absolutePath={true} height='120px' width='220px' />
                </Box>
              }
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <Box display={'flex'} gap={0} flexDirection={'column'}> */}
          <TextLabel
            variant='body1'
            fontWeight="500"
            title={'Proof of Address :'}
            marginBottom='2px'
          />
          {/* <TextLabel
            variant='body2'
            fontWeight="400"
            title={'Such as a bank statement , invoice, or utility bill. Must contain your name,address,and issuing date, and be no older than 3 months.'}
            marginBottom='2px'
            color={theme.palette.bgBlack.main}
            width={'500px'}
          /> */}
        {/* </Box> */}
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'end'} gap={10}>
              {!data?.addressProofDoc && <Box display="flex" flexDirection="column" gap={1} width={'500px'} alignItems={'end'}>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '160px' }} color='inherit'>
                  Upload Image
                  <VisuallyHiddenInput type="file" name='addressProofDoc' accept="image/png, image/jpeg,image/jpg"
                    onChange={(e: any) => { const { name, value, files } = e.target; handleImageUpload(files[0], name) }}
                    onClick={(e: any) => { e.target.value = null; }}
                  />
                </Button>
                <TextLabel variant="body2" fontWeight="400" title={'*Maximum allowed size is 10MB'} marginTop="2px" />
                <TextLabel variant="caption" fontSize="11px" color="error" title={!data?.addressProofDoc ? errors?.addressProofDoc : " "} />
                <TextLabel textAlign='right' variant="body2" fontWeight="400" title={'Please upload document such as a bank statement , invoice, or utility bill. Must contain your name, address, and issuing date, and be no older than 3 months.'} marginTop="2px" />
              </Box>}

              {data?.addressProofDoc ?
                <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'} gap={1}>
                  <TextLabel variant="body1" fontWeight="400" title={'Uploaded'} marginTop="2px" />
                  <Assets src={`https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/${data?.addressProofDoc}`} absolutePath={true} height='120px' width='220px' />
                  <DeleteIcon value={data?.addressProofDoc} name='addressProofDoc' deleteImg={deleteImg} />
                </Box>
                :
                <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'}>
                  <TextLabel variant="body1" fontWeight="400" title={'Example'} marginTop="2px" />
                  <Assets src={"/assets/images/address-proof-doc.png"} absolutePath={true} height='120px' width='220px' />
                </Box>
              }
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  )
}

const DeleteIcon = ({ value, name, deleteImg }: any) => {
  const theme = useTheme();
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2} onClick={(e: any) => deleteImg(value, "", name)}>
      <TextLabel variant="body2" fontWeight="400" title={'Delete document'} marginTop="2px" color={theme.palette.defultError.main} />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width={20}
        height={20}
        borderRadius={'50%'}
        sx={{ backgroundColor: theme.palette.defultError.main, cursor: "pointer" }}
      >
        <CloseOutlinedIcon sx={{ color: "#fff", fontSize: "18px" }} />
      </Box>

    </Box>

  )
}
export default ContractStep3