import Link from "next/link";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/future/image";
import James from "../../public/images/James.jpg";
import Jean from "../../public/images/Jean.jpg";

const ChoosePersona = () => {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start gap-4 p-4">
        <div className="text-4xl font-bold m-14">
            <h1>Please choose a persona</h1>
        </div>
        <p className="w-2/3"><strong>Just a quick orientation...</strong> the Horizons app will be available to Dacreed users within
          their profile dashboard. Thus for trial purposes, imagine yourself in the shoes of one of these
          (fictional) Dacreed users with an existing profile, and the career scenario and aspirations outlined below.  
        </p>

        <div className="flex flex-row">   
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 3,
                  width: 450,
                  height: 200,
                },
              }}
            >
            <Link href={'/dashboard'}>
              <Paper
                onClick={() => {
                  const persona = window.localStorage.setItem("persona", "James");
                }}
                elevation={3} sx={{ overflow: "hidden" }}
              >
                  <div className="flex flex-row justify-between align-center cursor-pointer h-full">
                    <div className="flex flex-col justify-start p-10 h-full">
                      <div><strong>James,</strong> mid 30s.</div>
                      <p>A Senior Digital Marketing Director looking for</p>
                      <strong><p>a career change.</p></strong>
                    </div>
                    <div className="h-full w-1/2">
                      <Image
                        src={James}
                        alt="image of prototype 1S"
                        className="h-full cursor-pointer object-cover"
                      ></Image>
                    </div>
                  </div>
                </Paper>
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 3,
                  width: 450,
                  height: 200,
                },
              }}
            >
            <Link href={'/dashboard'}>
              <Paper
                onClick={() => {
                  const persona = window.localStorage.setItem("persona", "Jean");
                }}
                elevation={3}
                sx={{ overflow: "hidden" }}
              >
                  <div className="flex flex-row justify-between cursor-pointer h-full">
                    <div className="flex flex-col justify-start p-10 h-full">
                      <div><strong>Jean,</strong> late 20s.</div>
                      <p>A successful junior level professional looking to</p>
                      <p><strong>progress their career.</strong></p>
                    </div>
                  <div className="h-full w-1/2">
                      <Image
                        src={Jean}
                        alt="image of prototype 1S"
                        className="h-full object-cover cursor-pointer"
                      ></Image>
                    </div>
                  </div>
                </Paper>
              </Link>
            </Box>
        </div>

      </main>
    </>
  );
};

export default ChoosePersona;
