import { ResponsiveContainer, Sankey, Tooltip } from "recharts";
import Node from "./Node";
import Link from "./Link";
import sankeyData from "./sankeyData";
import sankeyData2 from "./sankeyData2";
import sankeyData3 from "./sankeyData3";


const CustomTooltip = ({ active, payload }: any) => {
  if (active) {
    return (
      <div className="bg-[#ffffff] p-2 border-2 text-center ">
        <p>{`To progress from ${payload?.[0].name}`}</p>
        <p>{`will take you around ${payload?.[0].value} months`}</p>
      </div>
    );
  }

  return null;
};



const SankeyChart = () => {



  return (
    <>
    <ResponsiveContainer width={"98%"} height={650} min-width={400}>
      <Sankey
      data={sankeyData2}
      nodeWidth={10}
      nodePadding={50}
      linkCurvature={0.71}
      iterations={36}
      link={<Link />}
      node={<Node containerWidth={"100%"} />}
    >
      <defs>
        <linearGradient id={"linkGradient"}>
          <stop offset="0%" stopColor="rgba(57, 222, 225, 0.5)" />
          <stop offset="100%" stopColor="rgba(52, 77, 186, 0.3)" />
        </linearGradient>
      </defs>
      {/* <Tooltip /> */}
      <Tooltip content={<CustomTooltip />} />
    </Sankey>
    </ResponsiveContainer>
    </>
  )
}

export default SankeyChart