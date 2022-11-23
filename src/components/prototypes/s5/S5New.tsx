import SankeyChart from "./SankeyChart";
import LeftPanel from "./LeftPanel";



const S5New = () => {
  return (
    <>
     

        <div className="flex justify-evenly ">

        <div className=" ">
        <LeftPanel/>
         </div>

          <div className="w-2/4 absolute top-10 ">
            <SankeyChart/>
          </div>


        </div>
   
    </>
  );
};

export default S5New;
