import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Box,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import SelectDropDown from "@components/common/selectDropDown";
import { pink, yellow, red, grey, lightGreen } from "@mui/material/colors";
import RadioButtonBox from "@components/common/RadioButtonBox";
import TextLabel from "@components/common/commonTextLabel";
import PaperContainer from "@components/common/PaperContainer";
import moment from "moment";
import Radio from '@mui/material/Radio';

const useStyles = makeStyles()((theme) => {
  return {
    autoIcon: {
      outline: "none",
      boxShadow: "none",
      "& svg ": {
        color: "#ffffff !important",
      },
      "& .MuiFilledInput-input": {
        color: "#fff !important",
      },
    },
  };
});

const EconomicCalendar = ({ handleCalendarPeriod, calendarPeriod, handleCalendarTheme, calendarThemeDark, handleCalendarLanguage, calendarLanguage, languages }: any) => {
  const { classes } = useStyles();
  const [data, setData] = React.useState<any>({});
  const [count4, setCount4] = React.useState<any>("2");

  const handleCount = (index: any) => {
    setCount4(index);
  };
  const currentDay = moment().format("dddd");

  useEffect(() => {
    if (currentDay === "Monday") {
      setCount4("0");
    } else if (currentDay === "Tuesday") {
      setCount4("1");
    } else if (currentDay === "Wednesday") {
      setCount4("2");
    } else if (currentDay === "Thursday") {
      setCount4("3");
    } else if (currentDay === "Friday") {
      setCount4("4");
    } else if (currentDay === "Saturday") {
      setCount4("5");
    } else {
      setCount4("6");
    }
  }, [currentDay]);
  console.log(calendarLanguage, "calendarLanguage")
  return (
    <>
      <PaperContainer title={"Economic Calendar"}>
        <Grid container spacing={5} xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextLabel fontWeight="500" variant="body1" title={"Default calendar period :"} />
            <FormGroup row>
              <FormControlLabel control={<Radio checked={calendarPeriod === '2'} onChange={handleCalendarPeriod} value="2" sx={{ color: red[700], '&.Mui-checked': { color: red[500], }, }} />}
                label="Current week"
              />
              <FormControlLabel
                control={<Radio checked={calendarPeriod === '1'} onChange={handleCalendarPeriod} value="1" sx={{ color: lightGreen[500], '&.Mui-checked': { color: lightGreen[500], }, }} />}
                label="Current day"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextLabel fontWeight="500" variant="body1" title={"Color Theme:"} />
            <SelectDropDown
              width={'100%'}
              size="medium"
              values={['Light', "Dark"]}
              name="calendarThemeDark"
              value={calendarThemeDark}
              onChange={handleCalendarTheme}
              backgroundColor={'transparent'}
              color={'#333333'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextLabel fontWeight="500" variant="body1" title={"Languages:"} />
            <SelectDropDown
              width={'100%'}
              size="medium"
              values={languages?.length > 0 ? languages?.map((e: any) => e?.label) : []}
              name="calendarLanguage"
              value={calendarLanguage?.label}
              onChange={handleCalendarLanguage}
              backgroundColor={'transparent'}
              color={'#333333'}
            />
          </Grid>
        </Grid>
      </PaperContainer>
    </>
  );
};

export default EconomicCalendar;
