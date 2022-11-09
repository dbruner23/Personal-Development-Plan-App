
import Link from "next/link";
import QuestionaireButton from "../../questionnaire/QuestionaireButton";
import SankeyChart from "./SankeyChart";



const prototypeS5 = () => {
  return (
    <>
      <main className="mx-auto max-w-full flex justify-center">

        <div className="flex flex-col max-w-full ">

        <div className="my-12 flex justify-center flex-col text-center">
          <h2 className="text-5xl font-semibold">
            Your Marketing career pathways
          </h2>
        </div>
        
         <div className=" text-center text-3xl">
           <p>Hover over each path to see approximately how many months it would take you to achieve the path.</p>
         </div>

          <div className="my-6 flex justify-center">
            <SankeyChart/>
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

export default prototypeS5;