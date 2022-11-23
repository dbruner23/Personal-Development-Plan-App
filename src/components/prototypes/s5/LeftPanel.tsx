import SankeyChart from "./SankeyChart";
import React, { useEffect, useRef, useState } from 'react'
import careerData from '../../../data/readme.json'
import financeCareerData from '../../../data/finance.json'
import { Button } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';
import InputStep1 from '../d4/InputStep1';
import InputStep2 from '../d4/InputStep2';
import InputStep3 from '../d4/InputStep3';
import InputStep4 from '../d4/InputStep4';
import James from '../../../../public/images/James.jpg'
import Jean from '../../../../public/images/Jean.jpg'

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

const LeftPanel = () => {
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

  return (
    <>
      <main className="">

       
      <div className="">
            <div id="input-form" className={`${started ? 'hidden' : 'flex'} h-90vh w-1/5 overflow-scroll left-10 top-10 fixed justify-start mx-auto flex-col bg-[#eff1f4] p-12 rounded-xl`}>
                <div>{stepSwitch(inputStep)}</div>
            </div>
            {!started && inputStep > 1 && (
                <div className="flex flex-col items-center absolute bg-[#eff1f4] p-5 rounded-xl top-10 right-10 w-1/5 h-1/2 gap-2">
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
  
      </main>
    </>
  );
};

export default LeftPanel;
