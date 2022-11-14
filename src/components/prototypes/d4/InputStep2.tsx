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
    handleChange: (event: any) => void
}

const InputStep2 = (props: Props) => {
    const { userInput, setInputStep, handleChange } = props

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
            <div className="mb-2">First, please share a bit about your experience.</div>
            <div className="text-xs mb-4"> <em>You&#39;ve worked hard to get to where you are. This hard work has sown the seeds for exciting future growth potenial.</em></div>
            <label className="flex w-full text-sm">1) What is your highest level of education?</label>
            <div className="mb-4">
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={userInput.edlevel}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                >
                    <MenuItem value={"highschool"}>High School</MenuItem>
                    <MenuItem value={"diploma"}>Polytech</MenuItem>
                    <MenuItem value={"bachelors"}>Bachelors</MenuItem>
                    <MenuItem value={"masters"}>Masters</MenuItem>
                    <MenuItem value={"phd"}>Phd.</MenuItem>
                    <MenuItem value={"postdoc"}>Postdoctorate</MenuItem>
                </TextField>
            </div>
            <label className="flex w-full text-sm ">2) In what subject(s)?</label>
            <div className="mb-4">
                <InputLabel id="demo-multiple-checkbox-label">(Choose all that apply)</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="interestfields"
                    value={userInput.educationfields}
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
                    {edfields.map((field) => (
                        <MenuItem key={field} value={field}>
                            {field}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <label className="flex w-ful text-sm">3) What&#39; s the highest level professional role you&#39;ve held?</label>
          <div className="mb-4">
              <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={userInput.worklevel}
                  onChange={handleChange}
                  sx={{ width: '100%' }}
              >
                  <MenuItem value={"intern"}>Intern</MenuItem>
                  <MenuItem value={"junior"}>Junior</MenuItem>
                  <MenuItem value={"middle"}>Mid-level</MenuItem>
                  <MenuItem value={"senior"}>Senior</MenuItem>
                  <MenuItem value={"executive"}>Executive</MenuItem>
              </TextField>
          </div>
          <label className="flex w-ful text-sm">4) What field is/was this in?</label>
          <div className="mb-4 ">
              <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  name="backgroundfield"
                  value={userInput.backgroundfield}
                  onChange={handleChange}
                  sx={{ width: '100%' }}
              >
                  {careerfields.map((field) => (
                      <MenuItem key={field} value={field}>
                          {field}
                      </MenuItem>
                  ))}
              </TextField>
          </div>
          
          <label className="flex w-full text-sm">5) Do you have any other degrees, diplomas, certifications, or Dacreed qualifications?</label>
          <div className="mb-8">
              <InputLabel id="demo-multiple-checkbox-label">(Choose all that apply)</InputLabel>
              <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  name="certifications"
                  value={userInput.certifications}
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
                  {certs.map((cert) => (
                      <MenuItem key={cert} value={cert}>
                          {cert}
                      </MenuItem>
                  ))}
                </Select>
            </div>
            <div className="flex w-full justify-between">
                <Button variant="contained" className="bg-[#1848C8]" onClick={() => setInputStep(1)}>
                    Prev
                </Button>
                <Button variant="contained" className="bg-[#1848C8]" onClick={() => setInputStep(3)}>
                    Next
                </Button>
            </div>
        </div>
  )
}

export default InputStep2