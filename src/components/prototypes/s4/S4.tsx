
import Link from "next/link";
import QuestionaireButton from "../../questionnaire/QuestionaireButton";
import Circles from "./Circles";


const prototypeS4 = () => {
  return (
    <>
      <main className="mx-auto max-w-full flex justify-center">

        <div className="flex flex-col max-w-7xl ">

        <div className="my-12 flex justify-center">
          <h2 className="text-2xl font-semibold">
            Listed below are suggested career pathways and how long it would take you to achieve them.
          </h2>
        </div>

          <div className="my-3 flex justify-center">
            <Circles/>
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

export default prototypeS4;
