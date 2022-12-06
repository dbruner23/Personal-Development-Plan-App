import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
// import ThankYouModal from "./ThankYouModal";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LineChart1 from "../prototypes/s7/LineChart1";
import PlanLineChart from "./PlanLineChart";
import { ContactEmergency, LocalConvenienceStoreOutlined } from "@mui/icons-material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type Props = {
  path: any[],
  pathStartWithCurrent: any[],
  timeToGoal: number
}

// type Props = {
//   handleSubmit: () => void;
//   prototypeId: string,
//   path : any[]
// };

export default function PlanModal(props: Props ) {
  const { path, pathStartWithCurrent, timeToGoal } = props;
  const pathSWCExcludeGoal = pathStartWithCurrent.slice(0, (pathStartWithCurrent.length - 1))
  console.log(pathSWCExcludeGoal)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const initPlanData = Array(Math.ceil(timeToGoal * 2) +1).fill({ name: "", percentage: 0, path1Info: ''})
  const date = new Date('2022-07-01')
  const addMonths = (numMonths:number) => {
    date.setMonth(date.getMonth() + numMonths)
  }

  const positionChangeIndecies: any[] = []
  let accumTimeIndecies = 0
  for (let i = 0; i < pathSWCExcludeGoal.length; i++) {   
    const addedTimeIndecies = Math.ceil(pathSWCExcludeGoal[i].data.time * 2)
    positionChangeIndecies.push(Math.ceil(addedTimeIndecies + accumTimeIndecies))
    accumTimeIndecies += addedTimeIndecies
  }

  const percentages: any[] = []
  // const pathSWCExcludeGoal = pathStartWithCurrent.slice(0, (pathStartWithCurrent.length - 1))
  for (let i = 0; i < pathStartWithCurrent.length - 1; i++) {
    percentages.push((pathStartWithCurrent[i].data.time / timeToGoal) * 100)
  }


  let j = 0;
  let k = 0;
  let percentage = 0
  const planData = initPlanData.map((item: any, index: number) => {
    const point = Object.assign({}, item);
    addMonths(6);  
    point.name = date.toLocaleString('default', { month: 'short' }) + " " + date.toLocaleString('default', { year: 'numeric' })
    if (percentage > 100) { percentage = 100 }
    point.percentage = Math.ceil(percentage);  
    const prevChangeIndexVal = j > 0 ? positionChangeIndecies[j - 1] : 0;
    percentage += percentages[k] / (positionChangeIndecies[j] - prevChangeIndexVal);
    if (index < positionChangeIndecies[j]) {
      point.path1Info = pathStartWithCurrent[j].data.name
    } else if (index == positionChangeIndecies[j]) {
      point.path1Info = pathStartWithCurrent[j + 1].data.name;
      j++;
      k++;
    }
    return point
  })
  

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          // props.handleSubmit();
        }}
        variant="contained"
        disabled={path.length === 0 ? true : false}
        className="fixed bottom-5 w-40 bg-[#81BD75]"
      >
        Create Plan
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="flex flex-col justify-items-center">
          <div className="mb-5 flex justify-center ">
            <h2 className="text-3xl font-bold">
              Your career plan timeline
            </h2>
          </div>   
            <PlanLineChart planData={planData}/>
              <Button
                variant="contained"
                className="bg-[#81bd75]"
                onClick={() => {
                handleClose();
                }}
              >
                Back to dashboard
              </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
