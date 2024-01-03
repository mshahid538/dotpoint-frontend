import React, { ReactNode, useEffect, useState } from "react";
//mui
import { Box } from "@mui/material";
//component
import EconomicCalendar from "@components/ecoCalendar";
import DescriptionTable from "@components/ecoCalendar/ecoDescription";
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import { useDispatch } from "react-redux";
import { get_economic } from "@redux/Redux/Actions";

const headerLabels = [
  "Description",
  "Instrument",
  "Dates",
  "Forecaste",
  "Previous",
];
const descriptionContent = [
  {
    description: "Monetary Policy Meeting Minutes",
    instrument: "EUR",
    dates: "27 Sept 2023 01:50",
    status: "Expired",
    forecaste: "No Forecaste",
    previous: "No Previous Value",
  },
  {
    description: "Economic Indicator Release",
    instrument: "USD",
    dates: "28 Sept 2023 09:30",
    status: "Upcoming",
    forecaste: "No Forecaste",
    previous: "Not Available",
  },
  {
    description: "Job Market Report",
    instrument: "GBP",
    dates: "28 Sept 2023 14:00",
    status: "Upcoming",
    forecaste: "No Forecaste",
    previous: "Available",
  },
  {
    description: "Trade Balance Announcement",
    instrument: "JPY",
    dates: "29 Sept 2023 03:00",
    status: "Upcoming",
    forecaste: "No Forecaste",
    previous: "Available",
  },
  {
    description: "Consumer Confidence Index",
    instrument: "AUD",
    dates: "30 Sept 2023 08:00",
    status: "Upcoming",
    forecaste: "No Forecaste",
    previous: "Not Available",
  },
];
interface Breadcrumb {
  label: ReactNode;
  path: string;
}
const breadcrumbsData: Breadcrumb[] = [
  {
    label: "Trader",
    path: "/",
  },
  {
    label: "Economic Calendar",
    path: "#",
  },
];


const languages = [
  { "value": "def", "label": "Widget language" },
  { "value": "en", "label": "English" },
  { "value": "ru", "label": "Русский" },
  { "value": "zh", "label": "中文" },
  { "value": "es", "label": "Español" },
  { "value": "fr", "label": "Français" },
  { "value": "it", "label": "Italiano" },
  { "value": "de", "label": "Deutsch" },
  { "value": "ar", "label": "العربية" },
  { "value": "ja", "label": "日本語" },
  { "value": "pt", "label": "Português" },
  { "value": "tr", "label": "Türkçe" },
  { "value": "ko", "label": "한국어" }
];

const EconomicCal = () => {

  const dispatch = useDispatch();
  const [economicList, setEconomicList] = useState<any>([]);
  const [calendarPeriod, setCalendarPeriod] = useState<any>("2")
  const [calendarThemeDark, setCalendarThemeDark] = useState("Light");
  const [forceRerender, setForceRerender] = useState(false);
  const [calendarLanguage, setCurrentLanguage] = useState({ "value": "def", "label": "Widget language" })

  const handleCalendarPeriod = (event: any) => {
    setCalendarPeriod(event.target.value);
    setForceRerender((prev) => !prev);
  };
  const handleCalendarTheme = (event: any) => {
    setCalendarThemeDark(event.target.value);
    setForceRerender((prev) => !prev);
  };
  const handleCalendarLanguage = (event: any) => {
    const selectedLanguage = languages.find(lang => lang?.label === event.target.value);
    if (selectedLanguage) {
      setCurrentLanguage(selectedLanguage);
      setForceRerender((prev) => !prev);
    }
  };
  return (
    <>
      <BreadcrumbLayout
        breadcrumb={breadcrumbsData}
        breadcrumbTitle="Utilities"
      >
        {/* <EconomicCalendar
          calendarPeriod={calendarPeriod}
          handleCalendarPeriod={handleCalendarPeriod}
          calendarThemeDark={calendarThemeDark}
          handleCalendarTheme={handleCalendarTheme}
          calendarLanguage={calendarLanguage}
          handleCalendarLanguage={handleCalendarLanguage}
          languages={languages}
        /> */}
        <Box mt={2}>
          <DescriptionTable
            descriptionContent={descriptionContent}
            headerLabels={headerLabels}
            calendarPeriod={calendarPeriod}
            forceRerender={forceRerender}
            calendarThemeDark={calendarThemeDark}
            calendarLanguage={calendarLanguage}
          />
        </Box>
      </BreadcrumbLayout>
    </>
  );
};

export default EconomicCal;
