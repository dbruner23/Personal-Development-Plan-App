import React from 'react'
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

interface IUserInput {
    goal: string, seekscope: string, interestfields: any[], worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
}

type Props = {
    userInput: {
        goal: string, seekscope: string, interestfields: any[], worklevel: string, backgroundfield: string, edlevel: string, educationfields: any[], certifications: any[]
    },
    setInputStep: React.Dispatch<React.SetStateAction<number>>,
    handleChange: (event: any) => void,
    handleSubmit: () => void
}

const InputStep2 = (props: Props) => {
    const { userInput, setInputStep, handleChange, handleSubmit } = props

    const careerfields = [
        'engineering', 'management', 'medical', 'finance', 'other'
    ]
    const edfields = [
        'computer science', 'philosophy', 'visual arts', 'history', 'other'
    ]
    const certs = [
        'legal compliance', 'nz tax law', 'other'
    ]

    return (
        <div className="flex flex-col justify-center mx-auto gap-2">
            <div className="text-center">Now let&#39;s talk about the future.</div>
            <div className="text-xs mb-4"> <em>Whether you have specific goals or general ideas, we want to help you visualise and explore the possibilities.</em></div>
            <label className="flex w-ful text-sm">1) Which of the following best describes your current professional development interest?</label>
            <div className="mb-4">
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    name="seekscope"
                    value={userInput.seekscope}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                >
                    <MenuItem value={"specific"}>I want to explore advancement opportunities in my current field.</MenuItem>
                    <MenuItem value={"general"}>I want to explore possible paths in several areas of interest.</MenuItem>
                    <MenuItem value={"broad"}>I want to explore broadly and discover new possibilities.</MenuItem>
                </TextField>
            </div>
            <label className="flex w-full text-sm">Which career field(s)/path(s) are you most interested to explore?</label>
            <div className="mb-4">
                <InputLabel id="demo-multiple-checkbox-label">(Choose all that apply)</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="interestfields"
                    value={userInput.interestfields}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
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
            <label className="flex w-full text-sm">Is there a particular job title or role you aspire to?</label>
            <div className="mb-4 ">
                <TextField
                    id="outlined-multiline-flexible"
                    label="your answer here..."
                    name="goal"
                    value={userInput.goal}
                    onChange={handleChange}
                    multiline
                    maxRows={10}
                    sx={{ width: '100%', }}
                    helperText="You can leave this blank if you're unsure."
                />
            </div>
            <div className="flex w-full justify-between">
                <Button variant="contained" className="bg-[#1848C8]" onClick={() => setInputStep(2)}>
                    Prev
                </Button>
                <Button variant="contained" className="bg-[#1848C8]" onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default InputStep2