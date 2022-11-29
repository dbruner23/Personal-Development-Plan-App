
import Cubes from "./Cubes";



const prototypeS6 = () => {
  return (
    <>
      <main className="mx-auto w-1/2 flex justify-center mt-28">

        <div className="flex flex-col ">

        {/* <div className="my-12 flex justify-center flex-col text-center">
          <h2 className="text-5xl font-semibold">
            Your Tech career pathways
          </h2>
        </div> */}
        
         <div className=" text-center text-l">
           <p>This prototype looks at a slightly more fun way to present you with 4 different pathways ways to further progress your career in tech.</p>
           <p>Click on each one to find out more information about each pathway</p>
         </div>

          <div className="my-2 flex justify-center max-w-full bg-[#103e41] rounded-lg hover:rounded-full">
            <Cubes/>
          </div>


        </div>
      </main>
    </>
  );
};

export default prototypeS6;
