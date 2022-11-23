import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/future/image";
import PrototypeS1image from "../components/innerCircleGraph/img/prototypeS1.png";
import PrototypeS2image from "../components/prototypes/s2/img/graphS2.png";
import PrototypeS3image from "../components/prototypes/s2/img/PrototypeS3.png";
import PrototypeD2image from "../components/prototypes/s2/img/PrototypeD2.png";
import PrototypeS4image from "../components/prototypes/s2/img/PrototypeS4.png";
import PrototypeS5image from "../components/prototypes/s2/img/PrototypeS5.png";
import PrototypeS6image from "../components/prototypes/s2/img/PrototypeS6.png";
import PrototypeS7image from "../components/prototypes/s2/img/PrototypeS7.png";
import QuestionaireButton from "../components/questionnaire/QuestionaireButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Dashboard = () => {

  const router = useRouter();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = window.localStorage.getItem("user") || null;
    if (typeof user === "string") {
      setUserName(JSON.parse(user));
    }
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    router.push("/");
  };


  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="text-center">
        <h1 className="mb-4 font-bold">
          Hello {userName}! Please find a variety of PDP prototypes listed
          below.
        </h1>
        <p>
          Select each Prototype to demo and fill out the Prototype feedback
          form.
        </p>
        <p>
          Once you reviewed all of the prototypes, please also fill out the <span className="font-bold">
          feedback form at the bottom of this page.</span>
        </p>
        <p>Thank you for helping us with this project.</p>
      </div>
      <div className="flex flex-row flex-wrap justify-between gap-5">


        <Box
          sx={{
            display: "flex align-center",
            justifyContent: 'center',
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 200,
            },
          }}
        >
          <Paper elevation={3}>
            <Link href={`s1/${userName}`}>
              <Image
                src={PrototypeS1image}
                alt="image of prototype 1S"
                className="h-48 w-60 cursor-pointer"
              ></Image>
            </Link>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 200,
            },
          }}
        >
          <Paper elevation={3}>
            <Link href={`s2/${userName}`}>
             <Image
             src={PrototypeS2image}
             alt="image of prototype 2S"
             className="h-48 w-60 cursor-pointer"
             ></Image>
            </Link>
          </Paper>
        </Box>

        
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 200,
            },
          }}
        >
          <Paper elevation={3}>
          <Link href={`s3/${userName}`}>
          <Image
            src={PrototypeS3image}
            alt="image of prototype 3S"
            className="h-48 w-60 cursor-pointer"
          ></Image>
        </Link>
          </Paper>
        </Box>


        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 200,
            },
          }}
        >
          <Paper elevation={3}>
          <Link href={`/d4primer`}>
          <Image
            src={PrototypeD2image}
            alt="image of prototype D2"
            className="h-48 w-60 cursor-pointer"
          ></Image>
        </Link>
          </Paper>
        </Box>   


        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 200,
            },
          }}
        >
          <Paper elevation={3}>
          <Link href={`s4/${userName}`}>
          <Image
            src={PrototypeS4image}
            alt="image of prototype 4S"
            className="h-48 w-60 cursor-pointer"
          ></Image>
        </Link>
          </Paper>
        </Box>        

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 200,
            },
          }}
        >
          <Paper elevation={3}>
          <Link href={`s5New/${userName}`}>
          <Image
            src={PrototypeS5image}
            alt="image of prototype 5S"
            className="h-48 w-60 cursor-pointer"
          ></Image>
        </Link>
          </Paper>
        </Box> 


        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 200,
            },
          }}
        >
          <Paper elevation={3}>
          <Link href={`s6/${userName}`}>
          <Image
            src={PrototypeS6image}
            alt="image of prototype 6S"
            className="h-48 w-65 cursor-pointer rounded border"
          ></Image>
        </Link>
          </Paper>
        </Box>


        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 200,
            },
          }}
        >
          <Paper elevation={3}>
          <Link href={`s7/${userName}`}>
          <Image
            src={PrototypeS7image}
            alt="image of prototype 7S"
            className="h-48 w-60 cursor-pointer"
          ></Image>
        </Link>
          </Paper>
        </Box>


      </div>

      <div className="my-10">
        <button
          onClick={() => logOut()}
          className="mr-6 rounded-lg bg-[#38476e] px-5 py-1.5 text-white hover:bg-[#AFC3FF]"
        >
          Sign Out
        </button>

        <QuestionaireButton />
      </div>
    </main>
  );
};

export default Dashboard;
