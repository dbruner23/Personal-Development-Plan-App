
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
           <p>This prototypes shows you 4 different ways you could further progress your career in tech.</p>
           <p>Click on each one to see the different ways you could achieve your goal.</p>
         </div>

          <div className="my-12 flex justify-center max-w-full bg-[#103e41] rounded-lg hover:rounded-full">
            <Cubes/>
          </div>


        </div>
      </main>
    </>
  );
};

export default prototypeS6;
