import { converOctateToType } from "@lib/docPreviewHelpers";
import { getFileIcon } from "@lib/getFileIconName";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Link,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
// import { IconWrapper } from "./customSvgIcon";
import DangerousIcon from '@mui/icons-material/Dangerous';
export default function DocPreview({
    link,
    iconName,
    octateFile,
    height,
    isSideView
}: {
    link: any;
    iconName: any;
    octateFile: boolean;
    height?: any;
    isSideView?: any
}) {
    const [convertedFile, setConvertedFile] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const isImage = ["png", "jpg"].includes(iconName);
    const isPdf = ["pdf"].includes(iconName);
    const isDoc = ["doc", "docx", "txt"].includes(iconName);
    const isVideo = ["video-player"].includes(iconName);
    const isAudio = ["music"].includes(iconName);
    console.log(convertedFile, "convertedFile")
    React.useEffect(() => {
        if (isPdf && octateFile) {
            converOctateToType({ link: link, type: "application/pdf" }).then(
                (blob: any) => {
                    var binaryData = [];
                    binaryData.push(blob);
                    setConvertedFile(
                        window.URL.createObjectURL(
                            new Blob(binaryData, { type: "application/zip" })
                        )
                    );
                }
            );
        }
    }, []);
    if (isImage)
        return (
            <Box>
                <img
                    width="100%"
                    style={{ pointerEvents: "none" }}
                    src={link}
                    height={height || "500px"}
                />
            </Box>
        );
    else if (isPdf) {
        if (octateFile) {
            return (
                <Box>
                    <iframe
                        allowFullScreen
                        width="100%"
                        style={{ border: "none" }}
                        height={height || "500px"}
                        src={convertedFile}
                    />
                </Box>
            );
            //   convertedFile ? (

            // <iframe
            //   allowFullScreen
            //   width="100%"
            //   style={{ border: "none" }}
            //   height="400px"
            //   src={convertedFile}
            // />
            //   ) : (
            //     <WidgetLoader />
            //   );
        } else {
            return (
                <Box>
                    <iframe
                        allowFullScreen
                        width="100%"
                        style={{ border: "none" }}
                        height={height || "500px"}
                        // src={isSideView ? link : `${link}#toolbar=0&view=fitH`}
                        src={isSideView ? link : `${link}#toolbar=0&navpanes=0&view=fitH`}
                    />
                </Box>
            );
        }
    } else if (isDoc) {
        return (
            <Box>
                <iframe
                    allowFullScreen
                    width="100%"
                    style={{ border: "none" }}
                    height={height || "400px"}
                    src={`https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(
                        link
                    )}`}
                />
            </Box>
        );
    } else if (isVideo) {
        return (
            <Box>
                <video
                    controls
                    src={link}
                    width="100%"
                    height="100%"
                    style={{ maxHeight: "400px" }}
                >
                    This video is not supported
                </video>
            </Box>
        );
    } else if (isAudio) {
        return (
            <Box textAlign="center" pb={3}>
                <audio controls src={link}>
                    This video is not supported
                </audio>
            </Box>
        );
    } else {
        return (
            <Box textAlign={"center"} p={1}>
                {/* <IconWrapper icon={iconName} color="primary" fontSize="large" /> */}
                <Typography>File Preview Not Supported</Typography>

                <Link
                    onClick={() => {
                        window.open(link, "_blank");
                    }}
                    sx={{ cursor: "pointer" }}
                >
                    open in new tab
                </Link>
            </Box>
        );
    }
}

export type DocPreviewDialogProps = {
    open?: boolean;
    handleClose?: any;
    doc?: any;
    documentType?: any;
    clickedIdx?: number;
};
export function DocPreviewDialog({
    open,
    handleClose,
    doc = [],
    documentType,
    clickedIdx = 0,
}: DocPreviewDialogProps) {
    const [currIndex, setCurrIndex] = React.useState<any>(clickedIdx);
    return open && doc.length > 0 ? (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>
                {documentType}
                <IconButton sx={{ float: "right" }} onClick={handleClose}>
                    <DangerousIcon color="primary" fontSize="medium" />
                    {/* <IconWrapper
                        color="primary"
                        style={{ fontSize: "medium" }}
                        icon="wrong"
                    /> */}
                </IconButton>
            </DialogTitle>
            <DocPreview
                link={doc[currIndex].fileUrl}
                iconName={getFileIcon({ fileName: doc[currIndex].fileName })}
                octateFile={false}
            ></DocPreview>
            {doc && doc.length > 1 ? (
                <DialogActions>
                    <Button
                        autoFocus
                        disabled={currIndex == 0 ? true : false}
                        onClick={() => {
                            setCurrIndex((val: any) => val - 1);
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={currIndex == doc.length - 1 ? true : false}
                        onClick={() => {
                            setCurrIndex((val: any) => val + 1);
                        }}
                        autoFocus
                    >
                        Next
                    </Button>
                </DialogActions>
            ) : (
                ""
            )}
        </Dialog>
    ) : null;
}
