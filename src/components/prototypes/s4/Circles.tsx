import React, { useEffect } from "react";
import * as d3 from "d3";


type CategoryKeys =
  | "Accountant"
  | "Manager"
  | "Assistant"
  | "Account-Director"
  | "CEO"
  | "Team-Lead";
type DataType = {
  name: CategoryKeys;
  size: number;
};

type ChartType = d3.Selection<SVGSVGElement, any, null, undefined>;
const useChart = (
  width: number,
  height: number,
  draw: (chart: ChartType, data: any) => void,
  data: any
) => {
  const ref = React.useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const d3Node = d3.select(ref.current);
    d3Node.selectAll("*").remove();

    draw(d3Node, data);
  }, [ref, draw, data, width, height]);

  return { ref, width, height };
};

type Chart = ReturnType<typeof useChart>;

type HierarchyType<T> = T & {
  children?: HierarchyType<T>[];
};
const circlePack = (
  data: any[],
  keySelector: (t: any) => number,
  chart: Chart
) => {
  // force flat data into hierarchical layout
  const hierarchicalData = ({
    children: data
  } as any) as any;

  const hierarchy = d3.hierarchy(hierarchicalData, (x) => x.children);
  const pack = d3.pack().padding(1).size([chart.width, chart.height])(
    hierarchy
      .sum(keySelector)
      .sort((a, b) => keySelector(a.data) - keySelector(b.data))
  );

  return pack.descendants().slice(1);
};

const data: DataType[] = [
  { name: "Assistant", size: 12 },
  { name: "Accountant", size: 22 },
  { name: "Team-Lead", size: 28 },
  { name: "Manager", size: 32 },
  { name: "Account-Director", size: 38 },
  { name: "CEO", size: 50 },
];

const color = d3
  .scaleOrdinal<CategoryKeys, string>()
  .domain([
    "Manager",
    "Assistant",
    "Account-Director",
    "CEO",
    "Accountant",
    "Team-Lead"
  ] as CategoryKeys[])
  .range(["#6c7cac", "#2282b9", "#7381e4", "#787788", "#969", "#ca5bca"])
  .unknown("#F00");

  
const Circles = () => { 
  const chart = useChart(
    700,
    700,
    (svg, data) => {
      const packedData = circlePack(data, (x:any) => x.size, chart);
      svg
        .append("g")
        .selectAll("circle")
        .data(packedData)
        .join("circle")
        .attr("fill", (d:any) => color(d.data.name))
        .style("cursor", "pointer")
        // .attr("pointer-events", (d) => (!d.children ? "none" : null))
        .attr("r", (d) => d.r)
        .attr("cx", (d) => d.x + 50)
        .attr("cy", (d) => d.y)
        .on("mouseover", function() { d3.select(this).attr("opacity", ".85"); })
        .on("mouseout", function() { d3.select(this).attr("opacity", 1); });
      svg
        .selectAll('text')
        .data(packedData)
        .enter()
        .append('text')
        .text((d:any) => (`${d.data.name} ` + ` - ${d.data.size} months`))
        .attr("r", (d) => d.r)
        .attr("x", (d) => d.x -10)
        .attr("y", (d) => d.y)
        .attr('font-size', 12)
        .style("cursor", "pointer")
        .on("mouseover", function() { d3.select(this).style('fill', 'white'); })
        .on("mouseout", function() { d3.select(this).style('fill', '#000'); });
    },
    data
  );

  return (
    <div>
      <div className="flex row items-center">
        <div className="w-74 bg-[#dddfe6] p-8 rounded-lg">
        {data.map((result, index) =>(
        <div key={index}>

          <div key={index}>
            <p key={index}>Your goal is to become: <span className="font-bold text-[#90377b]">{result.name}</span>?</p>
          </div>

          <div key={index}>
           <p key={index}>It might take you around <span className="font-bold">{result.size} months </span> to achieve this goal.</p>
          </div>

          <br/>

        </div>
            
        ))}

      </div>
         <svg ref={chart.ref} width={chart.width} height={chart.height}>
         </svg>
      </div>
    </div>
  );
}

export default Circles;