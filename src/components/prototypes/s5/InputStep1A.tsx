import React from 'react'
import { Button } from "@mui/material";

interface IUserInput {
    goal: string, seekscope: string, interestfields: any[], worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
}

type Props = {
    setInputStep: React.Dispatch<React.SetStateAction<number>>,
}

const InputStep1A = (props: Props) => {
    const { setInputStep } = props
    
  return (
      <div className="flex flex-col justify-center items-center mx-auto gap-4">
          <div className="text-xl">Welcome to the Sankey Prototype!</div>
          <div className="text-xs">
              This tool is designed to <strong>help you navigate</strong> the options
             <strong> by informing and recommending </strong> based on your unique set of skills, experiences, goals, and preferences. 
          </div>
          <div className="text-xs">
              To get started, just <strong>click the button below</strong>. We&#39;ll walk you through a short set of questions about your education and work up to this point, and 
              any ideas you may have about where you want to go from here. For the best experience, try out the example persona to the right. 
          </div>
          <div className="text-xs">
              Based on your personal story and aspirations, our career growth engine will generate a SankeyChart.
          </div>
          <div className="text-xs">              
              The numbers displayed on each path show how many months it may take to achieve each path. 
          </div>
          <div className="text-center">
              We hope you find this exploration of your career potential insightful and enjoyable!
          </div>
          <Button variant="contained" className="bg-[#1848C8]" onClick={() => setInputStep(2)}>
              Let&#39;s Go!
          </Button>
      </div>
  )
}

export default InputStep1A