import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const BarChartCommon = ({data,height}:any) => {
  return (
    <ResponsiveContainer width="100%" height={height ? height : 400}>
        <BarChart
          width={430}
          height={430}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey={""}/>
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value" fill="#d0f0f9" />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartCommon