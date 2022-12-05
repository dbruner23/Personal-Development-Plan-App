import React, { useState, useRef, useEffect } from 'react'
import landlines from '../../../data/landlines.json'
import airports from '../../../data/airports.json'
import flights from '../../../data/flights.json'
import Image from 'next/future/image'
import close from 'public/x.svg'
import dollar from 'public/dollar-sign.svg'
import { Button } from '@mui/material'
import * as d3 from 'd3'
import { render } from 'react-dom'
import { FeaturedPlayList, LocalConvenienceStoreOutlined } from '@mui/icons-material'
import { GeoPermissibleObjects } from 'd3'

interface IUserInput {
    goal: string, seekscope: string, interestfields: any[], currentjob: string, worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
}

type Props = {
    persona: string,
    input: { currentPosition: string, goal: string },
    lifestyleInputStrings: { extrahours: string, fulltimeEd: string, relocation: string, remotework: string },
    setPath: React.Dispatch<React.SetStateAction<any[]>>,
    currentPos: string,
    setCurrentPos: React.Dispatch<React.SetStateAction<string>>,
    goal: string,
    setGoal: React.Dispatch<React.SetStateAction<string>>
}

const DelaunayMap = ( props: Props ) => {
    const { persona, input, lifestyleInputStrings, setPath, currentPos, setCurrentPos, goal, setGoal } = props; 
    const { extrahours, fulltimeEd, relocation, remotework } = lifestyleInputStrings; 
    const careerNodes = airports.filter((node: any) => {
        return node.data != undefined
    })
    const [data, setData] = useState<any[]>(careerNodes)
    const [potentialNode, setPotentialNode] = useState('')
    // const latLngArr = Array.from(data, (airport) => [+airport.longitude, +airport.latitude])
    const svgRef = useRef<SVGSVGElement>(null)
    const infobox = useRef<HTMLDivElement>(null)
    const [infoboxClosed, setInfoBoxClosed] = useState(true)

    useEffect(() => {
        if ((data !== undefined) && (landlines !== null) && (flights !== null)) { Map(landlines, data, flights)}   
    }, [data, currentPos, goal, lifestyleInputStrings])  

    const Map = (geojson: any, data:any, connections:any) => {
        d3.selectAll("svg > *").remove();
        const svg: any = d3.select(svgRef.current)
        const width = window.innerWidth
        const height = window.innerHeight
        const projection = d3.geoOrthographic().scale(1700).rotate([-162, 38]).translate([width / 2, height / 2])
        const projectlatlng: any[] = []
        const geoPathGenerator = d3.geoPath()
            .projection(projection)
        const sphere: any = ({ type: "Sphere" })
        const testflight: any = ({
            type: 'Feature',
            geometry: {
                type: 'MultiLineString',
                coordinates: [[[150.789001464844, -34.5611000061035], [170.985000610352, -42.7136001586914], [174.792007446, -37.0080986023]]]
            }
        })
        const graticule = d3.geoGraticule10()
        const sensitivity = 75;
        // console.log(graticule)
        // const height = () => {
        //     const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
        //     const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
        //     projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
        //     return dy;
        // }
        
        
        svg.attr("viewBox", [0, 0, width, height])
        for (let i = 0; i < data.length; i++) {
            projectlatlng.push(projection([data[i].longitude, data[i].latitude]))
        }
        const delaunay = d3.Delaunay.from<any>(projectlatlng, d => d[0], d => d[1]);

        function getVisibility(d:any) {
            const visible = geoPathGenerator(
                { type: 'Point', coordinates: [d.longitude, d.latitude] });
            return visible ? 'visible' : 'hidden';
        }
         
        // const div = d3.select("body")
        //     .append("div")
        //         .attr("class", "tooltip")
        //         .style("display", "flex")
        //         .style("width", "68px")
        //         .style("height", "20px")
        //         .style("position", "absolute")
        //         .style("background", "lightsteelblue")
        //         .style("opacity", 0);

        svg.append("defs")
            .append("style")
            .text("circle.highlighted { stroke: orangered; fill: orangered; }");

        // const mesh = svg.append("path")
        //     .attr("fill", "none")
        //     .attr("stroke", "#ccc")
        //     .attr("stroke-width", .5)
        //     .attr("d", delaunay.render());

        const g = svg.append("g");

        const land = g
            .append('path')
            .attr('d', geoPathGenerator(geojson))
            .attr('fill', '#AFC3FF')
        
        const geoGraticule = g
            .append("path")
            .attr("d", geoPathGenerator(graticule))
            .attr("stroke", "#ddd")
            .attr("stroke-width", 1)
            .attr("fill", "none")

        const outline = g
            .append("path")
            .attr("id", "outline")
            .attr("d", geoPathGenerator(sphere))
            .attr("stroke", "#ccc")
            .attr("fill", "none")

        const nodes = g
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("stroke", "#4B7DEB")
            .attr("stroke-width", 1.5)
            .attr("transform", (d: any) => `translate(${projection([d.longitude, d.latitude])})`)
            .attr("r", 8)
            .attr("visibility", getVisibility)
            .attr("cursor", "pointer")
            .on("click", (e: any, d: any) => {
                setInfoBoxClosed(false)
                setPotentialNode(d.data.name)
                d3.select("#tooltip")
                    .style("left", ((e.pageX - 120) + "px"))
                    .style("top", ((e.pageY + 15) + "px"));
                d3.select("#tooltipName").html(d.data.name);
                if (d.data.cost) {
                    d3.select("#tooltipSalary").html("Cost: $" + d.data.cost + "p/a")
                } else if (d.data.salary) {
                    d3.select("#tooltipSalary").html("Salary: $" + d.data.salary + "p/a")
                };
                d3.select("#tooltipTime").html("Avg. time: " + d.data.time + "yrs");
                d3.select("#tooltipSummary").html(d.data.summary);
                
            });
                
        const text = g
            .selectAll(".label")
            .data(data)
            .join("text")
            .attr("class", "label")
            .text((d: any) => {
                return d.data.name
            })
            .attr("transform", (d: any) => {
                const adjustlong = parseFloat(d.longitude) + .3;
                const newlong = adjustlong.toString(); 
                return `translate(${projection([adjustlong , d.latitude])})`
            })
            .attr("font-size", 6); 
                
        let transform: { k: number; invert: (arg0: [number, number]) => any };

        const zoom = d3.zoom().on("zoom", e => {
            g.attr("transform", (transform = e.transform));
            // mesh.attr("transform", (transform = e.transform));
            g.style("stroke-width", 3 / Math.sqrt(transform.k));
            nodes.attr("r", 5 / Math.sqrt(transform.k));
        });

        const startDataArr = data.filter((node: any) => { return node.data.name == currentPos })
        const startData = (startDataArr[0]);
        let destinationData = { data: { name: "" } };
        let pathsStoD: any[] = []
        
        // const getStartDestData = (inputCurrPos: any, inputGoal: any) => {
        //     const startDataArr = data.filter((node: any) => { return node.data.name == inputCurrPos })
        //     startData = startDataArr[0];
        //     const destinationDataArr = data.filter((node: any) => { return node.data.name == inputGoal })
        //     destinationData = destinationDataArr[0]
        // }

        if (goal !== "") {
            const destinationDataArr = data.filter((node: any) => { return node.data.name == goal })
            destinationData = destinationDataArr[0]
            pathsStoD = getAllPaths(startData, destinationData)
        }

        
        // const startData = nodes._groups[0][17].__data__;
        // const destinationData = nodes._groups[0][0].__data__; 
        
        //recursive function to get all paths between any two nodes linked by "flights"
        function getAllPaths(start: any, destination: any) {
            const result: any[][] = []
            const path: any[] = []
            const visited: any[] = []
            
            const initialsources = connections.filter(function (connection: any) {
                    return connection.target.data.position === destination.data.name
            })

            initialsources.forEach((source: any) => {
                tracePaths(source)
            })

            function tracePaths(link: any) {
                path.push(link);
                visited.push(link);

                if (link.source.data.position == start.data.name) {
                    result.push([...path])
                }

                const adjacentsources = (connections.filter(function (connection: any) {
                    return connection.target.data.position === link.source.data.position
                }))
                for (let i = 0; i < adjacentsources.length; i++) {
                    if (visited.includes(adjacentsources[i])) {
                        continue
                    } else {
                        tracePaths(adjacentsources[i]);
                    }
                }
                path.pop()
            }

            if (result.length === 0 && (destinationData.data.name !== '')) { alert("We're sorry, there are no defined paths between these points")}
            return(result)
        }

        //utility to disable or enable paths based on user lifestyle preference input
        const lifestylefitpaths: any[] = []
        const nolifestylefitpaths: any[] = []
        
        for (let i = 0; i < pathsStoD.length; i++) {
            if (
                (pathsStoD[i].some((link: any) => {
                    (link.target.data.extrahours === extrahours) || (link.target.data.fulltimeEd === fulltimeEd) || (link.target.data.relocation === relocation) || (link.target.data.remotework === remotework)
                }))
            ) {
                nolifestylefitpaths.push(pathsStoD[i])
            } else {
                lifestylefitpaths.push(pathsStoD[i])
            }
        }
        
        //utility to find recommended paths 1-3 out of lifestyle fit paths based on minimum time
        let rec1path: any[] = []
        let rec2path: any[] = []
        let rec3path: any[] = []

        if (lifestylefitpaths.length > 0) {
            let minTime = 100;
            let minTime2 = 100;
            let minTime3 = 100;
            for (let i = 0; i < lifestylefitpaths.length; i++) {
                const progresspath = lifestylefitpaths[i].slice(1)
                const totaltime = progresspath.reduce((acc: any, curr: { target: { data: { time: any } } }) => {
                    return acc + curr.target.data.time
                }, 0);
                if (totaltime < minTime) {
                    minTime = totaltime;
                    rec3path = rec2path;
                    rec2path = rec1path;
                    rec1path = lifestylefitpaths[i];
                } else if (totaltime < minTime2) {
                    minTime2 = totaltime;
                    rec3path = rec2path;
                    rec2path = lifestylefitpaths[i]
                } else if (totaltime < minTime3) {
                    minTime3 = totaltime;
                    rec3path = lifestylefitpaths[i]
                }
            }
        }
        
        function computeAndSetPath(nodearray:any) {
            const rec1positions = nodearray.map((node:any) => { return node.target.data.position })
            let dataArray:any = []
            for (let i = 0; i < rec1positions.length; i++) {
                const nodetoadd = data.find((node: any) => node.data.name === rec1positions[i])
                dataArray.push(nodetoadd)
            } 
            setPath(dataArray)
        } 
        computeAndSetPath(rec1path)


        function nodeColor(d: any) {
            if (d === startData) {
                return "#00B0FF";
            } else if (d === destinationData) {
                return "#39B681";
            } else {
                return "#fd8d3c";
            }
        }

        function flightColor(d: any) {
            if (rec3path.includes(d)) {
                return "#7A67EC"
            } else if (rec2path.includes(d)) {
                return "#FFC646";
            } else if (rec1path.includes(d)) {
                return "#39B681"
            } else if (nolifestylefitpaths.includes(d)) {
                return "#ccc"
            } else { return "#ccc" }
        }

        function addFlightPath(connection:any) {      
            let geoInterpolator = d3.geoInterpolate([connection.source.data.longitude, connection.source.data.latitude],
                [connection.target.data.longitude, connection.target.data.latitude])
            let u = 0;

            const flightdata: any = ({
                type: "Feature",
                geometry: {
                    type: 'LineString',
                    coordinates: geoInterpolator(u)
                }
            }) 
            while (u <= 1) {
                u+= 0.01
            }

            const link = g
                .append("path")
                .attr("d", geoPathGenerator(flightdata))
                .attr("stroke", flightColor(connection))
                .attr("fill", "none")
                .attr("cursor", "pointer")
                .on("mouseenter", function (e: any, d: any) {
                    d3.select(this)
                    .attr("stroke-width", 5) 
                })
                .on("mouseleave", function (d: any) {
                    d3.select(this)
                        .attr("stroke-width", 3)
                })
                
            return(link)
                 
        }

        
        function addMultiFlightPath(multiconnectionarr: any[]) {
            let flightdata: any = ({
                type: 'Feature',
                geometry: {
                    type: 'MultiLineString',
                    coordinates: []
                }
            })
            for (let i = 0; i < multiconnectionarr.length; i++) {
                flightdata.geometry.coordinates.push([[multiconnectionarr[i].source.data.longitude, multiconnectionarr[i].source.data.latitude],
                    [multiconnectionarr[i].target.data.longitude, multiconnectionarr[i].target.data.latitude]]) 
            }

            const links = g
                .append("path")
                .classed("flightpaths", true)
                .attr("d", geoPathGenerator(flightdata))
                .attr("stroke", "#ddd")
                .attr("stroke-width", 3)
                .attr("fill", "none")
                .attr("stroke", flightColor(multiconnectionarr[multiconnectionarr.length-1]))
                .attr("cursor", "pointer")
                .on("mouseenter", function (e: any, d: any) {
                    d3.select(this)
                        .attr("stroke-width", 5)
                })
                .on("mouseleave", function (d: any) {
                    d3.select(this)
                        .attr("stroke-width", 3)
                })
                .on("click", (d: any) => {
                    computeAndSetPath(multiconnectionarr) 
                })
        

        } 
        // addFlightPath(rec1path[0])
        addMultiFlightPath(rec3path)
        addMultiFlightPath(rec2path)
        addMultiFlightPath(rec1path)
        
        
        // for (let i = 0; i < rec1path.length; i++) {
        //     addFlightPath(rec1path[i])
        // }
        // addMultiFlightPath(rec2path)
        // addMultiFlightPath(rec3path)

        nodes
            .attr("fill", (d: any) => nodeColor(d))
            .on("mouseenter", function (e: any, d: any) {
                const nodesArr = (nodes.nodes())
                const index = (nodesArr.indexOf(this))
                const textArr = (text.nodes())
                d3.select(textArr[index])
                    .transition()
                    .attr("font-size", 12)
            })
            .on("mouseleave", function (e: any, d: any) {
                const nodesArr = (nodes.nodes())
                const index = (nodesArr.indexOf(this))
                const textArr = (text.nodes())
                d3.select(textArr[index])
                    .transition()
                    .attr("font-size", 6)
            })

        // let path: number[] = [];
        // console.log(nodes._groups[0].findIndex((node: any) => {
        //     return node.__data__.data.name === "Senior Software Engineer"
        // }))
            
            

                
        return svg
            //path set
            .call(d3.drag().on('drag', (event, d) => {
                
                const rotate = projection.rotate()
                const k = sensitivity / projection.scale()
                projection.rotate([
                    rotate[0] + event.dx * k,
                    rotate[1] - event.dy * k
                ])
                g.selectAll(".flightpath").remove()
                g.selectAll(".flightpaths").remove()
                
                land.attr('d', geoPathGenerator(geojson))
                geoGraticule.attr('d', geoPathGenerator(graticule))
                addMultiFlightPath(rec1path)
                // links.attr('d', geoPathGenerator(connectionFeatures))
                text.attr("transform", (d: any) => {
                    const adjustlong = parseFloat(d.longitude) + .3;
                    const newlong = adjustlong.toString();
                    return `translate(${projection([adjustlong, d.latitude])})`
                })
                nodes.attr("transform", (d: any) => `translate(${projection([d.longitude, d.latitude])})`).attr("visibility", getVisibility)
            }))
            .on("click", (event: any, d: any) => {
                // start = delaunay.find(...d3.pointer(event));
                // console.log(start)
                // if (projection !== undefined) { console.log(projection.invert(d3.pointer(event))) }
                
                
                // path = [];
            })
            .call(zoom)
            .call(zoom.transform, d3.zoomIdentity)
            //recalc on zoom 
            // .on("pointermove", (event: any) => {
            //     path = findPath(d3.pointer(event), start, delaunay);
            //     // pathMesh.attr("d", renderPath(path, delaunay.points));
            //     const p: [number, number] = transform.invert(d3.pointer(event));
            //     const i = delaunay.find(...p);
                
            //     // nodes.attr("fill", (d: any, j: number) => { i === j ? '#fc2500' : '#000000'})
            //     nodes.classed("highlighted", (_: any, j: number) => (i === j) || (path.includes(j)));
            //     // d3.select(nodes.nodes()[i]).raise();
            //     // mesh.attr("d", delaunay.render())
            // })
            .node();
            
    }

    
    

    return (
        <main className="flex justify-center items-center w-screen h-screen z-10">
            <svg className="w-full h-full" ref={svgRef}></svg>
            <div ref={infobox} id="tooltip" className={`flex flex-col justify-start items-center absolute ${(infoboxClosed === true) ? 'opacity-0' : 'opacity-90'} w-60 h-fit bg-[#eff1f4] rounded-md p-2`}>
                    <button onClick={() => setInfoBoxClosed(true) } className="flex self-end w-5 h-5">
                        <Image
                            alt="close"
                            src={close}
                            >
                        </Image>    
                    </button>
                    <div className="flex w-full justify-start px-4 gap-2">
                        <Image
                            alt="photo"
                            width="40"
                            height="40"
                            src="data:image/jpeg;base64,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"
                            className="object-cover rounded-md"
                        >    
                        </Image>
                        <div id="tooltipName" className="flex w-full justify-center items-center text-center"></div>    
                    </div> 
                    
                    <div id="tooltipSalary" className="flex justify-center items-center mt-2 text-xs"></div>
                    <div id="tooltipTime" className="flex justify-center items-center text-xs"></div>
                    <div id="tooltipSummary" className="flex w-full justify-start mt-2 text-xs"></div>
                <Button onClick={() => { setCurrentPos(potentialNode); setInfoBoxClosed(true); }} className="bg-[#00B0FF] w-40" variant="contained"
                    sx={{ m: 0.5 }}>Set as Current</Button>
                <Button onClick={() => { setGoal(potentialNode); setInfoBoxClosed(true); }} className="bg-[#39B681] w-40" variant="contained"
                    sx={{ m: 0.5 }}>Set as Goal</Button>
                </div>
        </main>
  )
}

