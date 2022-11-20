import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import careerData from '../../../data/readme.json'
import financeCareerData from '../../../data/finance.json'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';
import InputStep1 from './InputStep1';
import InputStep2 from './InputStep2';
import InputStep3 from './InputStep3';
import InputStep4 from './InputStep4';
import James from '../../../../public/images/James.jpg'
import Jean from '../../../../public/images/Jean.jpg'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface IData {
    name: string,
    children: any[]
}

interface IUserInput {
    goal: string, seekscope: string, interestfields: any[], currentjob: string, worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
}

interface IInfoData {
    name: string, photo?: string, summary?: string, time?: any, listings?: any, link?: string, linkedIn?: string, salary?: any
}

interface IZoomState {
    k: number, x: number, y: number
}

const CollapsibleForce = () => {
    const [data, setData] = useState<IData>(careerData)
    const svgRef = useRef<SVGSVGElement>(null)
    const [started, setStarted] = useState(false)
    const [leftCollapsed, setLeftCollapsed] = useState(false)
    const [inputStep, setInputStep] = useState(1)
    const [userInput, setUserInput] = useState<IUserInput>({
        goal: '', seekscope: '', interestfields: ['finance'], currentjob: '', worklevel: '', backgroundfield: '', edlevel: '', educationfields: [], certifications: []
    })
    const [submitInput, setSubmitInput] = useState<IUserInput>({
        goal: '', seekscope: '', interestfields: ['finance'], currentjob: '', worklevel: '', backgroundfield: '', edlevel: '', educationfields: [], certifications: []
    })

    

    const handleChange = (event: any) => {
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        // filter displayed data based on user input
        if ( userInput.interestfields.includes('finance')) {
            setData(financeCareerData);
        }

        // if (userInput.goal === 'vis') {
        //     const dataArr: any[] = Object.entries(data);
        //     const newArr = dataArr[1][1].filter((element: { name: string; }) => {
        //         return element.name !== 'vis'
        //     })
        //     const newData = { ...data, children: newArr }
        //     setData(newData)
        // }
        setSubmitInput(userInput);
        setInfoDisplay(false);
        setStarted(true);
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
    const [infoData, setInfoData] = useState<IInfoData>({ name: '', photo: '', summary: '', salary: '', time: 0, listings: 5, link: '', linkedIn: '' })
    const [currentZoomState, setCurrentZoomState] = useState<IZoomState>({k: 1, x: 0, y: 0})
    

    const handleLifestyleChange = (event: any) => {
        setLifestyleInput({ ...lifestyleInput, [event.target.name]: (event.target.checked) });
        setLifestyleInputStrings({ ...lifestyleInputStrings, [event.target.name]: (event.target.checked).toString() });
    }
    

    //Run d3 visualisation  
    useEffect(() => {
        if (data !== null) { buildGraph(data) }
    }, [data, lifestyleInputStrings, submitInput]);

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

        const randnum = (max: number) => {
            return Math.floor(Math.random() * max)
        }

        const getTitleCase = (str : string) => {
            const titleCase = str
                .toLowerCase()
                .split(' ')
                .map((word: string) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(' ');

            return titleCase;
        }

        

        function update() {
            d3.selectAll("svg > *").remove();
            const links: any = root.links();
            const nodes: any = root.descendants();
            const upperCurrentJob = getTitleCase(submitInput.currentjob)
            const upperGoal = getTitleCase(submitInput.goal)
            let currentposition: any = root;
            let recommend1: any = null
            let recommend2: any = null;
            const lifestylefitnodes : any[] = []
            const nolifestylefitnodes: any[] = []
            let rec1path: any[] = []
            let rec2path: any[] = []
            let tx = 0
            let ty = 0
            let k = 1
            //hacky solution to discerning current position based on input. 
            const edtrack = (submitInput.educationfields.includes("finance") && submitInput.edlevel === 'bachelors') ? "INTERN" :
                (submitInput.certifications.includes('bachelors in finance') && submitInput.edlevel === "masters") ? "MBAFIN" :
                    (!submitInput.certifications.includes("bachelors in finance") && submitInput.edlevel === "masters") ? "MBANOFIN" :
                        (submitInput.certifications.includes("Dacreed CFA")) ? "DCFAQ" : null;

            if (currentZoomState) {
                tx = currentZoomState.x
                ty = currentZoomState.y
                k = currentZoomState.k
            }

            if (!started && nodes.length > 200) { 
                rec1path = nodes[randnum(nodes.length)].ancestors()
                rec1path.pop()
                rec2path = nodes[randnum(nodes.length)].ancestors()
                rec2path.pop()
            }


            if (started) {
                rec1path = []
                rec2path = []
                //set current position and array of non lifestyle fit nodes based on user ticks or unticks
                for (let i = 0; i < nodes.length; i++) {
                    if ((nodes[i].data.name === upperCurrentJob) && (nodes[i].ancestors().filter((node: any) => node.data.id === edtrack).length !== 0)) {
                        currentposition = nodes[i]
                    }
                }
                console.log(currentposition.ancestors())
                //checks if node is ancestor of current position before pushing to no lifestyle fit.
                for (let i = 0; i < nodes.length; i++) {            
                    if (((nodes[i].data.extrahours === extrahours) || (nodes[i].data.fulltimeEd === fulltimeEd) || (nodes[i].data.relocation === relocation) || (nodes[i].data.remotework === remotework)) && (currentposition.ancestors().filter((node: any) => node.data.id === nodes[i].data.id).length === 0)) {
                        nolifestylefitnodes.push(nodes[i])       
                    }
                }

                //pushes all children of non-lifestyle fit nodes into array as well since they are downstream
                for (let i = 0; i < nolifestylefitnodes.length; i++) {
                    if ((nolifestylefitnodes[i].children !== null) && (nolifestylefitnodes[i].children !== undefined)) { nolifestylefitnodes[i].children.forEach((element: any) => nolifestylefitnodes.push(element)) }
                }

                //push all remaining nodes into lifestylefit node array
                for (let i = 0; i < nodes.length; i++) {
                    if (!nolifestylefitnodes.includes(nodes[i])) {lifestylefitnodes.push(nodes[i])}
                }

                //search for set of possible goal nodes from lifestyle fit array based on closest matches to user input
                const rec1candidates: any[] = []
                for (let i = 0; i < lifestylefitnodes.length; i++) {
                    if ((lifestylefitnodes[i].data.name === upperGoal) && (lifestylefitnodes[i].ancestors().includes(currentposition))) {
                        rec1candidates.push(lifestylefitnodes[i])
                    }
                }
                
                //searches for shortest cummulative time paths from goal candidates. Sets shortest as 1st and 2nd shortest as 2nd
                if (rec1candidates.length > 0) {
                    let minTime = 100;
                    // let minTime2 = 100;
                    for (let i = 0; i < rec1candidates.length; i++) {
                        const currentposindex = rec1candidates[i].ancestors().indexOf(currentposition)
                        const parents = rec1candidates[i].ancestors().slice(1, currentposindex);
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
                    
                    //creates path arrays from ancestor nodes of reccommendations 1 and 2
                    if (recommend1 !== null) { 
                        const currentposindex = recommend1.ancestors().indexOf(currentposition)
                        rec1path = recommend1.ancestors().slice(0, currentposindex);
                    } 
                    
                    if (recommend2 !== null) {
                        const currentposindex = recommend2.ancestors().indexOf(currentposition)
                        rec2path = recommend2.ancestors().slice(0, currentposindex);
                    }
                }
            }

            function color(d: any) {            
                if (nolifestylefitnodes.includes(d)) {
                    return d._children ? "#626262" : "#999";
                } else if (d === currentposition) {
                    return "#11823b"
                } else if (rec1path.includes(d)) {
                    return "#48bf53"
                } else if (rec2path.includes(d)) {
                    return "#91f086";
                } else {
                    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
                }
            }

            const simulation: any = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id((d: any) => d.id).strength(1))
                .force("charge", d3.forceManyBody().strength(-70))
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
                link.attr("stroke", (d: any) => rec1path.includes(d.target) ? "#48bf53" : rec2path.includes(d.target) ? "#91f086": "#999")
                    .attr("x1", (d: any) => d.source.x)
                    .attr("y1", (d: any) => d.source.y )
                    .attr("x2", (d: any) => d.target.x )
                    .attr("y2", (d: any) => d.target.y );

                node.attr("fill", (d: any) => color(d))
                    .attr("r", (d: any) => ((Math.sqrt(d.data.listings)) || (Math.sqrt(d.data.size) / 12) || 5.5 ))
                    .on("click", (event: any, d: any, i: any) => {
                        console.log(d)
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null
                        }
                        setInfoData({
                            name: `${d.data.name}`, photo: `${d.data.photo}`, summary: `${d.data.summary}`, salary: `${d.data.salary}`,time: `${d.data.time}`,
                            listings: `${d.data.listings}`, link: `${d.data.link}`, linkedIn: `${d.data.linkedIn}`
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
                .scaleExtent([0.25, 2.1])
                // .filter((event: any) => { return !event.mousedowned })
                .on("zoom", e => {
                const zoomState: any = d3.zoomTransform(svg.node())
                    setCurrentZoomState(zoomState)
                node.attr("transform", (transform = e.transform));
                link.attr("transform", (transform = e.transform));
                text.attr("transform", (transform = e.transform));

            });

            if (nodes.length < 50) {
                d3.select('svg')
                    .call(zoom.scaleBy, 2)
                    .on(".zoom", null)
            }

            return svg
                .call(zoom)
                

        }

        update();
        return svg.node();

    }


    return (
        <div className="flex justify-center items-center w-screen h-90vh relative">
            <div id="input-form" className={`${started ? 'hidden' : 'flex'} h-90vh w-1/3 overflow-scroll left-10 top-10 fixed justify-start mx-auto flex-col bg-[#eff1f4] p-12 rounded-xl`}>
                <div>{stepSwitch(inputStep)}</div>
            </div>
            {!started && inputStep > 1 && (
                <div className="flex flex-col items-center absolute bg-[#eff1f4] p-5 rounded-xl top-10 right-10 w-1/4 h-1/2 gap-2">
                    <div><strong>Example Personas:</strong></div>
                    <div className="flex h-32 gap-2">
                        <div className="w-1/4">
                            <Image
                                src={James}
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="flex flex-col text-xs">
                                <div><strong>Name:</strong> James</div>
                                <div><strong>Education:</strong> Bachelors in Journalism</div>
                                <div><strong>Job:</strong> Journalist</div>
                                <div><strong>Goal:</strong> Investment Banking Analyst</div>
                            </div>
                            <Button className="bg-[#1848C8] w-1/2 text-white hover:bg-[#1565C0]"
                                onClick={() => { setUserInput({ goal: 'Investment Banking Analyst', seekscope: 'general', interestfields: ['finance'], currentjob: 'Journalist', worklevel: 'middle', backgroundfield: 'journalism', edlevel: 'bachelors', educationfields: ["journalism"], certifications: [] })}}
                            >
                                Fill Form
                            </Button>
                        </div>
                    </div>
                    <div className="flex h-20 gap-2">
                        <div className="w-1/4">
                            <Image
                                src={Jean}
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="flex flex-col text-xs">
                                <div><strong>Name:</strong> Jean</div>
                                <div><strong>Education:</strong> Bachelors in Finance</div>
                                <div><strong>Job:</strong> Junior Investment Banker</div>
                                <div><strong>Goal:</strong> Managing Director</div>
                            </div>
                            <Button className="bg-[#1848C8] w-1/2 text-white hover:bg-[#1565C0]"
                                onClick={() => { setUserInput({ goal: 'Managing Director', seekscope: 'specific', interestfields: ['finance'], currentjob: 'Junior Investment Banker', worklevel: 'junior', backgroundfield: 'finance', edlevel: 'bachelors', educationfields: ["finance"], certifications: ["Dacreed FMVA"] }) }}
                            >
                                Fill Form
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {started && (
                <div className={`${leftCollapsed ?  'h-10 w-6 overflow-hidden  bg-[#eff1f4] rounded-xl' : 'h-90vh w-1/4' } flex left-10 top-10 fixed justify-between items-center mx-auto flex-col p-0`}>
                    <div className="flex h-1/2 w-full overflow-scroll left-10 top-10 justify-start mx-auto flex-col bg-[#eff1f4] p-7 rounded-xl">
                        <div className="flex flex-col justify-center items-center mx-auto gap-2">
                            <div className="flex w-full justify-center">
                                <button className="absolute right-2 top-2" onClick={() => setLeftCollapsed((prev) => {return !prev})}>{leftCollapsed ? <div>&gt;</div> : <div>&lt;</div>}</button>
                                <div className="text-lg">Lifestyle Factors</div>
                            </div>
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
                    <div className="flex  h-1/3 w-full left-10 top-10 justify-start items-center mx-auto flex-col bg-transparent rounded-xl gap-2">
                        Key
                        <div className="flex flex-col justify-start items-start gap-2">
                            <div className="flex gap-2">
                                <div className="bg-[#11823b] border-[#3182BD] border-4 rounded-full h-5 w-5"></div>
                                <div className="text-xs">- Current position</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-[#48bf53] border-[#3182BD] border-4 rounded-full h-5 w-5"></div>
                                <div className="text-xs">- 1st recommended path</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-[#91f086] border-[#3182BD] border-4 rounded-full h-5 w-5"></div>
                                <div className="text-xs">- 2nd recommended path</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-[#C6DBEF] border-[#3182BD] border-4 rounded-full h-5 w-5"></div>
                                <div className="text-xs">- Click to collapse branches</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-[#3182BD] border-[#3182BD] border-4 rounded-full h-5 w-5"></div>
                                <div className="text-xs">- Click to extend branches</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-[#999999] border-[#3182BD] border-4 rounded-full h-5 w-5"></div>
                                <div className="text-xs">- Lifestyle incompatible path</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-[#FD8D3C] border-[#3182BD] border-4 rounded-full h-5 w-5"></div>
                                <div className="text-xs">- Size represents number of jobs</div>
                            </div>
                        </div>
                    </div>
                    <Button variant="contained" className="bg-[#1848C8] w-1/2 " onClick={() => { setStarted(false); setInputStep(2); }}>
                        Change Inputs
                    </Button>
                </div>
            )}
            <div id="infoDisplay" className={`${infoDisplay ? 'w-1/4 p-12 opacity-100' : 'w-0 p-0 opacity-0'} overflow-scroll transition-width h-screen top-0 right-0 fixed flex justify-start items-center gap-2 mx-auto flex-col bg-[#eff1f4]`}>
                <button className="absolute left-2 top-2" onClick={() => setInfoDisplay(false)}>X</button>
                <div className="flex justify-center text-lg">{infoData.name}</div>
                {infoData.photo !== 'undefined' && (
                    <div className="flex justify-center items-center h-1/4 object-cover" >
                        <img className="h-full w-full"src={infoData.photo} />
                    </div>
                )}
                {infoData.salary !== 'undefined' && (
                    <>
                        <div className="flex w-full text-xs gap-2">
                            <div><strong>Avg base salary: </strong></div> <div>${infoData.salary}</div>
                        </div>
                        <hr className="w-full border-gray-600 "></hr>
                    </>
                )}
                {infoData.time !== 'undefined' && (
                    <>
                        <div className="flex w-full text-xs gap-2">
                            <div><strong>Avg time in role: </strong></div> <div>{infoData.time ? ` ${infoData.time} years` : ' N/A'}</div>
                        </div>
                        <hr className="w-full border-gray-600 "></hr>
                    </>
                )}
                
                {infoData.summary !== 'undefined' && (
                    <div className="flex justify-center items-center text-xs" >
                        {infoData.summary}
                    </div>
                )}
                {infoData.summary !== 'undefined' && (
                    <div className="flex justify-center items-center flex-col" >
                        <Button variant="contained" className="bg-[#1848C8]">
                            <Link className="text-blue-600" href={infoData.link ? infoData.link : ''}><a target="_blank">Next Steps</a></Link>
                        </Button>
                    </div>
                )}
                <hr className="w-full border-gray-600 "></hr>
                { infoData.linkedIn !== 'undefined' && (
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="text-xs">
                            See your LinkedIn contacts who have listed this on their profile:
                        </div>
                        <div className="flex justify-center items-center" >
                            <Button variant="contained" className="bg-[#1848C8]">
                                <Link className="text-blue-600" href={infoData.linkedIn ? infoData.linkedIn : ''}><a target="_blank">My Network</a></Link>
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