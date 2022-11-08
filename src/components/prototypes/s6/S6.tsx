
import Link from "next/link";
import QuestionaireButton from "../../questionnaire/QuestionaireButton";
import Cubes from "./Cubes";



const prototypeS6 = () => {
  return (
    <>
      <main className="mx-auto max-w-full flex justify-center">

        <div className="flex flex-col max-w-full ">

        <div className="my-12 flex justify-center flex-col text-center">
          <h2 className="text-5xl font-semibold">
            Your Tech career pathways
          </h2>
        </div>
        
         <div className=" text-center text-3xl">
           <p>Click on each cube to see the different ways you could achieve your goal.</p>
         </div>

          <div className="my-12 flex justify-center max-w-full bg-[#103e41] rounded-lg hover:rounded-full">
            <Cubes/>
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

export default prototypeS6;
