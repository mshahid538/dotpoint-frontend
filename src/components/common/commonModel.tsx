import React from 'react'
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, DialogContent } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { makeStyles } from 'tss-react/mui';
import TextLabel from './commonTextLabel';
import Assets from './image_container';


const useStyles = makeStyles()((theme) => {
    return {
        dialog_Main: {
            '& .MuiDialog-paper.MuiPaper-rounded': {
                borderRadius: "10px",
                overflow: 'hidden',
                maxWidth: "150vh",
                margin: "30px",
                [theme.breakpoints.down('sm')]: { margin: "12px", }
            }
        }
    };
});

const CommonModal = ({ onClose, open, title, content, children, fontSize, sx, dialogSx, maxWidth, height }: any) => {
    const { classes } = useStyles();
    const handleDlgClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick") {
            return;
        }
    }
    return (
        <Dialog
            onClose={handleDlgClose}
            open={open}
            className={classes.dialog_Main}
            maxWidth={maxWidth}
            sx={{ "& .MuiDialog-paper.MuiPaper-rounded": { height: height ? height : 'auto' } }}
        >
            <Box sx={{ padding: { md: "24px", sm: "18px", xs: "12px" }, marginTop: { sm: "12px", xs: "30px" }, ...sx }}>
                <TextLabel textAlign="center" variant="h4" fontWeight="600" title={title} />
                {onClose && <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={20}
                    height={20}
                    borderRadius={2}
                    sx={{ cursor: "pointer", position: "absolute", right: { sm: "24px", xs: "12px" }, top: { sm: "24px", xs: "12px" }, backgroundColor: "#fff" }}
                    onClick={() => onClose()}
                >
                    <Assets
                        src={"/assets/icons/close.svg"}
                        absolutePath={true}
                        width={24}
                        height={24}
                    />
                </Box>}
            </Box>
            <DialogContent sx={{ padding: { md: "24px", sm: "18px", xs: "12px" }, ...dialogSx }}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
export default CommonModal