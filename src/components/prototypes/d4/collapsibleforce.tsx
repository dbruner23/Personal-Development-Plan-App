import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import careerData from '../../../data/readme.json'
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { Button } from "@mui/material";
import { formControlUnstyledClasses } from '@mui/base';
import { comment } from 'postcss';
import Image from 'next/image';



type Props = {}

const CollapsibleForce = (props: Props) => {
    const [data, setData] = useState(careerData)
    const [started, setStarted] = useState(false)
    const [userInput, setUserInput] = useState({
        goal: '', seekscope: '', interestfields: [], worklevel: '', backgroundfield: '', edlevel: '', educationfields: [], certifications: []
    })
    console.log(userInput)
    const careerfields = [
        'engineering', 'management', 'medical', 'finance', 'other'
    ]
    const edfields = [
        'computer science', 'philosophy', 'visual arts', 'history', 'other'
    ]
    const certs = [
        'legal compliance', 'nz tax law', 'other' 
    ]
    const [recommend1, setRecommend1] = useState('analytics')
    const [infoDisplay, setInfoDisplay] = useState(false)
    const [infoData, setInfoData] = useState({ name: '' })


    const svgRef = useRef<SVGSVGElement>(null)
    


    const handleChange = (event: any) => {
        setUserInput({ ...userInput, [event.target.name]: event.target.value,});
    }

    const handleSubmit = () => {
        // filter displayed data based on user input
        if (userInput.goal === 'vis') {
            let dataArr : any[] = Object.entries(data);
            let newArr = dataArr[1][1].filter((element: { name: string; }) => {
                return element.name !== 'vis'
            })
            const newData = { ...data, children: newArr }
            setData(newData)
        }      
        // will set recommended path based on user input run through algorithm
        setRecommend1(userInput.goal)
        setStarted(true)
    }
    

    //Run d3 visualisation  
    useEffect(() => {
        if (data !== null) { buildGraph(data) }
    }, [data, recommend1]);

    const buildGraph = (data: { name: string; children: { name: string; children: ({ name: string; children: ({ name: string; size: number; children?: undefined } | { name: string; children: { name: string; size: number }[]; size?: undefined })[]; size?: undefined } | { name: string; size: number; children?: undefined })[] }[] }) => {
        const svg: any = d3.select(svgRef.current)
        const root = d3.hierarchy(data);
        if (started === true) {
            root.descendants().forEach((d: any, i: any) => {
                d.id = i;
                if (d.data.name !== 'flare') {
                    d._children = d.children;
                    d.children = null;
                }
            })
        }; 
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

        function color(d: any) {
            if (d.data.name === recommend1) {
                return "#ff0000"
            } else {
                return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";   
            }
        }

        function update(source: any) {
            d3.selectAll("svg > *").remove();
            const links: any = root.links();
            const nodes: any = root.descendants();
            

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

            node.append("title")
                .text((d: any) => d.data.name);

            // node.append("label")
            //     .text((d:any) => d.data.name)

            const text = svg
                .selectAll(".label")
                .data(root.descendants())
                .enter()
                .append("text")
                .attr("class", "label")
                .text((node: { data: { name: any } }) => node.data.name)
                .attr("font-size", 3)
                .on("mouseenter", function (d:any) {
                    d3.select(this)
                        .transition()
                        .attr("font-size", 8)
                })
                .on("mouseleave", function (d: any) {
                    d3.select(this)
                        .transition()
                        .attr("font-size", 3)
                } );
                
                

            text.exit().remove();


            simulation.on("tick", () => {
                link.attr("stroke", (d: any) => d.target.data.name === recommend1 ? "#ff0000" : "#999")
                    .attr("x1", (d: any) => d.source.x)
                    .attr("y1", (d: any) => d.source.y)
                    .attr("x2", (d: any) => d.target.x)
                    .attr("y2", (d: any) => d.target.y);

                node.attr("fill", color)
                    .attr("r", (d: any) => (Math.sqrt(d.data.size) / 12 || 5.5))
                    .on("click", (event: any, d: any, i: any) => {
                        d3.select("text")
                        // d3.select(d).select("text").style('font-size', 20)
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null
                        }
                        setInfoData({ name: `${d.data.name}` })
                        setInfoDisplay(true);
                        update(d)
                    })
                    .call(drag(simulation))
                    .attr("cx", (d: any) => d.x)
                    .attr("cy", (d: any) => d.y);

                text.attr("x", (node: any) => { return node.x + 7 })
                    .attr("y", (node: any) => { return node.y })

            });

            let transform: { k: number; invert: (arg0: [number, number]) => any };

            const zoom = d3.zoom().on("zoom", e => {
                node.attr("transform", (transform = e.transform));
                link.attr("transform", (transform = e.transform));
                text.attr("transform", (transform = e.transform));

            });

            return svg
                .call(zoom)
                .call(zoom.transform, d3.zoomIdentity)

        }

        update(root);
        return svg.node();

    }


    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div id="input-form" className={`${started ? 'hidden' : 'flex'} h-5/6 w-1/3 overflow-scroll left-10 top-10 fixed justify-start mx-auto flex-col bg-[#eff1f4] p-12 rounded-xl`}>
                <div className="flex flex-col justify-center mb-14 mx-auto">
                    <label className="flex w-ful text-sm mb-2">Which of the following best describes your current professional development interest?</label>
                    <div className="mb-10 mx-auto">
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            name="seekscope"
                            value={userInput.seekscope}
                            onChange={handleChange}
                            sx={{ width: '25vw' }}
                        >
                            <MenuItem value={"specific"}>I want to explore advancement opportunities in my current field.</MenuItem>
                            <MenuItem value={"general"}>I want to explore possible paths in a few particular areas of interest.</MenuItem>
                            <MenuItem value={"broad"}>I want to explore broadly and discover new opportunities.</MenuItem>
                        </TextField>
                    </div>
                    <label className="flex w-full text-sm mb-2">Which career field(s)/path(s) are you most interested to explore?</label>
                    <div className="mb-10">
                    <InputLabel id="demo-multiple-checkbox-label">(Choose all that apply)</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        name="interestfields"
                        value={userInput.interestfields}
                        onChange={handleChange}
                        sx={{ width: '25vw'}}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {careerfields.map((field) => (
                            <MenuItem key={field} value={field}>
                                {field}
                            </MenuItem>
                        ))}
                    </Select>
                    </div>
                    <label className="flex w-full text-sm mb-2">Is there a particular position or role that you aspire to attain?</label>
                    <div className="mb-10 ">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="your answer here..."
                            name="goal"
                            value={userInput.goal}
                            onChange={handleChange}
                            multiline
                            maxRows={10}
                            sx={{ width: '25vw', }}
                            helperText="You can leave this blank if you're unsure."
                        />
                    </div>
                    <label className="flex w-ful text-sm mb-2">What is/was your highest level professional role?</label>
                    <div className="mb-10 mx-auto">
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={userInput.worklevel}
                            onChange={handleChange}
                            sx={{ width: '25vw' }}
                        >
                            <MenuItem value={"intern"}>Intern</MenuItem>
                            <MenuItem value={"junior"}>Junior</MenuItem>
                            <MenuItem value={"middle"}>Mid-level</MenuItem>
                            <MenuItem value={"senior"}>Senior</MenuItem>
                            <MenuItem value={"executive"}>Executive</MenuItem>   
                        </TextField>
                    </div>
                    <label className="flex w-ful text-sm mb-2">In what field is/was this role?</label>
                    <div className="mb-10 mx-auto">
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            name="backgroundfield"
                            value={userInput.backgroundfield}
                            onChange={handleChange}
                            sx={{ width: '25vw' }}
                        >
                            {careerfields.map((field) => (
                                <MenuItem key={field} value={field}>
                                    {field}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <label className="flex w-ful text-sm mb-2">What is your highest level of education?</label>
                    <div className="mb-10 mx-auto">
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={userInput.worklevel}
                            onChange={handleChange}
                            sx={{ width: '25vw' }}
                        >
                            <MenuItem value={"highschool"}>High School</MenuItem>
                            <MenuItem value={"diploma"}>Polytech</MenuItem>
                            <MenuItem value={"bachelors"}>Bachelors</MenuItem>
                            <MenuItem value={"masters"}>Masters</MenuItem>
                            <MenuItem value={"phd"}>Phd.</MenuItem>
                            <MenuItem value={"postdoc"}>Postdoctorate</MenuItem>
                        </TextField>
                    </div>
                    <label className="flex w-full text-sm mb-2">In what subject(s)?</label>
                    <div className="mb-10">
                        <InputLabel id="demo-multiple-checkbox-label">(Choose all that apply)</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            name="interestfields"
                            value={userInput.educationfields}
                            onChange={handleChange}
                            sx={{ width: '25vw' }}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {edfields.map((field) => (
                                <MenuItem key={field} value={field}>
                                    {field}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <label className="flex w-full text-sm mb-2">Do you have any other degrees, diplomas, certifications, or Dacreed qualifications?</label>
                    <div className="mb-10">
                        <InputLabel id="demo-multiple-checkbox-label">(Choose all that apply)</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            name="interestfields"
                            value={userInput.certifications}
                            onChange={handleChange}
                            sx={{ width: '25vw' }}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {certs.map((cert) => (
                                <MenuItem key={cert} value={cert}>
                                    {cert}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <Button variant="contained" className="bg-[#1848C8]" onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                </div>
            </div>
            <div id="infoDisplay" className={`${infoDisplay ? 'w-1/4 p-12' : 'w-0 p-0'} transition-width h-screen top-0 right-0 fixed flex justify-start items-center mx-auto flex-col bg-[#eff1f4]`}>
                <button className="self-start " onClick={() => setInfoDisplay(false)}>X</button>
                <div className="flex justify-center text-lg">{infoData.name}</div>
            </div>
            <svg ref={svgRef} className="overflow-visible" ></svg>
        </div>
    )
}

export default CollapsibleForce