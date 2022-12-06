import OurTree from "../../innerCircleGraph/OurTree";
import data from "../s6/dataSoftware.json";

type Props = {
  input: { currentPosition: string; goal: string };
  setPath: React.Dispatch<React.SetStateAction<any[]>>;
};

const prototypeS1 = (props: Props) => {
  const { input, setPath } = props;

  const selectedPath = data.filter((path: any[]) => {
    return (
      path[0].data.name === input.currentPosition &&
      path[path.length - 1].data.name === input.goal
    );
  });

  if (selectedPath.length === 1 && selectedPath[0] !== undefined) {
    setPath(selectedPath[0]);
  } else if (input.goal !== "") {
    alert("We're sorry but there is not a defined path from these points.");
  }

  return (
    <>
      <main className="mx-auto my-12 mt-32 max-w-full">
        <div className="flex justify-center">
          <p>Click Start to see your career pathways to becoming a Software developer </p>
        </div>

        <div className="my-2 flex max-h-full justify-center">
          <OurTree />
        </div>
      </main>
    </>
  );
};

export default prototypeS1;
