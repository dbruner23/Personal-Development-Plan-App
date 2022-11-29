import React, { useState } from 'react';
import Jean from "../../../public/images/Jean.jpg";
import ProgressBar from "../../../public/images/1lineS.png";
import ProgressBarVector from "../../../public/images/Vector1.png";
// import James from '../../../../public/images/James.jpg'
import Image from "next/future/image";
import { Button } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  setLIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const LeftSideBar = (props: Props) => {
  const { setLIsCollapsed } = props;
  const [leftCollapsed, setLeftCollapsed] = useState(false);

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
          <div className=" mt-6 flex-col">
            <Image
              src={Jean}
              alt="Jean"
              className="ml-10 h-28 w-28 rounded-full "
            ></Image>
            <div className="mt-6 text-center text-lg">Jean Morgan</div>
            <div className="text-md mt-1 mb-4 text-center">
              Junior Investment Banker
            </div>
            <label className="text-sm ">Your career progression</label>
            <Image
              src={ProgressBar}
              alt="Progress Bar"
              className="mt-2 w-52"
            ></Image>
            <Image
              src={ProgressBarVector}
              alt="Progress Bar vector"
              className="mb-4 w-52"
            ></Image>

            <div className="flex flex-col">
              <label className="mb-2 mt-8 text-sm ">Set Career Goal</label>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="goal"
                // onChange={handleChange}
                sx={{ width: "15vw" }}
              >
                <MenuItem value={"specific"}>new goal</MenuItem>
                <MenuItem value={"general"}>different goal</MenuItem>
              </TextField>

              <label className="mb-2 mt-2 text-sm ">Set Current Position</label>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="goal"
                // onChange={handleChange}
                sx={{ width: "15vw" }}
              >
                <MenuItem value={"specific"}>new position</MenuItem>
                <MenuItem value={"general"}>new position 2</MenuItem>
              </TextField>
            </div>

            <div className=" mt-12 flex flex-col justify-center ">
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
