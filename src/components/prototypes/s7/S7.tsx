import LineChart1 from "./LineChart1";
import data from "./data3.json"

type Props = {
  input: { currentPosition: string, goal: string },
  setPath: React.Dispatch<React.SetStateAction<any[]>>
}

const S7 = (props: Props) => {

  const { input, setPath } = props;

  const selectedPath = data.filter((path: any[]) => {
   
    return path[0].data.name === input.currentPosition && path[path.length - 1].data.name === input.goal
  })

  if ( selectedPath.length === 1 && selectedPath[0] !== undefined ) {
    setPath(selectedPath[0])
  } else if (input.goal !== "" ) {
    alert("We're sorry but there is not a defined path from these points.")
  }


  return (
    <>
      
<main className='mx-auto w-3/4 mt-24 '>
  
<div className="flex flex-col justify-between p-6">

<div className="flex justify-center my-4 max-h-full " >
<LineChart1 />
</div>


{/* <Box className="mb-5 w-2/5 ml-32" 
sx={{
  mb: 2,
  display: "flex",
  flexDirection: "column",
  height: 450,
  overflow: "hidden",
  overflowY: "scroll",
}}> */}
{/* {data.map((result, index) =>(

  <div key={index} className="bg-[#dddfe6] p-1 m-2 rounded-lg">
       
        <div key={index}>

          <div key={index}>
            <p key={index}><span className="font-bold text-[#4b5b66]">{result.name}</span></p>
          </div>

          <div key={index}>
           <p key={index}><span className="text-sm">{result.past}</span></p>
           <p key={index}><span className="text-sm">{result.path1}</span></p>
           <p key={index}><span className="text-sm">{result.path2}</span></p>
          </div>

          <br/>

        </div>
         
  </div>
))} */}
{/* </Box> */}

</div>

</main>
      
    </>
  );
};

export default S7
