
import Cubes from "./Cubes";
import data from "./dataSoftware.json"


type Props = {
  input: { currentPosition: string, goal: string },
  setPath: React.Dispatch<React.SetStateAction<any[]>>
}


const prototypeS6 = (props: Props) => {

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
      <main className="mx-auto w-1/2 flex justify-center mt-28">

        <div className="flex flex-col ">


        
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
