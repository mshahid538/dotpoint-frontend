import React from 'react'
//mui
import { makeStyles } from "tss-react/mui";
import { Box } from '@mui/material';
//component
import PaperContainer from '@components/common/PaperContainer'
import MUIButton from '@components/common/commonButton'
import OutlinedCheckbox from '@components/common/commonCheckBox'

const useStyles = makeStyles()((theme) => {
    return {
        titleForm: {
            fontSize: "16px",
            fontWeight: "600",
        }
    };
});

const NewsLetters = () => {
    const { classes } = useStyles();
    const [data, setData] = React.useState<any>({ weeklyRecap: false, macroEvents: false })

    return (
        <>
            <PaperContainer title={"Newsletters"}>
                <Box >
                    <OutlinedCheckbox
                        label={"Weekly Recap"}
                        name={'weeklyRecap'}
                        color={"#000"}
                        handleSelect={(e: any) =>
                            (e: any) => setData({ ...data, weeklyRecap: !data?.weeklyRecap })
                        }
                        value={data?.weeklyRecap}
                    />
                    <OutlinedCheckbox
                        label={"Macro Events"}
                        name={'macroEvents'}
                        color={"#000"}
                        handleSelect={(e: any) =>
                            (e: any) => setData({ ...data, macroEvents: !data?.macroEvents })
                        }
                        value={data?.macroEvents}
                    />
                </Box>
            </PaperContainer>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <MUIButton
                    type="submit"
                    // disabled={isSubmitting}
                    fullWidth={true}
                    height="42px"
                    width="320px"
                    text="Save"
                    marginTop={3}
                />
            </Box>
        </>
    )
}

export default NewsLetters