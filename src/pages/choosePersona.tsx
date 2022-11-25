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
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <div className="text-xl font-bold">
            <h1>Please choose your Persona</h1>
        </div>

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
          <Link href={`dashboard2/`}>
            <Paper elevation={3} sx={{ overflow: "hidden" }}>
              <div className="flex flex-row justify-between align-center">
                <div className="flex flex-col justify-center ml-10">
                  <div><strong>James,</strong> early 30s</div>
                  <p>A journalist looking for</p>
                  <strong><p>a career change</p></strong>
                </div>
                <div>
                  <Image
                    src={James}
                    alt="image of prototype 1S"
                    className="h-50 w-40 cursor-pointer"
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
          <Link href={`dashboard2/`}>
            <Paper elevation={3} sx={{ overflow: "hidden" }}>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center ml-8 w-1/2 mb-10">
                  <div><strong>Jean,</strong> late 20s.</div>
                  <p>A a Junior Investment Banker looking to further</p>
                  <p><strong>progress their career</strong></p>
                </div>
                <div>
                  <Image
                    src={Jean}
                    alt="image of prototype 1S"
                    className="h-50 w-40 cursor-pointer"
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
