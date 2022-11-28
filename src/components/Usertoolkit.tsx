import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import QuestionaireButton from "../components/questionnaire/QuestionaireButton";
import { Button } from "@mui/material";
import LeftSideBar from "./leftPanel/LeftSideBar";

type Props = {
  setPrototypeId: React.Dispatch<React.SetStateAction<string>>,
}

const Usertoolkit = (props: Props) => {
  const { setPrototypeId } = props
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = window.localStorage.getItem("user") || null;
    if (typeof user === "string") {
      setUserName(JSON.parse(user));
    }
  }, []);

  // const logOut = () => {
  //   window.localStorage.clear();
  //   router.push("/");
  // };


  return (
    <div className="container flex h-screen justify-between fixed">

    
      {/* <LeftSideBar/> */}
   

      <div className="w-1/2">
        <div className="flex flex-row flex-wrap justify-between gap-5 mt-5">

          <Button variant="outlined" className="" onClick={() => {setPrototypeId('s5New')}}>
              Prototype 1
          </Button>

          <Button variant="outlined" onClick={() => { setPrototypeId('s6') }}>
              Prototype 2
          </Button>

          <Button variant="outlined" onClick={() => {setPrototypeId('d4')}}>
              Opportunity Tree
          </Button>
          
          <Button variant="outlined" onClick={() => {setPrototypeId('d5')}}>
              Take Flight
          </Button>
          </div>

          {/* <div className="text-center">
            <h1 className="mb-4 mt-5 font-bold">
              Hello {userName}! Please choose a PDP prototypes by clicking on one of the buttons above.
            </h1>
          </div> */}

          </div>

        {/* <div className="my-10">
          <button
            onClick={() => logOut()}
            className="mr-6 rounded-lg bg-[#38476e] px-5 py-1.5 text-white hover:bg-[#AFC3FF]"
          >
            Sign Out
          </button>

          <QuestionaireButton />
        </div> */}
    </div>
  );
};

export default Usertoolkit;
