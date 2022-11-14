import Pathway1Popover from "./Pathway1Popover";
import Pathway2Popover from "./Pathway2Popover";
import Pathway3Popover from "./Pathway3Popover";
import SimpleLineChart from "./SimpleLineChart";


const prototypeS2 = () => {
  return (
    <>
      
<main className='mx-auto mt-4 max-w-full'>
  
<div className="flex justify-center my-12 ">
<h2 className="text-2xl font-semibold text-center">This Prototype shows 3 different objectives that can be achieved over a 7 months period as part of your Professional development goals </h2>
</div>

<div className="flex justify-center text-center flex-col">
<p>The graphs below show the amout of hours you can expect to spend on each of the objectives per month. </p>
<p>The idea is to give you a better understanding of the amount of time required in reaching a goal. </p>
</div>

<div className="flex justify-center my-8 gap-10">
<Pathway1Popover/>
<Pathway2Popover/>
<Pathway3Popover/>
</div>

<div className="flex justify-center my-8 max-h-full" >
<SimpleLineChart/>
</div>


</main>
      
    </>
  )
}

export default prototypeS2