export default DelaunayMap

// function findPath(pointer: [number, number], start: number, delaunay: any) {
//     const path = [start];
//     let i = start;
//     let c;
//     while ((c = delaunay._step(i, ...pointer)) >= 0 && c !== i && c !== start) {
//         path.push((i = c));
//     }
//     return path;
// }

// function renderPath(path: number[], points: any) {

//     if (path.length > 1) {
//         const p:any = d3.path();
//         p.moveTo(...getPoint(0, points));

//         path.slice(1).forEach((nodeIndex) => {
//             p.lineTo(...getPoint(nodeIndex, points));
//             p.moveTo(...getPoint(nodeIndex, points));
//         });

//         return p.toString();
//     }
//     return "";
// }

// function getPoint(index: number, points: number[]): [number, number] {
//     return [points[2 * index]!, points[2 * index + 1]!]
// }

// function drag(projection :any) {
//     let v0:any, q0:any, r0:any, a0 :any, l:any;

//     function pointer(event:any, that:any) {
//         const t :any = d3.pointers(event, that);

//         if (t.length !== l) {
//             l = t.length;
//             if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
//             dragstarted.apply(that, [event, that]);
//         }

//         // For multitouch, average positions and compute rotation.
//         if (l > 1) {
//             const x = d3.mean(t, p => p[0]);
//             const y = d3.mean(t, p => p[1]);
//             const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
//             return [x, y, a];
//         }

//         return t[0];
//     }

//     function dragstarted(event :any) {
//         v0 = versor.cartesian(projection.invert(pointer(event, this)));
//         q0 = versor(r0 = projection.rotate());
//     }

//     function dragged(event :any) {
//         const p = pointer(event, this);
//         const v1 = versor.cartesian(projection.rotate(r0).invert(p));
//         const delta = versor.delta(v0, v1);
//         let q1 = versor.multiply(q0, delta);

//         // For multitouch, compose with a rotation around the axis.
//         if (p[2]) {
//             const d = (p[2] - a0) / 2;
//             const s = -Math.sin(d);
//             const c = Math.sign(Math.cos(d));
//             q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
//         }

//         projection.rotate(versor.rotation(q1));

//         // In vicinity of the antipode (unstable) of q0, restart.
//         if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
//     }

//     return d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged);
// }