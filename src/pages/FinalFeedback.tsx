import TextField from "@mui/material/TextField";
import { useState } from "react";
import Head from "next/head";
import MenuItem from '@mui/material/MenuItem';
import ThankYouModal from "../components/questionnaire/ThankYouModal";
import Image from "next/future/image";
import { trpc } from "../utils/trpc";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ThankYouModal2 from "../components/questionnaire/ThankYouModal2";


const prototypes = [
  {
    id: 'rate1',
    label: 'Sankey chart',
    src: '/PrototypeS5.png',
  },
  {
    id: 'rate2',
    label: 'Career timeline',
    src: '/PrototypeS7.png',
  },
  {
    id: 'rate3',
    label: 'Career tree',
    src: '/PrototypeD2.png',
  },
  {
    id: 'rate4',
    label: 'Take flight',
    src: '/PrototypeFlight.png',
  },
  {
    id: 'rate5',
    label: '3D Career tool',
    src: '/PrototypeS6.png',
  },
  {
    id: 'rate6',
    label: 'Career path',
    src: '/prototypeS1.png',
  },
//   {
//     id: 'rate7',
//     label: 'Prototype 7',
//     src: '/PrototypeS5.png',
//   },
//   {
//     id: 'rate8',
//     label: 'Prototype 8',
//     src: '/PrototypeS6.png',
//   },
//   {
//     id: 'rate9',
//     label: 'Prototype 9',
//     src: '/PrototypeS7.png',
//   },
];

const FinalFeedback = () => {
  const [overallFeedback, setOverallFeedback] = useState<any>({ rate1: '', rate2: '', rate3: '', rate4: '', rate5: '', rate6: '', favourite: '' });
  const saveOverallFeedback = trpc.overallfeedback.saveOverallFeedback.useMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOverallFeedback({...overallFeedback, [event.target.name]: event.target.value});
  };

  const handleSubmit = async () => {    
    const username = (window.localStorage.getItem("user"));
    const finalOverallFeedback = JSON.stringify(overallFeedback);
    if (username !== null && finalOverallFeedback !== null) {
        await saveOverallFeedback.mutateAsync({ username, finalOverallFeedback })  
      } 
       
  }

  return (
    <>
      <Head>
        <title>feedback form</title>
        <meta name="feedback form" content="PDP Horizons by Dacreed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-2 flex justify-center mx-auto">

        <div className="my-12 flex flex-col">
        
        <div className="flex justify-center mb-5 ">
           <h2 className="text-3xl font-bold">Thank you for checking out our Prototypes</h2>
        </div>

        <div className="flex justify-center mb-12">
           <p>We really appreciate you taking the time to complete this short Prototype feedback form</p>
        </div>

        <div>
        
        </div>

    <div className="flex justify-center mx-auto flex-col bg-[#eff1f4] p-12 rounded-xl">


            {prototypes.map((option) => ( 
        <div key={option.label} className="mb-12">
            <div className="flex-row">
              <Image 
                src={option.src}
                alt={option.label}
                width="90"
                height="90"/>
                <h3 className="font-bold">{option.label}</h3>
            </div>
          <div>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Please rate this Prototype on a scale of 1 - 10</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name={option.id}
                    value={overallFeedback[option.id]}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    <FormControlLabel value="6" control={<Radio />} label="6" />
                    <FormControlLabel value="7" control={<Radio />} label="7" />
                    <FormControlLabel value="8" control={<Radio />} label="8" />
                    <FormControlLabel value="9" control={<Radio />} label="9" />
                    <FormControlLabel value="10" control={<Radio />} label="10" />
                  </RadioGroup>
                </FormControl>
          </div>
        </div>
         ))}
        

        <div className="mb-14 mx-auto">
          <TextField
          id="outlined-select-currency"
          select
          label="Select"
          name="favourite"
          value={overallFeedback.favourite}
          onChange={handleChange}
          helperText="Please select your favourite Prototype"
        >
          {prototypes.map((option) => (    
            <MenuItem key={option.label} value={option.label}>
              {option.label} 
              <Image 
                src={option.src}
                alt={option.label}
                width="90"
                height="90"/>
            </MenuItem>
          ))}
        </TextField>
          </div>

          <div className="flex justify-center">
              <ThankYouModal2 handleSubmit={handleSubmit} />
          </div>

          </div>
        </div>
        
      </main>
    </>
  );
};

export default FinalFeedback;
