import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import careerData from '../../../data/readme.json'
import financeCareerData from '../../../data/finance.json'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from "@mui/material";
import Link from 'next/link';
import InputStep1 from './InputStep1';
import InputStep2 from './InputStep2';
import InputStep3 from './InputStep3';
import InputStep4 from './InputStep4';

interface IData {
    name: string,
    children: any[]
}

interface IUserInput {
    goal: string, seekscope: string, interestfields: any[], worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
}

interface IInfoData {
    name: string, photo?: string, summary?: string, time?: any, parttime?: any, link?: string, linkedIn?: string
}

interface IZoomState {
    k: number, x: number, y: number
}

const CollapsibleForce = () => {
    const [data, setData] = useState<IData>(careerData)
    const svgRef = useRef<SVGSVGElement>(null)
    const [started, setStarted] = useState(false)
    const [inputStep, setInputStep] = useState(1)
    const [userInput, setUserInput] = useState<IUserInput>({
        goal: '', seekscope: 'specific', interestfields: ['finance'], worklevel: '', backgroundfield: '', edlevel: '', educationfields: [], certifications: []
    }) 

    const careerfields = [
        'engineering', 'management', 'medical', 'finance', 'other'
    ]
    const edfields = [
        'computer science', 'philosophy', 'visual arts', 'history', 'other'
    ]
    const certs = [
        'legal compliance', 'nz tax law', 'other' 
    ]

    const handleChange = (event: any) => {
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        // filter displayed data based on user input
        if (userInput.seekscope === 'specific' && userInput.interestfields.includes('finance')) {
            setData(financeCareerData);
        }

        if (userInput.goal === 'vis') {
            const dataArr: any[] = Object.entries(data);
            const newArr = dataArr[1][1].filter((element: { name: string; }) => {
                return element.name !== 'vis'
            })
            const newData = { ...data, children: newArr }
            setData(newData)
        }
        setStarted(true)
    }

    const stepSwitch = (inputStep: number) => {
        switch (inputStep) {
            case 1:
                return <InputStep1 setInputStep={setInputStep}  />
            case 2:
                return <InputStep2 userInput={userInput} setInputStep={setInputStep} handleChange={handleChange} />
            case 3:
                return <InputStep3 userInput={userInput} setInputStep={setInputStep} handleChange={handleChange} handleSubmit={handleSubmit}/>
        }
    }


    //To be converted to string. "false" in the data will mean "a person can't do this if they aren't willing/able to ________" 
    const [lifestyleInput, setLifestyleInput] = useState({ extrahours: true, fulltimeEd: true, relocation: true, remotework: true })
    const [lifestyleInputStrings, setLifestyleInputStrings] = useState({ extrahours: "true", fulltimeEd: "true", relocation: "true", remotework: "true" })
    const { extrahours, fulltimeEd, relocation, remotework } = lifestyleInputStrings;
    const [infoDisplay, setInfoDisplay] = useState(false)
    const [infoData, setInfoData] = useState<IInfoData>({ name: '', photo: '', summary: '', time: 0, parttime: false, link: '', linkedIn: '' })
    const [currentZoomState, setCurrentZoomState] = useState<IZoomState>({k: 1, x: 0, y: 0})
    

    const handleLifestyleChange = (event: any) => {
        setLifestyleInput({ ...lifestyleInput, [event.target.name]: (event.target.checked) });
        setLifestyleInputStrings({ ...lifestyleInputStrings, [event.target.name]: (event.target.checked).toString() });
    }
    

    //Run d3 visualisation  
    useEffect(() => {
        if (data !== null) { buildGraph(data) }
    }, [data, lifestyleInputStrings]);

    const buildGraph = (data: any) => {
        const svg: any = d3.select(svgRef.current)
        const root = d3.hierarchy(data);
        // if (started === true) {
        //     root.descendants().forEach((d: any, i: any) => {
        //         d.id = i;
        //         if (d.data.name !== 'flare' && d.data.name !== 'Start') {
        //             d._children = d.children;
        //             d.children = null;
        //         }
        //     })
        // }; 
        const width = window.innerWidth;
        const height = window.innerHeight;

        svg
            .attr("viewBox", [-width / 2, -height / 2, width, height])

        const drag = (simulation: any) => {
            function dragstarted(event: { active: any }, d: any) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event: any, d: any) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event: any, d: any) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        }

        

        function update() {
            d3.selectAll("svg > *").remove();
            const links: any = root.links();
            const nodes: any = root.descendants();
            let recommend1: any = null
            let recommend2: any = null;
            const lifestylefitnodes : any[] = []
            const nolifestylefitnodes: any[] = []
            let rec1path: any[] = []
            let rec2path: any[] = []
            let tx = 0
            let ty = 0
            let k = 1
            if (currentZoomState) {
                tx = currentZoomState.x
                ty = currentZoomState.y
                k = currentZoomState.k
            }

            if (!started) { 
                rec1path = nodes[200].ancestors()
                rec1path.pop()
                rec2path = nodes[210].ancestors()
                rec2path.pop()

            }


            if (started) {
                for (let i = 0; i < nodes.length; i++) {    
                    if ((nodes[i].data.extrahours === extrahours) || (nodes[i].data.fulltimeEd === fulltimeEd) || (nodes[i].data.relocation === relocation) || (nodes[i].data.remotework === remotework)) {
                        nolifestylefitnodes.push(nodes[i])
                    }
                }

                for (let i = 0; i < nolifestylefitnodes.length; i++) {
                    if ((nolifestylefitnodes[i].children !== null) && (nolifestylefitnodes[i].children !== undefined)) { nolifestylefitnodes[i].children.forEach((element: any) => nolifestylefitnodes.push(element)) }
                }

                //push all remaining nodes into lifestylefitnodes
                for (let i = 0; i < nodes.length; i++) {
                    if (!nolifestylefitnodes.includes(nodes[i])) {lifestylefitnodes.push(nodes[i])}
                }

                const rec1candidates: any[] = []
                for (let i = 0; i < lifestylefitnodes.length; i++) {
                    if (lifestylefitnodes[i].data.name === userInput.goal) {
                        rec1candidates.push(lifestylefitnodes[i])
                    }
                }
                
                if (rec1candidates.length > 0) {
                    let minTime = 100;
                    // let minTime2 = 100;
                    for (let i = 0; i < rec1candidates.length; i++) {
                        const parents = rec1candidates[i].ancestors()
                        parents.shift();
                        parents.pop();
                        const totaltime = parents.reduce((acc: any, curr: { data: { time: any; }; }) => {
                            return acc + curr.data.time
                        }, 0);
                        if (totaltime < minTime) {
                            minTime = totaltime;
                            recommend2 = recommend1;
                            recommend1 = rec1candidates[i];
                        } else if ((recommend2 === null) || (totaltime < recommend2.data.time )){
                            recommend2 = rec1candidates[i]
                        }
                    }
            
                    if (recommend1 !== null) { 
                        rec1path = recommend1.ancestors();
                        rec1path.pop();
                    } 
                    
                    if (recommend2 !== null) {
                        rec2path = recommend2.ancestors();
                        rec2path.pop();
                    }
                }
            }

            function color(d: any) {            
                if (nolifestylefitnodes.includes(d)) {
                    return d._children ? "#626262" : "#999";
                } else if (rec1path.includes(d)) {
                    return "#77DD76";
                } else if (rec2path.includes(d)) {
                    return "#D2FDBB";
                } else {
                    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
                }
            }

            const simulation: any = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id((d: any) => d.id).strength(1))
                .force("charge", d3.forceManyBody().strength(-50))
                .force("x", d3.forceX())
                .force("y", d3.forceY());

            const link = svg.append("g")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .enter()
                .append("line");

            link.exit().remove();

            const node = svg.append("g")
                .attr("stroke", "#3182bd")
                .attr("stroke-width", 1.5)
                .attr("cursor", "pointer")
                .attr("pointer-events", "all")
                .selectAll("circle")
                .data(nodes)
                .enter()
                .append("circle");
                
            node.exit().remove();

            const text = svg.append("g") 
                .selectAll(".label")
                .data(root.descendants())
                .enter()
                .append("text")
                .attr("class", "label")
                .text((node: { data: { name: any } }) => node.data.name)
                .attr("font-size", 4);     

            text.exit().remove();


            simulation.on("tick", () => {
                link.attr("stroke", (d: any) => rec1path.includes(d.target) ? "#77DD76" : rec2path.includes(d.target) ? "#D2FDBB": "#999")
                    .attr("x1", (d: any) => d.source.x)
                    .attr("y1", (d: any) => d.source.y )
                    .attr("x2", (d: any) => d.target.x )
                    .attr("y2", (d: any) => d.target.y );

                node.attr("fill", (d: any) => color(d))
                    .attr("r", (d: any) => ((Math.sqrt(d.data.size) / 12) || 5.5 ))
                    .on("click", (event: any, d: any, i: any) => {
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null
                        }
                        setInfoData({
                            name: `${d.data.name}`, photo: `${d.data.photo}`, summary: `${d.data.summary}`, time: `${d.data.time}`,
                            parttime: `${d.data.parttime}`, link: `${d.data.link}`, linkedIn: `${d.data.linkedIn}`
                        })
                        setInfoDisplay(true);
                        update()
                    })
                    .on("mouseenter", function (e: any, d: any) {
                        d3.select(text._groups[0][d.index])
                            .transition()
                            .attr("font-size", 12)
                    })
                    .on("mouseleave", function (e: any, d: any) {
                        d3.select(text._groups[0][d.index])
                            .transition()
                            .attr("font-size", 3)
                    })
                    .call(drag(simulation))
                    .attr("cx", (d: any) => d.x)
                    .attr("cy", (d: any) => d.y);

                text.attr("x", (node: any) => { return node.x + 7 })
                    .attr("y", (node: any) => { return node.y })

            });

            let transform: { k: number; invert: (arg0: [number, number]) => any };

            const zoom : any = d3.zoom()
                .scaleExtent([0.25, 2.5])
                // .filter((event: any) => { return !event.mousedowned })
                .on("zoom", e => {
                const zoomState: any = d3.zoomTransform(svg.node())
                    setCurrentZoomState(zoomState)
                    console.log(currentZoomState)
                node.attr("transform", (transform = e.transform));
                link.attr("transform", (transform = e.transform));
                text.attr("transform", (transform = e.transform));

            });

            if (nodes.length < 50) {
                d3.select('svg')
                    .call(zoom.scaleBy, 2.25)
                    .on(".zoom", null)
            }

            return svg
                .call(zoom)
                

        }

        update();
        return svg.node();

    }


    return (
        <div className="flex justify-center items-center w-screen h-90vh">
            <div id="input-form" className={`${started ? 'hidden' : 'flex'} h-5/6 w-1/3 overflow-scroll left-10 top-10 fixed justify-start mx-auto flex-col bg-[#eff1f4] p-12 rounded-xl`}>
                <div>{stepSwitch(inputStep)}</div>
            </div>
            {started && (
                <div className="flex h-5/6 w-1/4 left-10 top-10 fixed justify-between items-center mx-auto flex-col p-0">
                    <div className="flex h-1/2 w-full overflow-scroll left-10 top-10 justify-start mx-auto flex-col bg-[#eff1f4] p-7 rounded-xl">
                        <div className="flex flex-col justify-center items-center mb-14 mx-auto gap-2">
                            <div className="text-lg">Lifestyle Factors</div>
                            <label>
                                <input 
                                    className="mr-2 cursor-pointer"
                                    type="checkbox"
                                    defaultChecked={true}
                                    checked={lifestyleInput.extrahours}
                                    name="extrahours"
                                    onChange={handleLifestyleChange}
                                />
                                I&#39;m able to work outside of standard 9-5 Monday-Friday hours
                            </label>
                            <label>
                                <input 
                                    className="mr-2 cursor-pointer"
                                    type="checkbox"
                                    defaultChecked={true}
                                    checked={lifestyleInput.fulltimeEd}
                                    name="fulltimeEd"
                                    onChange={handleLifestyleChange}
                                />
                                I&#39;m able to take time out to pursue further education full-time
                            </label>
                            <label>
                                <input
                                    className="mr-2 cursor-pointer"
                                    type="checkbox"
                                    defaultChecked={true}
                                    checked={lifestyleInput.relocation}
                                    name="relocation"
                                    onChange={handleLifestyleChange}
                                />
                                I&#39;m willing to consider relocating for the right work opportunity
                            </label>
                            <label>
                                <input
                                    className="mr-2 cursor-pointer"
                                    type="checkbox"
                                    defaultChecked={true}
                                    checked={lifestyleInput.remotework}
                                    name="remotework"
                                    onChange={handleLifestyleChange}
                                />
                                I&#39;m willing to consider remote working options
                            </label>
                        </div>
                    </div>
                    <Button variant="contained" className="bg-[#1848C8] w-1/2 " onClick={() => setStarted(false)}>
                        Change Inputs
                    </Button>
                </div>
            )}
            <div id="infoDisplay" className={`${infoDisplay ? 'w-1/4 p-12 opacity-100' : 'w-0 p-0 opacity-0'} overflow-scroll transition-width h-screen top-0 right-0 fixed flex justify-start items-center gap-4 mx-auto flex-col bg-[#eff1f4]`}>
                <button className="self-start " onClick={() => setInfoDisplay(false)}>X</button>
                <div className="flex justify-center text-lg">{infoData.name}</div>
                {infoData.photo !== 'undefined' && (
                    <div className="flex justify-center items-center object-scale-down" >
                        <img src={infoData.photo} />
                    </div>
                )}
                {infoData.summary !== 'undefined' && (
                    <div className="flex justify-center items-center" >
                        {infoData.summary}
                    </div>
                )}
                {infoData.summary !== 'undefined' && (
                    <div className="flex justify-center items-center" >
                        <Button variant="contained" className="bg-[#1848C8]">
                            <Link className="text-blue-600" href={infoData.link ? infoData.link : ''}>Learn More</Link>
                        </Button>
                    </div>
                )}
                { infoData.linkedIn !== 'undefined' && (
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div>
                            See LinkedIn contacts who have listed this on their profile:
                        </div>
                        <div className="flex justify-center items-center" >
                            <Button variant="contained" className="bg-[#1848C8]">
                                <Link className="text-blue-600" href={infoData.linkedIn ? infoData.linkedIn : ''}>Network</Link>
                            </Button>
                        </div>
                    </div>
                )}
                
            </div>
            <svg ref={svgRef} className="h-screen w-screen overflow-visible" ></svg>
        </div>
    )
}

export default CollapsibleForce