import React, { useState } from 'react'
import Image from 'next/future/image'
import { Button } from '@mui/material'
import ChevronLeft from 'public/chevron-left.svg'
import ChevronRight from 'public/chevron-right.svg'
import Clock from 'public/clock.svg'
import School from 'public/edit.svg'
import briefcase from 'public/briefcase.svg'
import { LocalConvenienceStoreOutlined } from '@mui/icons-material'
import PlanModal from './PlanModal'


type Props = {
  path: any[],
  prototypeId: string
}

const RightSideBar = (props: Props) => {
  const { path, prototypeId } = props;
  console.log(path)
  const pathStartWithCurrent: any[] = [...path].reverse();
  console.log(pathStartWithCurrent)
  const pathExcludeGoal: any[] = path.slice(1)
  const timeToGoal = pathExcludeGoal.reduce((acc: any, curr: { data: { time: any; }; }) => {
    return acc + curr.data.time
  }, 0);
  const edNodesInPath = pathExcludeGoal.filter((node) => { return node.data.cost })
  const edTimeToGoal = edNodesInPath.reduce((acc: any, curr: { data: { time: any; }; }) => {
    return acc + curr.data.time
  }, 0);
  const edCostToGoal = (edNodesInPath.reduce((acc: any, curr: { data: { cost: any; }; }) => {
    return acc + curr.data.cost
  }, 0)) / edTimeToGoal;
  
  let skills: any[] = []
  let skillLevels: any[] = []
  for (let i = 0; i < pathStartWithCurrent.length; i++) {
    if (!skills.includes(pathStartWithCurrent[i].data.skill)) {
      skills.push(pathStartWithCurrent[i].data.skill);
      skillLevels.push(pathStartWithCurrent[i].data.skillLevel);
    } else {
    let skillIndex = skills.indexOf(pathStartWithCurrent[i])
      if (pathStartWithCurrent[i].data.skillLevel > skillLevels[skillIndex] ) {
        skillLevels[skillIndex] = pathStartWithCurrent[i].data.skillLevel
      } 
    }
  }

  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <>
    <div className={`flex ${rightCollapsed ? 'h-10 w-6 overflow-hidden right-0 bg-[#eff1f4] rounded-xl' : 'h-screen w-64' } transition-all right-0 top-0 fixed justify-between items-center mx-auto flex-col p-0`} >
      <div className="flex h-full w-full justify-start mx-auto flex-col bg-[#eff1f4] p-2">
          <div className="flex flex-col justify-start items-center  h-1/2">
              <button className="flex justify-center items-center absolute left-2 top-2" onClick={() => setRightCollapsed((prev) => { return !prev })}>
                {rightCollapsed ?
                  <div>
                    <Image
                      src={ChevronLeft}
                      alt="Icon"
                      className=""
                    >
                    </Image>
                  </div> :
                  <div>
                    <Image
                      src={ChevronRight}
                      alt="Icon"
                      className=""
                    >
                    </Image>
                  </div>}
              </button>
              <div className="flex self-center text-lg mt-6 mb-4">Current Path Preview</div>
              {pathStartWithCurrent.length === 0 ? <div className="flex text-center justify-center items-center text-sm"></div> : (
                <div className="flex flex-col justify-start items-center fit-content pt-4 w-full relative" >   
                  {pathStartWithCurrent.length !== 0 ? pathStartWithCurrent.map((step, index) => 
                    <div className="flex gap-2 w-full justify-center">
                      <div className={`flex flex-col gap-1 justify-start absolute -translate-y-4 pl-1 ${(index % 2 === 0) ? 'left-0' : 'right-0'}`}>
                        <div className={`w-6.5rem text-xs text-center `}><strong>{step.data.name}</strong></div>
                        <div className={`w-6.5rem text-xs text-left `}>{ step.data.cost ? `Cost: $${step.data.cost}` : `Salary: $${step.data.salary}`}</div>
                        <div className={`w-6.5rem text-xs text-left `}>Avg time: {step.data.time} yrs</div>
                      </div>  
                      <div className="flex flex-col justify-center items-center gap-1 relative">
                        <div className="bg-[#48bf53] border-[#3182BD] border-4 rounded-full h-5 w-5 mt-2 mb-1"></div>
                        { (index !== (pathStartWithCurrent.length - 1)) && (<div className="border-l-slate-400 border-l-2 h-10 w-0 "></div>)}
                      </div>
                    </div>     
                    ) : ""}
                </div>   
            )}
            {path.length === 0 ? <div className="flex text-center h-full justify-center items-center translate-y-36 text-sm">No path currently selected</div> : (
              <div className="flex flex-col justify-start items-center fit-content pt-3 w-full relative" >
                <hr className="w-90% border-slate-400 border-1 mt-8"></hr>
                <div className="flex justify-start items-center w-full px-5 py-2 gap-4">
                  <div>
                    <Image
                      src={Clock}
                      alt="Icon"
                      className=""
                    >
                    </Image>
                  </div>
                  <div className="text-xs justify-center">{timeToGoal} years to become a <br></br><strong>{path[0].data.name}</strong></div>
                </div>
                <hr className="w-90% border-slate-400 border-1"></hr>
                <div className="flex justify-start items-center w-full px-5 py-2 gap-4">
                  <div>
                    <Image
                      src={School}
                      alt="Icon"
                      className=""
                    >
                    </Image>
                  </div>
                  <div className="text-xs justify-center">{edTimeToGoal === 0 ? "No further higher ed. needed" : `${edTimeToGoal} yrs higher ed at $${edCostToGoal} p/a`}</div>
                </div>
                <hr className="w-90% border-slate-400 border-1"></hr>
                <div className="flex justify-start items-center w-full px-5 py-2 gap-4">
                  <div>
                    <Image
                      src={briefcase}
                      alt="Icon"
                      className=""
                    >
                    </Image>
                  </div>
                  <div className="text-xs justify-center">Skills Gained:</div>
                </div>
                {skills.length > 0 ? skills.map((skill: string, index: number) => {
                  return ( 
                    <div className="flex justify-between w-full my-1 px-3 gap-2">
                      <div className="text-xs">{skill}</div>
                      <div className="flex justify-end gap-1">
                        <div className={`h-3 w-3 rounded-sm ${ skillLevels[index] >= 1 ? 'bg-[#39B681]' : 'bg-[#cccc]'}`}></div>
                        <div className={`h-3 w-3 rounded-sm ${ skillLevels[index] >= 2 ? 'bg-[#39B681]' : 'bg-[#cccc]'}`}></div>
                        <div className={`h-3 w-3 rounded-sm ${ skillLevels[index] >= 3 ? 'bg-[#39B681]' : 'bg-[#cccc]'}`}></div>
                        <div className={`h-3 w-3 rounded-sm ${ skillLevels[index] >= 4 ? 'bg-[#39B681]' : 'bg-[#cccc]'}`}></div>
                        <div className={`h-3 w-3 rounded-sm ${ skillLevels[index] >= 5 ? 'bg-[#39B681]' : 'bg-[#cccc]'}`}></div>
                        <div className={`h-3 w-3 rounded-sm ${ skillLevels[index] == 6 ? 'bg-[#39B681]' : 'bg-[#cccc]'}`}></div>
                      </div>
                      
                    </div>
                    
                  )
                }) : ""}
              </div>
              
            )}

       
            <PlanModal path={path} pathStartWithCurrent={pathStartWithCurrent} timeToGoal={timeToGoal} />
            
            {/* {infoData.salary !== 'undefined' && (
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
            {infoData.linkedIn !== 'undefined' && (
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
            )} */}
              
          </div>
      </div>
    </div>
    </>
  )
}

export default RightSideBar