import SankeyChart from "./SankeyChart";
import data from "../s7/data3.json"


type Props = {
  input: { currentPosition: string, goal: string },
  setPath: React.Dispatch<React.SetStateAction<any[]>>
}

const S5New = (props: Props) => {
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

         <div className="w-2/4 flex justify-center ml-80 mt-24">
            <SankeyChart/>
          </div> 
    </>
  );
};

export default S5New;
