import LineChart1 from "./LineChart1";
import data from "./data2";


const S7 = () => {
  return (
    <>
      
<main className='mx-auto mt-4 max-w-full'>
  
<div className="flex justify-center my-4">
<h2 className="text-2xl font-semibold text-center">This Prototype shows your past career progression and 2 pathways that can help you reach 100% of your career goal by 2025 </h2>
</div>

<div className=" flex justify-center text-center flex-col">
<p>The graphs below shows your career timeline in relation to reaching your career goal. </p>
<p>The idea is to give you a better understanding of the amount of time required in reaching your goal and show you how much of your goal you have already achieved today. </p>
</div>


<div className="flex justify-center my-8 max-h-full" >
<LineChart1/>
</div>
<div className="flex flex-row flex-wrap justify-center mb-5">
{data.map((result, index) =>(

<div key={index} className="bg-[#dddfe6] p-2 m-2 rounded-lg">
       
        <div key={index}>

          <div key={index}>
            <p key={index}><span className="font-bold text-[#90377b]">{result.name}</span></p>
          </div>

          <div key={index}>
           <p key={index}><span className="text-sm">{result.past}</span></p>
           <p key={index}><span className="text-sm">{result.path1}</span></p>
           <p key={index}><span className="text-sm">{result.path2}</span></p>
          </div>

          <br/>

        </div>
         
</div>
))}
</div>

</main>
      
    </>
  )
}

export default S7
