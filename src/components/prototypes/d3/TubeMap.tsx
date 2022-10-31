import React, { useEffect, useRef } from 'react'
import { select } from 'd3'
import * as d3 from 'd3'

type Props = {}

const TubeMap = (props: Props) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const data = {
        nodes: [
            { id: "Senior-Minister", coords: [200, 200] },
            { id: "Mission-Ready-Student", coords: [250, 150] },
            { id: "Comp-Sci-Student", coords: [250, 250] },
            { id: "Intern-Software-Developer", coords: [300, 150] },
            { id: "Junior-Software-Developer", coords: [350, 150]},
            { id: "Software-Engineer", coords: [450, 150] },
            { id: "Senior-Software-Engineer", coords: [550, 150] },
            { id: "Engineering-Lead", coords: [650, 150] },
            { id: "Engineering-Manager", coords: [650,200]},
            { id: "CTO", coords: [700, 175] },
            { id: "Junior-Data-Scientist", coords: [300, 225] },
            { id: "Senior-Data-Scientist", coords: [400, 225] },
            { id: "Machine-Learning-Engineer", coords: [350, 200]},
            { id: "Product-Manager", coords: [450, 225]},
            { id: "Lead Data Scientist", coords: [550, 215]}
        ],
        links: [
            { source: "Senior-Minister", target: "Mission-Ready-Student" },
            { source: "Mission-Ready-Student", target: "Intern-Software-Developer" },
            { source: "Intern-Software-Developer", target: "Junior-Software-Developer" },
            { source: "Junior-Software-Developer", target: "Software-Engineer" },
            { source: "Software-Engineer", target: "Senior-Software-Engineer" },
            { source: "Senior-Software-Engineer", target: "Engineering-Lead" },
            { source: "Senior-Software-Engineer", target: "Engineering-Manager" },
            { source: "Engineering-Manager", target: "CTO" },
            { source: "Junior-Software-Developer", target: "Junior-Data-Scientist" },
            { source: "Software-Engineer", target: "Junior-Data-Scientist" },
            { source: "Junior-Data-Scientist", target: "Senior-Data-Scientist" },
            { source: "Senior-Data-Scientist", target: "Lead-Data-Scientist" },
            { source: "Senior-Data-Scientist", target: "Product-Manager"},
            { source: "Junior-Data-Scientist" , target: "Machine-Learning-Engineer" },
            { source: "Machine-Learning-Engineer", target: "Lead-Data-Scientist" },
        ]
    }
    useEffect(() => {
        if (data)drawMap(data)
    })

    const drawMap = (data:any) => {
        const svg: any = select(svgRef.current)
        const x: any = d3.scaleLinear([0, 1000], [0, 620]);
        const y: any = d3.scaleLinear([0, 1000], [0, 620]);

        const width = window.innerWidth;
        const height = window.innerHeight;

        let positions: number[] | null = []

        // const extractCoords = () => {
        //     for (d in data.nodes)
        // }
        


        // svg
        //     .attr("viewBox", [0, 0, width, height])
        //     .style("cursor", "crosshair");
        
        // svg
        //     .append("defs")
        //     .append("style")
        
        // const g = svg.append("g");

        // const points = g
        //     .selectAll(".node")
        //     .data(data.)
        //     .join("circle")
        //     .attr("cx", (d: any) => x(data.nodes[d].coords[0]))
        //     .attr("cy", (d: any) => y(data.nodes[d].coords[1]));

        
    }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
        <svg ref={svgRef} className="h-5/6 w-screen overflow-visible"></svg>
    </div>
  )
}

export default TubeMap