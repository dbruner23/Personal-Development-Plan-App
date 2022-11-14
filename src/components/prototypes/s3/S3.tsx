import NonLinearStepper from "./NonLinearStepper";
import NonLinearStepper2 from "./NonLinearStepper2";
import SoftwareDeveloperModal1 from "./SoftwareDeveloperModal1";
import SoftwareDeveloperModal2 from "./SoftwareDeveloperModal2";

const prototypeS3 = () => {
  return (
    <>
      <main className="mx-auto max-w-full flex justify-center">

        <div className="flex flex-col max-w-7xl ">

        <div className="my-12 flex justify-center flex-col text-center">
          <h2 className="text-2xl font-semibold">
            Listed below are 2 different pathways to become a Software Developer. 
          </h2>
          <p>Choose your preferred path to reach your goal and tick off each step along the way, once completed.</p>
        </div>

        <div className="my-4 flex  m-3  flex-col justify-center rounded-lg bg-[#f4f4f4] p-4">
          <div className="mb-4 text-lg font-bold text-[#2a479d]">
            <h1>Study at University - 4 years (incl. 1 year Master)</h1>
          </div>
          <NonLinearStepper2 />
        </div>

        <div className="mb-12 ml-4">
          <SoftwareDeveloperModal2/>
        </div>
        
      

        <div className="my-4 flex m-3 flex-col justify-center rounded-lg bg-[#e3e6ee] p-4">
          <div className="mb-4 text-lg font-bold text-[#2a479d]">
            <h1>Study with Mission Ready - 6-8 months</h1>
          </div>
          <NonLinearStepper />
        </div>

        <div className="mb-12 ml-4">
          <SoftwareDeveloperModal1/>
        </div> 

        </div>
      </main>
    </>
  );
};

export default prototypeS3;
