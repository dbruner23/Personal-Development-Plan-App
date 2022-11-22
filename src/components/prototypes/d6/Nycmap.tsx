import React, { useState, useRef, useEffect } from 'react'
import nycstreets from '../../../data/streetsManhattanBrooklyn.json'
import nycintersections from '../../../data/intersectionsnyc.json'
import * as d3 from 'd3'


const NycMap = () => {
    const [data, setData] = useState<any>(nycintersections)
    const nycstreetsarr = nycstreets as Array<any>
    console.log(nycstreetsarr[0])
    const latLngArr = Array.from(data, (point: any) => [+point.geometry.coordinates[0], +point.geometry.coordinates[1]])
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (data !== undefined) { Map(data) }
    }, [data])

    const Map = (data: any) => {
        d3.selectAll("svg > *").remove();
        const svg: any = d3.select(svgRef.current)
        const width = window.innerWidth
        const height = window.innerHeight
        const projection = d3.geoMercator().scale(150000).center([-73.97969860435887,
            40.63]).translate([width / 2, height])
        const nycgeoPath = d3.geoPath()
            .projection(projection)
        // let streetStart = [];
        
        function handleMouseover(this: any, e:any, d:any) {
            const measure = nycgeoPath.measure(d);
            d3.select(this).attr('stroke', 'orangered')
        }
        
        const projectlatlng: any[] = []
        svg.attr("viewBox", [0, 0, width, height])
            .attr("cursor", "crosshair")
        for (let i = 0; i < data.length; i++) {
            projectlatlng.push(projection([data[i].geometry.coordinates[0], data[i].geometry.coordinates[1]]))
        }
        const delaunay = d3.Delaunay.from<any>(projectlatlng, d => d[0], d => d[1]);

        svg.append("defs")
            .append("style")
            .text("circle.highlighted { stroke: orangered; fill: orangered; }");

        // const mesh = svg.append("path")
        //     .attr("fill", "none")
        //     .attr("stroke", "#ccc")
        //     .attr("stroke-width", 1)
        //     .attr("d", delaunay.render());

        const g = svg.append("g");

        const streets = g
            .selectAll("path")
            .data(nycstreets)
            .enter()
            .append("path")
            .attr("stroke", "#333")
            .attr("stroke-width", .5)
            .attr("fill", "none")
            .attr("d", nycgeoPath)
            .on("mouseover", handleMouseover);

        const nodes = g
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("transform", (d: any) => `translate(${projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])})`)
            .attr("r", 1)
            .on("click", (e: any, d: any) => {
                console.log(d)
            
            });

        // const text = g
        //     .append("title")
        //     .data(data)
        //     .text((d: any) => d.name);

        let transform: { k: number; invert: (arg0: [number, number]) => any };

        const zoom = d3.zoom().on("zoom", e => {
            g.attr("transform", (transform = e.transform));
            // mesh.attr("transform", (transform = e.transform));
            g.style("stroke-width", 3 / Math.sqrt(transform.k));
            nodes.attr("r", 1.5 / Math.sqrt(transform.k));
        });

        let start = 0;
        let path: number[] = [];

        return svg
            //path set
            .on("click", (event: any, d: any) => {
                start = delaunay.find(...d3.pointer(event));
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
        <div className="relative flex justify-center items-center w-screen h-screen">
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default NycMap

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