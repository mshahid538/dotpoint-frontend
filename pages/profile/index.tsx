import React, { ReactNode } from 'react';
//mui
import { makeStyles } from "tss-react/mui";
import { Box, Tabs, Tab } from '@mui/material';
import { lightTheme } from '@redux/theme';
//component
import BreadcrumbLayout from '@components/common/Layout/breadcrumbLayout';
import TextLabel from '@components/common/commonTextLabel';
import PersonalInformation from '@components/Profile/personalInformation';
import AccountInformation from '@components/Profile/accountInformation';
import Security from '@components/Profile/security';
import NewsLetters from '@components/Profile/newsLetters';
import Identity from '@components/Profile/Identity';
import { useRouter } from 'next/router';

const useStyles = makeStyles()(() => {
  return {
    tabTitle: {
      color: lightTheme.palette.bgGray.main,
      fontWeight: "600",
      cursor: "pointer",
      transition: 'color 0.3s',
      textTransform: "capitalize",
      '&.Mui-selected': {
        backgroundColor: lightTheme.palette.bgDefultGreen.main,
        borderRadius: "6px",
        color: "#fff",
      }
    },
    tabsLine: {
      borderBottom: "0px solid",
      '& .MuiTabs-indicator': {
        height: '0px'
      }
    },
  };
});

interface Breadcrumb {
  label: ReactNode;
  path: string;
}

interface ProfileProps {
  children: ReactNode;
  breadcrumb: Breadcrumb[];
  breadcrumbTitle: string;
  description?: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <TextLabel title={children} />
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Profile: React.FC<ProfileProps> = ({ }) => {
  const { classes } = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [selectedTabLabel, setSelectedTabLabel] = React.useState("Personal Information");

  const breadcrumbsData: Breadcrumb[] = [
    {
      label: 'Trader',
      path: '/',
    },
    {
      label: 'Profile',
      path: '#',
    },
    {
      label: selectedTabLabel,
      path: '#',
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const targetElement = event.target as HTMLElement;
    const labelText = targetElement.innerText;

    setSelectedTabLabel(labelText);
  };

  return (
    <>
      <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Profile">
        <Box sx={{ padding: 0, width: '100%' }}>
          <Box p={0} mb={2}>
            <Tabs
              className={classes.tabsLine}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab className={classes.tabTitle} label="Personal Information"  {...a11yProps(0)} />
              {/* <Tab className={classes.tabTitle} label="Account Information"  {...a11yProps(1)} />
              <Tab className={classes.tabTitle} label="Security" {...a11yProps(2)} />
              <Tab className={classes.tabTitle} label="Identity" {...a11yProps(3)} />
              <Tab className={classes.tabTitle} label="Newsletters" {...a11yProps(4)} /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <PersonalInformation />
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={1}>
            <AccountInformation />
          </CustomTabPanel> */}
          {/* <CustomTabPanel value={value} index={2}>
            <Security />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Identity />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <NewsLetters />
          </CustomTabPanel> */}
        </Box>
      </BreadcrumbLayout>
    </>
  );
};

export default Profile;
