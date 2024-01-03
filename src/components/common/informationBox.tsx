import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";

interface InformationProps {
  title?: string;
  description1?: string;
  description2?: string;
  isButton?: boolean;
  buttonText?: string;
}

const InformationBox = ({
  title,
  description1,
  description2,
  isButton,
  buttonText,
}: InformationProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={9} xs={12}>
          <Card
            sx={{
              marginBottom: "12px",
              boxShadow:
                "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0), 0px 1px 8px 0px rgba(0,0,0,0.12)",
            }}
          >
            <CardContent>
              <Typography fontWeight={700} fontSize={16}>
                {title}
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <Typography
                fontSize={14}
                textAlign={"justify"}
                lineHeight={1.6}
                mb={2}
              >
                {description1}
              </Typography>
              <Typography fontSize={14} textAlign={"justify"} lineHeight={1.6}>
                {description2}
              </Typography>
              {isButton && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  {buttonText}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default InformationBox;
