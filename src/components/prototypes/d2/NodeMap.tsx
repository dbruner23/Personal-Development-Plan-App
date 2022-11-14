import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { select, xml, Delaunay, randomBates} from 'd3'
import * as d3 from 'd3'

const NodeMap = () => {
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
      .text(`circle.highlighted { stroke: orangered; fill: orangered; }`);

    const delaunay = d3.Delaunay.from<any>(data, d => x(d[0]), d => y(d[1]));
    
    const mesh = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .attr("d", delaunay.render());
    
    const pathMesh = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "orangred")
      .attr("stroke-width", 2)

    const g = svg.append("g");

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

    let start = 0;
    let path: number[] = [];
    
    return (
      svg
      //path set
      .on("click", (event: any) => {
        start = delaunay.find(...d3.pointer(event));
        path = [];        
      })
      .call(zoom)
      .call(zoom.transform, d3.zoomIdentity)
      //recalc on zoom 
      .on("pointermove", (event: any) => {
        path = findPath(d3.pointer(event), start, delaunay);
        pathMesh.attr("d", renderPath(path, delaunay.points));
        const p: [number, number] = transform.invert(d3.pointer(event));
        const i = delaunay.find(...p);
        points.classed("highlighted", (_: any, j: number) => (i === j) || path.includes(j));
        // d3.select(points.nodes()[i]).raise();
        // mesh.attr("d", delaunay.render())
      })
      .node()
    );
  }


  return (
    <div>
      <svg className="h-90vh w-screen" ref={svgRef}></svg>
      <button className="h-10vh"onClick={() => { randomdata = Array.from({ length: 100 }, () => [random(), random()]); setData(randomdata)}}>Update Data</button>
    </div>
  )
}

export default NodeMap

function findPath(pointer: [number, number], start: number, delaunay: any) {
  const path = [start];
  let i = start;
  let c;
  while ((c = delaunay._step(i, ...pointer)) >= 0 && c !== i && c !== start) {
    path.push((i = c));
  }
  return path;
}

function renderPath(path: number[], points: any) {
  
  if (path.length > 1) {
    const p = d3.path();
    p.moveTo(...getPoint(0, points));

    path.slice(1).forEach((nodeIndex) => {
      p.lineTo(...getPoint(nodeIndex, points));
      console.log()
      p.moveTo(...getPoint(nodeIndex, points));
    });

    return p.toString();
  }
  return "";
}

function getPoint(index: number, points: number[]): [number, number] {
  return [points[2 * index]!, points[2 * index + 1]!]
}