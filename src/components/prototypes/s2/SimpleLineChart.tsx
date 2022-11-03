import graph2Data from "./graph2Data";
import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";



const SimpleLineChart = () => {
  return (
<>
<ResponsiveContainer width={"75%"} height={400} min-width={300}>
  <LineChart width={900} height={400} data={graph2Data}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="name" padding={{ left: 0, right: 30 }}>
      {/* <Label value="Date" position="bottom" /> */}
      </XAxis>

      <YAxis>
      <Label value="Expected hours per month spent on PDP" angle={-90} position="left" dx={7} dy={-140} />
      </YAxis>

      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="one"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="two" stroke="#4d8964" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="three" stroke="#5e0a64" activeDot={{ r: 8 }} />
    </LineChart>
    </ResponsiveContainer>
    </>
    );
}

export default SimpleLineChart