import Head from "next/head";
import Link from "next/link";
import OurTree from "../../innerCircleGraph/OurTree";
import QuestionaireButton from "../../questionnaire/QuestionaireButton";


const prototypeS1 = () => {
  return (
    <>
      
<main className='mx-auto my-12 max-w-full'>
  
<div className="flex justify-center">
<h2 className="text-2xl font-semibold w-8/12 text-center">This Prototype shows you three different career pathways you can take that can help you to reach your goal to become a software developer</h2>
</div>

<div className="flex justify-center">
<p>Click Start to see your career development options</p>
</div>
 
<div className="flex justify-center my-12 max-h-full" >
<OurTree/>
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

export default prototypeS1
