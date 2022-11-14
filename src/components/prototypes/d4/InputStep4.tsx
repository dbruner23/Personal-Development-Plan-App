import React from 'react'

interface IUserInput {
    goal: string, seekscope: string, interestfields: any[], worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
}

type Props = {
    userInput: {
        goal: string, seekscope: string, interestfields: any[], worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
    },
    setUserInput: React.Dispatch<React.SetStateAction<IUserInput>>,
    handleChange: (event: any) => void
}

const InputStep4 = (props: Props) => {
  return (
    <div>InputStep4</div>
  )
}

export default InputStep4