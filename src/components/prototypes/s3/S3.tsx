import { Button } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import NonLinearStepper from "./NonLinearStepper";
import NonLinearStepper2 from "./NonLinearStepper2";
import QuestionaireButton from "../../questionnaire/QuestionaireButton";

const prototypeS3 = () => {
  return (
    <>
      <main className="mx-auto max-w-full flex justify-center">

        <div className="flex flex-col max-w-7xl ">

        <div className="my-12 flex justify-center">
          <h2 className="text-2xl font-semibold">
            Listed below are 2 different pathways. Choose your preferred
            path to reach your goal.
          </h2>
        </div>

        <div className="my-8 flex m-3 flex-col justify-center rounded-lg bg-[#e3e6ee] p-4">
          <div className="mb-4 text-lg font-bold text-[#2a479d]">
            <h1>Career path 1</h1>
          </div>
          <NonLinearStepper />
        </div>

        <div className="my-8 flex  m-3  flex-col justify-center rounded-lg bg-[#f4f4f4] p-4">
          <div className="mb-4 text-lg font-bold text-[#2a479d]">
            <h1>Career path 2</h1>
          </div>
          <NonLinearStepper2 />
        </div>

        <div className="my-8 flex justify-center">
          <Link href={"/dashboard"}>
            <button className="mr-4 rounded-md bg-[#1848C8] px-5 py-2 text-sm text-white hover:bg-[#AFC3FF]">
              BACK TO DASHBOARD
            </button>
          </Link>
          <QuestionaireButton />
        </div>

        </div>
      </main>
    </>
  );
};

export default prototypeS3;
