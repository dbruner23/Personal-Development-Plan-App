import { Button} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Pathway1Popover from "./Pathway1Popover";
import Pathway2Popover from "./Pathway2Popover";
import Pathway3Popover from "./Pathway3Popover";
import SimpleLineChart from "./SimpleLineChart";
import QuestionaireButton from "../../questionnaire/QuestionaireButton";

const prototypeS2 = () => {
  return (
    <>
      
<main className='mx-auto my-12 max-w-full'>
  
<div className="flex justify-center my-12 ">
<h2 className="text-2xl font-semibold">Thank you for choosing this Prototype</h2>
</div>

<div className="flex justify-center text-center">
<p>The graph below shows you the 3 different pathways to reach your goal over the next 7 months and the amout of hours you can expect to spend on the path per month </p>
</div>

<div className="flex justify-center my-8 gap-10">
<Pathway1Popover/>
<Pathway2Popover/>
<Pathway3Popover/>
</div>

<div className="flex justify-center my-8 max-h-full" >
<SimpleLineChart/>
</div>

<div className="flex justify-center my-12">
<Link href={"/dashboard"} >
<button className="px-5 py-2 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-md mr-4 text-sm">
 BACK TO DASHBOARD
</button>
</Link>
<QuestionaireButton/>
</div>

</main>
      
    </>
  )
}

export default prototypeS2
