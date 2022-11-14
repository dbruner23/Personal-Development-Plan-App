import React, { useState, useRef, useEffect } from 'react'
import airports from '../../../data/airports.json'
import * as d3 from 'd3'


const DelaunayMap = () => {
    const [data, setData] = useState<any[]>(airports)
    const latLngArr = Array.from(data, (airport) => [+airport.longitude, +airport.latitude])
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (data !== undefined) { Map(data) }
    }, [data])

    const Map = (data:any) => {
        d3.selectAll("svg > *").remove();
        const svg: any = d3.select(svgRef.current)
        const projection = d3.geoNaturalEarth1()
        const outline : any = { type: "Sphere" }
        const width = window.innerWidth
        const projectlatlng:any[] = []
        const height = () => {
            const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
            const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
            projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
            return dy;
        }
        
        svg.attr("viewBox", [0, 0, width, height()])
            .attr("cursor", "crosshair")
        for (let i = 0; i < data.length; i++) {
            projectlatlng.push(projection([data[i].longitude, data[i].latitude]))
        }
        const delaunay = d3.Delaunay.from<any>(projectlatlng, d => d[0], d => d[1]);
        console.log(delaunay)

        svg.append("defs")
            .append("style")
            .text("circle.highlighted { stroke: orangered; fill: orangered; }");

        const mesh = svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1)
            .attr("d", delaunay.render());

        const g = svg.append("g");

        const nodes = g
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("transform", (d: any) => `translate(${projection([d.longitude, d.latitude])})`)
            .attr("r", 1);
                
        // const text = g
        //     .append("title")
        //     .data(data)
        //     .text((d: any) => d.name);
                
        let transform: { k: number; invert: (arg0: [number, number]) => any };

        const zoom = d3.zoom().on("zoom", e => {
            g.attr("transform", (transform = e.transform));
            mesh.attr("transform", (transform = e.transform));
            g.style("stroke-width", 3 / Math.sqrt(transform.k));
            nodes.attr("r", 1.5 / Math.sqrt(transform.k));
        });

        let start = 0;
        let path: number[] = [];
                
        return svg
            //path set
            .on("click", (event: any) => {
                start = delaunay.find(...d3.pointer(event));
                console.log(start)
                console.log(nodes)
                path = [];
            })
            .call(zoom)
            .call(zoom.transform, d3.zoomIdentity)
            //recalc on zoom 
            .on("pointermove", (event: any) => {
                path = findPath(d3.pointer(event), start, delaunay);
                // pathMesh.attr("d", renderPath(path, delaunay.points));
                const p: [number, number] = transform.invert(d3.pointer(event));
                const i = delaunay.find(...p);
                
                // nodes.attr("fill", (d: any, j: number) => { i === j ? '#fc2500' : '#000000'})
                nodes.classed("highlighted", (_: any, j: number) => (i === j) || (path.includes(j)));
                // d3.select(nodes.nodes()[i]).raise();
                // mesh.attr("d", delaunay.render())
            })
            .node()
    }

    
    

    return (
        <div className="flex justify-center items-center w-screen h-screen p-10">
            <svg ref={svgRef}></svg>
        </div>
  )
}

export default DelaunayMap

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