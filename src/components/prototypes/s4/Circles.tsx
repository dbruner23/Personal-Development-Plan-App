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
const useChart = <T extends unknown>(
  width: number,
  height: number,
  draw: (chart: ChartType, data: T) => void,
  data: T
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
const circlePack = <T extends unknown>(
  data: T[],
  keySelector: (t: T) => number,
  chart: Chart
) => {
  // force flat data into hierarchical layout
  const hierarchicalData = ({
    children: data
  } as any) as HierarchyType<T>;

  const hierarchy = d3.hierarchy(hierarchicalData, (x) => x.children);
  const pack = d3.pack<T>().padding(1).size([chart.width, chart.height])(
    hierarchy
      .sum(keySelector)
      .sort((a, b) => keySelector(a.data) - keySelector(b.data))
  );

  return pack.descendants().slice(1);
};

const data: DataType[] = [
  { name: "Manager", size: 24 },
  { name: "Assistant", size: 10 },
  { name: "Account-Director", size: 30 },
  { name: "CEO", size: 46 },
  { name: "Accountant", size: 16 },
  { name: "Team-Lead", size: 20 }
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
  .range(["#6cac6c", "#1a811a", "#206720", "#787", "#969", "#ca5bca"])
  .unknown("#F00");

  
const Circles = () => { 
  const chart = useChart(
    700,
    700,
    (svg, data) => {
      const packedData = circlePack(data, (x) => x.size, chart);
      svg
        .append("g")
        .selectAll("circle")
        .data(packedData)
        .join("circle")
        .attr("fill", (d) => color(d.data.name))
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
        .text((d) => (`${d.data.name} ` + ` - ${d.data.size} months`))
        .attr("r", (d) => d.r)
        .attr("x", (d) => d.x -10)
        .attr("y", (d) => d.y)
        .attr('font-size', 12)
        .style("cursor", "pointer")
        .on("mouseover", function() { d3.select(this).style('fill', 'white'); })
        .on("mouseout", function() { d3.select(this).style('fill', '#000'); });
;

    },
    data
  );

  return (
    <div className="flex row ">
        {/* <div>
        {data.map((result, index) =>(
            <p key={index}>Goal: {result.name}. This will take you {result.size} months.</p>
        ))}
        </div> */}
      <svg ref={chart.ref} width={chart.width} height={chart.height}>
      </svg>
    </div>
  );
}

export default Circles;