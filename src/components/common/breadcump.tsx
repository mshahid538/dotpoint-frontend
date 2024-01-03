import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from "tss-react/mui";
import { Box, Typography } from '@mui/material';
import { lightTheme } from '@redux/theme';

const useStyles = makeStyles()((theme) => {
  return {
    breadcrumbMain: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      [theme.breakpoints.down('md')]: {
        gap: "6px",
      }
    },
    lastLabel: {
      fontSize: "18px",
      color: lightTheme.palette.bgGray.main,
      fontFamily: "poppins",
      cursor: "pointer",
      [theme.breakpoints.down('md')]: {
        fontSize: "14px",
      }
    },
    labelText: {
      fontSize: "18px",
      fontWeight: "600",
      fontFamily: "poppins",
      cursor: "pointer",
      [theme.breakpoints.down('md')]: {
        fontSize: "14px",
      }
    }
  };
});


interface BreadcrumbItem {
  path: string;
  label: React.ReactNode;
}

interface BreadcrumbProps {
  breadcrumb: BreadcrumbItem[];
  description?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb, description }) => {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <>
      <Box sx={{ marginBottom: { sm: "20px", xs: "12px" } }}>
        {breadcrumb && (
          <Box className={classes.breadcrumbMain} >
            {breadcrumb?.map(({ path, label }, i) => (
              <React.Fragment key={i}>
                {i > 0 ?
                  <Typography sx={{ color: i === breadcrumb.length - 1 ? lightTheme.palette.bgGray.main : "#333", }} onClick={() => { router.push(path) }} > {i > 0 ? '/' : null} </Typography> : null}
                {path === router.asPath ? (
                  <Typography onClick={() => { router.push(path) }} className={classes.labelText}>{label}</Typography>
                ) : i === breadcrumb.length - 1 ? (
                  <Typography onClick={() => { router.push(path) }} className={classes.lastLabel}>{label}</Typography>
                ) : (
                  <Typography onClick={() => { router.push(path) }} className={classes.labelText}>
                    {label}
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}
      </Box>
      {/* {description && <Typography sx={{ backgroundColor: "red" }} >{description}</Typography>} */}
    </>
  );
};

export default Breadcrumb;

