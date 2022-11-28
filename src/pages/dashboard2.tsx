import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import QuestionaireButton from "../components/questionnaire/QuestionaireButton";
import { Button } from "@mui/material";
import LeftSideBar from "../components/leftPanel/LeftSideBar";

const Dashboard = () => {

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
    <main className="container flex min-h-screen justify-between ">

    
      <LeftSideBar/>
   

<div className="w-1/2">
      <div className="flex flex-row flex-wrap justify-between gap-5 mt-5 ">

        <Button variant="outlined">
            <Link href={`s1/${userName}`}>Prototype 1</Link>
        </Button>

        <Button variant="outlined">
            <Link href={`s2/${userName}`}>Prototype 2</Link>
        </Button>

        <Button variant="outlined">
            <Link href={`s3/${userName}`}>Prototype 3</Link>
        </Button>

        <Button variant="outlined">
            <Link href={`/d4primer`}>Prototype 4</Link>
        </Button>
        
        <Button variant="outlined">
            <Link href={`s4/${userName}`}>Prototype 5</Link>
        </Button>
  
        <Button variant="outlined">
            <Link href={`s5New/${userName}`}>Prototype 6</Link>
        </Button>

        <Button variant="outlined">
            <Link href={`s6/${userName}`}>Prototype 7</Link>
        </Button>

        <Button variant="outlined">
            <Link href={`s7/${userName}`}>Prototype 8</Link>
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
    </main>
  );
};

export default Dashboard;
