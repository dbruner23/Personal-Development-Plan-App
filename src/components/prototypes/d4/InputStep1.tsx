import React from 'react'
import { Button } from "@mui/material";

interface IUserInput {
    goal: string, seekscope: string, interestfields: any[], worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
}

type Props = {
    setInputStep: React.Dispatch<React.SetStateAction<number>>,
}

const InputStep1 = (props: Props) => {
    const { setInputStep } = props
    
  return (
      <div className="flex flex-col justify-center items-center mx-auto gap-4">
          <div className="text-xl">Welcome to Dacreed New Horizons!</div>
          <div className="text-xs">
              It&#39;s a wide world of career growth possibilities out there. This tool is designed to <strong>help you navigate</strong> the endless options
              by <strong>informing you accurately</strong> as to what each path would look like, and by <strong>giving you personlaised recommendations</strong> based on your unique set of
              skills, experiences, goals, and preferences. 
          </div>
          <div className="text-xs">
              To get started, just click the button below. We&#39;ll walk you through a short set of questions about your education and work up to this point, and 
              any ideas you have about where you want to go from here. The information you provide can be general or specific and can be changed at any time. 
          </div>
          <div className="text-xs">
              Based on your personal story and aspirations, our career growth engine will generate a dynamic opportunity tree (check out the one to the right!) just for you.
              Our 1st and 2nd recommended paths will be outlined in green, and you will be able to interact with the tree in real time. You can <strong> zoom </strong>in or out, <strong>drag </strong>to reshape or reposition, <strong>click</strong> on any blue nodes to hide/display brnaches, <strong>hover </strong>over any node to enlarge text,<strong> click</strong> on any node for
              information and links in a pop-out display, <strong>toggle</strong> lifestyle preferences to adjust recommendations, and more. 
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

export default InputStep1