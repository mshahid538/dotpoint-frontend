import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const SimpleLineChart = ({ data, legendName, height }: any) => {

    return (
        <>
            {data?.length > 0 && <ResponsiveContainer width="100%" height={height ? height : 300}>
                <LineChart
                    width={500}
                    height={300}
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
                    <YAxis>
                        <Label value="Balance" angle={-90} position="insideLeft" fill='lightblue'/>
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name={legendName} stroke="lightblue" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>}
        </>
    );
};

export default SimpleLineChart;
