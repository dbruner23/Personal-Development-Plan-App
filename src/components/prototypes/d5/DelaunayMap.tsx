import React, { useState, useRef, useEffect } from 'react'
import landlines from '../../../data/landlines.json'
import airports from '../../../data/airports.json'
import flights from '../../../data/flights.json'
import * as d3 from 'd3'
import { render } from 'react-dom'
import { FeaturedPlayList, LocalConvenienceStoreOutlined } from '@mui/icons-material'
import { GeoPermissibleObjects } from 'd3'


const DelaunayMap = () => {
    const [data, setData] = useState<any[]>(airports)
    const latLngArr = Array.from(data, (airport) => [+airport.longitude, +airport.latitude])
    const svgRef = useRef<SVGSVGElement>(null)

    //To be converted to string. "false" in the data will mean "a person can't do this if they aren't willing/able to ________" 
    const [lifestyleInput, setLifestyleInput] = useState({ extrahours: true, fulltimeEd: true, relocation: true, remotework: true })
    const [lifestyleInputStrings, setLifestyleInputStrings] = useState({ extrahours: "true", fulltimeEd: "true", relocation: "true", remotework: "true" })
    const { extrahours, fulltimeEd, relocation, remotework } = lifestyleInputStrings;

    useEffect(() => {
        if ((data !== undefined) && (landlines !== null) && (flights !== null)) { Map(landlines, data, flights)}   
    }, [data])

    const Map = (geojson: any, data:any, connections:any) => {
        d3.selectAll("svg > *").remove();
        const svg: any = d3.select(svgRef.current)
        const width = window.innerWidth
        const height = window.innerHeight
        const projection = d3.geoOrthographic().scale(700).rotate([-156, 33]).translate([width / 2, height / 2])
            // .center([159.87124736814, -37.83332894278]).translate([width / 2, height / 2])
        const projectlatlng: any[] = []
        const geoPathGenerator = d3.geoPath()
            .projection(projection)
        const sphere: any = ({ type: "Sphere" })
        const testflight: any = ({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [[150.789001464844, -34.5611000061035], [170.985000610352, -42.7136001586914]]
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
            .attr("cursor", "crosshair")
        for (let i = 0; i < data.length; i++) {
            projectlatlng.push(projection([data[i].longitude, data[i].latitude]))
        }
        const delaunay = d3.Delaunay.from<any>(projectlatlng, d => d[0], d => d[1]);

        function getVisibility(d:any) {
            const visible = geoPathGenerator(
                { type: 'Point', coordinates: [d.longitude, d.latitude] });
            return visible ? 'visible' : 'hidden';
        }

        const createConnectionPath = (patharr: any[]) => {
            const connectionArr = patharr.map((connection: any) => {
                return (
                    {
                        type: "Feature",
                        geometry: {
                            type: 'LineString',
                            coordinates: [[connection.source.data.longitude, connection.source.data.latitude],
                            [connection.target.data.longitude, connection.target.data.latitude]]
                        }
                    }
                )
            })
            return connectionArr
        }

        const connectionFeatures : any = createConnectionPath(connections);
         

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
            .attr('fill', '#ccc')
        
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
        
        // const link = g
        //     .append("path")
        //     .attr("id", "outline")
        //     .attr("d", geoPathGenerator(testflight))
        //     .attr("stroke", "#ccc")
        //     .attr("fill", "none")

        
        // const links = g
        //     .selectAll(".connections")
        //     .data(connectionFeatures)
        //     .join("path")
        //     .classed("connections", true)
        //     .attr("d", geoPathGenerator)
        //     .attr("stroke", "#ccc")
        //     .attr("stroke-width", 1)
        //     .attr("fill", "none")
            

        const nodes = g
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("transform", (d: any) => `translate(${projection([d.longitude, d.latitude])})`)
            .attr("r", 1)
            .attr("visibility", getVisibility)
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

        const startData = nodes._groups[0][2788].__data__;
        const destinationData = nodes._groups[0][1691].__data__;
        const careerNodes = data.filter((node:any) => {
            return node.position != undefined
        }) 

        function nodeColor(d: any) {
            if ( d === startData ) {
                return "#11823b"
            } else if (d === destinationData) {
                return "#fd8d3c";
            }
        }
        
        //recursive function to get all paths between any two nodes linked by "flights"
        function getAllPaths(start: any, destination: any) {
            const result: any[][] = []
            const path: any[] = []
            const visited: any[] = []
            
            const initialsources = (connections.filter(function (connection: any) {
                return connection.target.data.position === destination.position
            }))

            initialsources.forEach((source: any) => {
                tracePaths(source)
            })

            function tracePaths(link: any) {
                path.push(link);
                visited.push(link);

                if (link.source.data.position == start.position) {
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
            if (result.length === 0 ) { alert("We're sorry, there are no defined paths between these post")}
            return(result)
        }
        
        
        const pathsStoD: any = getAllPaths(startData, destinationData)     
        

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
                console.log(totaltime)
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

        function flightColor(d: any) {
            if (rec1path.includes(d)) {
                return "#11823b"
            } else if (rec2path.includes(d)) {
                return "#fd8d3c";
            } else if (rec3path.includes(d)) {
                return "#ff0000"
            } else if (nolifestylefitpaths.includes(d)) {
                return "#cccc"
            }
        }

        function addFlightPath(connection:any) {      
            const flightdata: any = ({
                type: "Feature",
                geometry: {
                    type: 'LineString',
                    coordinates: [[connection.source.data.longitude, connection.source.data.latitude],
                    [connection.target.data.longitude, connection.target.data.latitude]]
                }
            })        
            g.append("path")
            .classed("flightpath", true)
            .attr("d", geoPathGenerator(flightdata))
            .attr("stroke", flightColor(connection))
            .attr("fill", "none")
        }

        function addMultiFlightPath(multiconnectionarr: any[]) {
            for (let i = 0; i < multiconnectionarr.length; i++) {
                addFlightPath(multiconnectionarr[i])
            }
        } 
        
        addMultiFlightPath(rec1path)
        addMultiFlightPath(rec2path)
        addMultiFlightPath(rec3path)
        
        nodes.attr("fill", (d:any) => nodeColor(d))

        // let path: number[] = [];
        // console.log(nodes._groups[0].findIndex((node: any) => {
        //     return node.__data__.position === "Senior Software Engineer"
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
                
                land.attr('d', geoPathGenerator(geojson))
                geoGraticule.attr('d', geoPathGenerator(graticule))
                // links.attr('d', geoPathGenerator(connectionFeatures))
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
        <div className="flex justify-center items-center w-screen h-screen">
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
        const p:any = d3.path();
        p.moveTo(...getPoint(0, points));

        path.slice(1).forEach((nodeIndex) => {
            p.lineTo(...getPoint(nodeIndex, points));
            p.moveTo(...getPoint(nodeIndex, points));
        });

        return p.toString();
    }
    return "";
}

function getPoint(index: number, points: number[]): [number, number] {
    return [points[2 * index]!, points[2 * index + 1]!]
}

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