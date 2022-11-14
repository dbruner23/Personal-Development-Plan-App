import { ResponsiveContainer, Sankey, Tooltip } from "recharts";
import Node from "./Node";
import Link from "./Link";
import sankeyData from "./sankeyData";



const SankeyChart = () => {



  return (
    <>
    <ResponsiveContainer width={"98%"} height={750} min-width={400}>
      <Sankey
      data={sankeyData}
      nodeWidth={10}
      nodePadding={50}
      linkCurvature={0.71}
      iterations={36}
      link={<Link />}
      node={<Node containerWidth={960} />}
    >
      <defs>
        <linearGradient id={"linkGradient"}>
          <stop offset="0%" stopColor="rgba(57, 222, 225, 0.5)" />
          <stop offset="100%" stopColor="rgba(52, 77, 186, 0.3)" />
        </linearGradient>
      </defs>
      {/* <Tooltip content={<CustomTooltip payload={sankeyData} />} /> */}
      <Tooltip />
    </Sankey>
    </ResponsiveContainer>
    </>
  )
}

export default SankeyChart