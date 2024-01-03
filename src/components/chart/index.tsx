import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartComponent = ({ chartOptions }: any) => {

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default ChartComponent;
