import React, { useState, useEffect } from 'react';
import Jean from "../../../public/images/Jean.jpg";
import James from "../../../public/images/James.jpg"
import ProgressBar from "../../../public/images/1lineS.png";
import ProgressBarVector from "../../../public/images/Vector1.png";
// import James from '../../../../public/images/James.jpg'
import Image from "next/future/image";
import { Button } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from "@mui/material/MenuItem";
import { String } from 'lodash';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import currentposfinance from '../../data/currentposfinance.json'
import currentpossoftware from '../../data/currentpossoft.json'
import goalfinance from '../../data/goalfinance.json'
import goalsoftware from '../../data/goalsoftware.json'
import ChevronLeft from 'public/chevron-left.svg'
import ChevronRight from 'public/chevron-right.svg'
import Link from 'next/link';
import QuestionaireButton from '../questionnaire/QuestionaireButton';

type Props = {
  setLIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
  persona: string,
  prototypeId: string,
  setInput: React.Dispatch<React.SetStateAction<{ currentPosition: string, goal: string }>>,
  currentPos: string,
  setCurrentPos: React.Dispatch<React.SetStateAction<string>>,
  goal: string,
  setGoal: React.Dispatch<React.SetStateAction<string>>,
}

const LeftSideBar = (props: Props) => {
  const { setLIsCollapsed, persona, prototypeId, setInput, currentPos, setCurrentPos, goal, setGoal} = props;
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [currentPosData, setCurrentPosData] = useState<{ position: string }[]>([]);
  const [currentGoalData, setCurrentGoalData] = useState<{ position: string }[]>([]);
  const [inputForm, setInputForm] = useState({ currentPosition: "", goal: "" });
  const [inputValue, setInputValue] = useState('');  
  
  useEffect(() => {
    setInputForm({ currentPosition: currentPos, goal: goal})
    // if (persona) {
    //   if ((persona === "Jean") && (prototypeId === "d5")) {
    //     setInputForm({ currentPosition: "Junior Fullstack Developer", goal: "" })
    //   } else if ((persona === "Jean") && (prototypeId !== "d5")) {
    //     setInputForm({ currentPosition: "Junior Investment Banker", goal: "" })
    //   } else {
    //     setInputForm({ currentPosition: "Senior Digital Marketing Director", goal: "" })
    //   }
    // };

    if (prototypeId) {
      if (prototypeId === "d5" || prototypeId === "s6" || prototypeId === "s1") {
        setCurrentPosData(currentpossoftware);
        setCurrentGoalData(goalsoftware);
      } else {
        setCurrentPosData(currentposfinance);
        setCurrentGoalData(goalfinance);
      }

    }
  }, [ prototypeId, currentPos, goal ])

  const handleChange = (event: any) => {
    setInputForm({ ...inputForm, [event.target.name]: event.target.value });
  }

  const handleSubmit = () => {
    setCurrentPos(inputForm.currentPosition)
    setGoal(inputForm.goal)
    setInput({ currentPosition: inputForm.currentPosition, goal: inputForm.goal })
  }


  return (
    <>
      <div
        className={`${
          leftCollapsed
            ? "l-10 h-10 w-6 overflow-hidden rounded-xl bg-[#eff1f4]"
            : "h-full w-64 "
        } transition-all fixed mx-auto flex flex-col items-center justify-between p-0`}
      >
        <button
          className="absolute right-2 top-2 "
          onClick={() => {
            setLIsCollapsed((prev) => { return !prev })
            setLeftCollapsed((prev) => {return !prev;})
          }}
        >
          {leftCollapsed ?
          <div className="flex justify-center items-center">
            <Image
              src={ChevronRight}
              alt="Icon"
              className=""
              >
            </Image>
          </div> :
            <div className="flex justify-center items-center">
            <Image
              src={ChevronLeft}
              alt="Icon"
              className=""
            >
            </Image>
          </div>}
        </button>

        <div className="flex h-full w-full justify-center bg-[#eff1f4] pt-7 ">
          <div className="flex mt-4 flex-col items-center">
            <Image
              src={persona === "Jean" ? Jean : James}
              alt="Jean"
              className="h-28 w-28 rounded-full object-cover object-top"
            ></Image>
            <div className="mt-2 text-center text-lg">{persona === "Jean" ? "Jean Morgan" : "James Dean"}</div>
            <div className="text-md mt-1 mb-4 text-center">
              {((persona === "Jean") && (prototypeId === "d5")) ? "Junior Fullstack Developer" : persona === "Jean" ? "Junior Investment Banker" : "Senior Digital Marketing Director"}
            </div>
            <label className="text-sm ">Your career plan progression</label>
            <Image
              src={ProgressBar}
              alt="Progress Bar"
              className="mt-2 w-52"
            ></Image>
            <Image
              src={ProgressBarVector}
              alt="Progress Bar vector"
              className="w-52 mb-4"
            ></Image>

            <div className="flex flex-col w-52">
              <label className="mb-2 mt-2 text-sm ">Current Position</label>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="currentPosition"
                value={inputForm.currentPosition}
                onChange={handleChange}
                sx={{ width: '100%' }}
              >
                {currentPosData.map((element) => (
                  <MenuItem key={element.position} value={element.position}>
                    {element.position}
                  </MenuItem>
                ))}
              </TextField>
            

              <label className="mb-2 mt-2 text-sm ">Goal</label>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="goal"
                value={inputForm.goal}
                onChange={handleChange}
                sx={{ width: '100%' }}
              >
                {currentGoalData.map((element) => (
                  <MenuItem key={element.position} value={element.position}>
                    {element.position}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="mt-2 flex flex-col justify-center w-48">
              <Button
                variant="contained"

                onClick={() => {
                  if ((inputForm.currentPosition === "") || (inputForm.goal === "")) {
                    alert("Please make sure you have entered your Current Position and your Goal.")
                  // }  else if (currentPosData.find((option) => { option.position === inputForm.currentPosition }) == undefined) {
                  //   alert("We're sorry but this position does not exist in our current data set.")
                  // } else if (currentGoalData.find((option) => { option.position === inputForm.goal }) == undefined) {
                  //   alert("We're sorry but this goal does not exist in our current data set.")
                  } else {
                    handleSubmit()
                  }
                }}

                sx={{ m: 0.5 }}
                className="bg-[#1876D2] mb-4"
              >
                GO!
              </Button>
              <Button
                variant="contained"
                sx={{ m: 0.5 }}
                className="bg-[#2b3b56]"
              >
                Current Plan
              </Button>
              <Button
                variant="contained"
                sx={{ m: 0.5 }}
                className="bg-[#2b3b56]"
              >
                Progress
              </Button>
              <Button
                variant="contained"
                sx={{ m: 0.5 }}
                className="bg-[#2b3b56]"
              >
                Achievements
              </Button>
              <Link href="/choosePersona">
              <Button variant="outlined" sx={{ m: 0.5 }}>
                Settings
              </Button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
