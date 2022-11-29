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

type Props = {
  setLIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
  persona: string,
  prototypeId: string
}

const LeftSideBar = (props: Props) => {
  const { setLIsCollapsed, persona, prototypeId } = props;
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [input, setInput] = useState({ currentPosition: "", goal: "" });

  useEffect(() => {
    ((persona === "Jean") && (prototypeId === "d5")) ? setInput({ currentPosition: "Junior Fullstack Developer", goal: "" }) :
      persona === "Jean" ? setInput({ currentPosition: "Junior Investment Banker", goal: "" }) :
        setInput({ currentPosition: "Senior Digital Marketing Director", goal: "" })
  })

  const handleChange = (event: any) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  const handleSubmit = () => {

  }

  return (
    <>
      <div
        className={`${
          leftCollapsed
            ? "l-10 h-10 w-6 overflow-hidden rounded-xl bg-[#eff1f4]"
            : "h-full w-1/5"
        }  fixed mx-auto flex flex-col items-center justify-between p-0`}
      >
        <button
          className="absolute right-2 top-2"
          onClick={() => {
            setLIsCollapsed((prev) => { return !prev })
            setLeftCollapsed((prev) => {return !prev;})
          }}
        >
          {leftCollapsed ? <div>&gt;</div> : <div>&lt;</div>}
        </button>

        <div className="flex h-full w-full justify-center overflow-scroll bg-[#eff1f4] pt-7 ">
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
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={prototypeId === 'd5' ? currentpossoftware.map((option) => option.position) : currentposfinance.map((option) => option.position)}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: '100%' }}
                    {...params}
                    label="Enter position"
                    name="currentPosition"
                    value={input.currentPosition}
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />

              <label className="mb-2 mt-2 text-sm ">Goal</label>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={prototypeId === 'd5' ? goalsoftware.map((option) => option.position) : goalfinance.map((option) => option.position)}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: '100%' }}
                    {...params}
                    label="Enter goal"
                    name="goal"
                    value={input.goal}
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
            </div>

            <div className="mt-2 flex flex-col justify-center w-48">
              <Button
                variant="contained"
                onClick={()=> handleSubmit}
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
              <Button variant="outlined" sx={{ m: 0.5 }}>
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
