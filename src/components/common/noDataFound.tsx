import { Card, CardContent, Icon, Typography } from "@mui/material";
import React from "react";
import PaperContainer from "./pageContainer";

export default function NoDataFound({ title, icon, elevation }: any) {
    return (
        <PaperContainer
            sx={{
                justifyContent: "center",
                alignSelf: "center",
                margin: "8px 0px",
                alignItems: "center",
                textAlign: "center",
                p: 4,
            }}
        >
            <Typography textAlign={"center"} variant="body1">
                {title ? title : "No data found"}
            </Typography>
        </PaperContainer>
    );
}
