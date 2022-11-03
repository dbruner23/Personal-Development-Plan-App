import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { select, xml, Delaunay, randomBates} from 'd3'
import * as d3 from 'd3'

type Props = {}

const NodeMap = (props: Props) => {
  const random = d3.randomNormal(0, 1)
  let randomdata = Array.from({ length: 100 }, () => [random(), random()])
  const [data, setData] = useState(randomdata)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (data !== undefined) { graph(data) }
  }, [data])

  const graph = (data: any) => {
    d3.selectAll("svg > *").remove();
    const svg: any = select(svgRef.current)

    const x: any = d3.scaleLinear([0, 1], [0, 100]);
    const y: any = d3.scaleLinear([0, 1], [0, 100]);

    const width = window.innerWidth;
    const height = window.innerHeight;

    svg
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("cursor", "crosshair");

    svg
      .append("defs")
      .append("style")
      .text(`circle.highlighted { stroke: orangred; fill: orangered; }`);

    const delaunay = d3.Delaunay.from<any>(data, d => x(d[0]), d => y(d[1]));
    
  
    const g = svg.append("g");

    const mesh = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .attr("d", delaunay.render());

    const points = g
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d: any[]) => x(d[0]))
      .attr("cy", (d: any[]) => y(d[1]));

    let transform: { k: number; invert: (arg0: [number, number]) => any };

    const zoom = d3.zoom().on("zoom", e => {
      g.attr("transform", (transform = e.transform));
      mesh.attr("transform", (transform = e.transform));
      g.style("stroke-width", 3 / Math.sqrt(transform.k));
      points.attr("r", 3 / Math.sqrt(transform.k));
    });
    
    
    // const draw = (p) => {
    //   for 
    // }
    
    
    return svg
      //path set
      .on("click", (event: any) => {
        let start = 0;
        start = delaunay.find(...d3.pointer(event));
        
          
          
      })
      .call(zoom)
      .call(zoom.transform, d3.zoomIdentity)
      //recalc on zoom 
      .on("pointermove", (event: any) => {
        const p: any = transform.invert(d3.pointer(event));
        const i = delaunay.find(...p);
        points.classed("highlighted", (_: any, j: number) => i === j);
        d3.select(points.nodes()[i]).raise();
        mesh.attr("d", delaunay.render())
      })
      .node();
    
      
  }


    // const data : any = [
    //   { nbd: 1001, name: "Butter, salted", Calories: 717, Protein: .85 },
    //   { nbd: 1123, name: "Egg", Calories: 143, Protein: 12.56 },
    //   { nbd: 1236, name: "Ice Cream", Calories: 222, Protein: 4.1 },
    //   { nbd: 4020, name: "Salad Dressing", Calories: 379, Protein: 1.09 },
    //   { nbd: 5000, name: "Chicken", Calories: 144, Protein: 28.04 },
    //   { nbd: 5641, name: "Ostrich", Calories: 165, Protein: 20.22 },
    //   { nbd: 5930, name: "Ham", Calories: 239, Protein: 16.06 },
    //   { nbd: 6134, name: "Granola", Calories: 489, Protein: 13.67 },
    //   { nbd: 6345, name: "Avacado", Calories: 149, Protein: 2 },
    // ]

    // const width = 900
    // const height = 500

    // const Calories= [717, 143, 222, 379, 144, 165, 239, 499, 149]
    // const Protein = [.85, 12.56, 4.1, 1.09, 28.04, 20.22, 16.06, 13.67, 2]

    // const xDim = "Calories"
    // const yDim = "Protein"

    // const x: any = d3.scaleLinear()
    //   .domain(d3.extent(data, d => d[xDim]))
    //   .range([10, width - 10]);
    
    // const y: any = d3.scaleSqrt()
    //   .domain(d3.extent(data, d => d[yDim]))
    //   .range([height - 10, 10])
    
    // const x: any = d3.scaleLinear()
    //   .domain([143, 717])
    //   .range([10, width - 10]);

    // const y: any = d3.scaleSqrt()
    //   .domain([.85, 28.04])
    //   .range([height - 10, 10])
    
    // const superprotein = Protein.map((value) => {
    //   return y(value)
    // })

    // const delaunay = d3.Delaunay.from([[717, 490], [143, 202.21], [222, 386.9], [379, 476.60], [144, 97.65], [165, 151.34], [239, 185.38], [499, 435.97], [149, 10]])
    // let pts = delaunay.points
    
    


    
    
    
      
    


    // const delaunay = new Delaunay(Float64Array.of(688.049889135255, 442.9108154206528, 701.2893569844789, 454.2472257081326, 838.4124168514412, 462.97344301231294, 343.82372505543236, 253.72455278526775, 360.84589800443456, 243.77634769071892, 325.8558758314856, 257.34051753128847, 293.7028824833703, 262.72885376043996, 365.5742793791574, 233.70533263109215, 391.10753880266077, 245.74425377236798, 375.97671840354764, 243.08864466917612))
    // let pts = delaunay.points

  return (
    <div>
      <svg className="h-5/6 w-screen" ref={svgRef}></svg>
      <button onClick={() => { randomdata = Array.from({ length: 100 }, () => [random(), random()]); setData(randomdata)}}>Update Data</button>
    </div>
  )
}

export default NodeMap
