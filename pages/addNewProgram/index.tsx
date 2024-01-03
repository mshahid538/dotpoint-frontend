import CommonTextField from '@components/common/commonTextField';
import SelectDropDown from '@components/common/selectDropDown';
import Person2Outlined from '@mui/icons-material/Person2Outlined';
import { Box, Button, FormControlLabel, Grid, InputLabel, Modal, Switch, Typography, styled } from '@mui/material'
import React from 'react'
import Divider from '@mui/material/Divider';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height:'100%',
    overflow:'scroll'
    
};
const languages = ['English',"Chinese", "Japanese", "Korean"]
const title = ['Mr.', 'Ms.', 'Mrs.', 'Mx.']
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function AddChallenges() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = React.useState<any>({ language: languages[0], title: title[0], country: '' })

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Box>
                                <CommonTextField
                                    width={'100%'}
                                    type="text"
                                    placeholder="Enter Program Name"
                                    name="programname"
                                    text="Program Name"
                                    valid
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                />
                                {/* <ErrorMessage name="lastName">
                                                    {msg => <Typography style={{ color: 'red' }}>{msg}</Typography>}
                                                </ErrorMessage> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <CommonTextField
                                    width={'100%'}
                                    type="text"
                                    placeholder="Enter Description"
                                    name="description"
                                    valid
                                    text="Description"
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                />
                                {/* <ErrorMessage name="lastName">
                                                    {msg => <Typography style={{ color: 'red' }}>{msg}</Typography>}
                                                </ErrorMessage> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <CommonTextField
                                    width={'100%'}
                                    type="text"
                                    placeholder="0 Days"
                                    name="days"
                                    text="Maximum Days Trading"
                                    valid

                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                />
                                {/* <ErrorMessage name="lastName">
                                                    {msg => <Typography style={{ color: 'red' }}>{msg}</Typography>}
                                                </ErrorMessage> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectDropDown
                                fullWidth
                                width={'100%'}
                                values={languages || []}
                                text="Program Currency"
                                name="currency"
                                value={data?.language}
                                // onChange={(e: any) => {
                                //     setData({ ...data, language: e.target.value })
                                // }}
                                valid
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <CommonTextField
                                    width={'100%'}
                                    type="text"
                                    placeholder="$ 0"
                                    name="equity"
                                    text="Lowest Allowed Equity"
                                    valid
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                />
                                {/* <ErrorMessage name="lastName">
                                                    {msg => <Typography style={{ color: 'red' }}>{msg}</Typography>}
                                                </ErrorMessage> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <CommonTextField
                                    width={'100%'}
                                    type="text"
                                    placeholder="$ 0"
                                    text="Initial Balance"
                                    name="balance"
                                    valid
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                />
                                {/* <ErrorMessage name="lastName">
                                                    {msg => <Typography style={{ color: 'red' }}>{msg}</Typography>}
                                                </ErrorMessage> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectDropDown
                                fullWidth
                                width={'100%'}
                                values={languages || []}
                                text="Program Trading Type"
                                name='tradingType'
                                value={data?.language}
                                // onChange={(e: any) => {
                                //     setData({ ...data, language: e.target.value })
                                // }}
                                valid
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectDropDown
                                fullWidth
                                width={'100%'}
                                values={languages || []}
                                text="Server Details"
                                name="details"
                                value={data?.language}
                                // onChange={(e: any) => {
                                //     setData({ ...data, language: e.target.value })
                                // }}
                                valid
                            />
                        </Grid>
                        <Grid item xs={12} marginTop={1}>
                            <Typography>Please select the server groups that apply to this trading program</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel required control={<Switch />} label="Enabled" />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ backgroundColor: '#EEEEEE', margin: '1rem 0' }} /> 
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize={"14px"} fontWeight={500}>Breach Rules</Typography>
                            <Typography fontSize={"14px"} fontWeight={400} color={"gray"}>No breach rules added yet</Typography>

                        </Grid>
                        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
                            <Button variant="contained" style={{textTransform:"capitalize"}}>+ Add Rule</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ backgroundColor: '#EEEEEE', margin: '1rem 0' }} /> 
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize={"14px"} fontWeight={500}>Level-up Rules</Typography>
                            <Typography fontSize={"14px"} fontWeight={400} color={"gray"}>No level-up rules added yet</Typography>

                        </Grid>
                        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
                            <Button variant="contained" style={{textTransform:"capitalize"}}>+ Add Rule</Button>
                        </Grid>
                        <Grid item xs={12} marginTop={1}>
                            <FormControlLabel required control={<Switch />} label="This program has a next phase" />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectDropDown
                                fullWidth
                                width={'100%'}
                                values={languages || []}
                                text="Next Program"
                                name="program"
                                value={data?.language}
                                // onChange={(e: any) => {
                                //     setData({ ...data, language: e.target.value })
                                // }}
                                valid
                            />
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} marginTop={2} >
                            <Button variant="contained" style={{textTransform:"capitalize"}}>Create New Program</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal></>
    )
}

export default AddChallenges