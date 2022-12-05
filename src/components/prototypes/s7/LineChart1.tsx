import graph2Data from "./data";
// import data from "./data2";
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


const CustomTooltip = ({ active, payload }: any) => {
  if (active) {
    return (
      <>
      <div className="bg-[#ffffff] p-2 border-2 text-center ">
        <p>{`${payload?.[0].payload["name"]}`}</p>
        {/* <p>{`${payload?.[0].name} : You reached ${payload?.[0].value}% of your goal`}</p> */}
        <p>{`${payload?.[0].payload["pastInfo"]}`}</p>
        <p>{`${payload?.[0].payload["path1Info"]}`}</p>
        <p>{`${payload?.[0].payload["path2Info"]}`}</p>
      </div>
      </>
    );
  }

  return null;
};

const LineChart1 = () => {
  return (
<>
<ResponsiveContainer width={"75%"} height={500} min-width={300}>
  <LineChart width={900} height={400} data={graph2Data}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="name" padding={{ left: 0, right: 30 }}>
      </XAxis>

      <YAxis>
      <Label value="Percentage of your goal reached" angle={-90} position="left" dx={7} dy={-140} />
      </YAxis>
      <Tooltip content={<CustomTooltip />}/>
    {/* <Tooltip/> */}
      <Legend />
      <Line
        type="monotone"
        dataKey="past"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="path1" stroke="#4d8964" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="path2" stroke="#5e0a64" activeDot={{ r: 8 }} />
    </LineChart>
    </ResponsiveContainer>
    </>
    );
}

export default LineChart1