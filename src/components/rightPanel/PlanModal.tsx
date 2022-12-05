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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const planData = Array(Math.ceil(timeToGoal * 2)).fill({ name: "", percentage: 0, pathInfo: ''})
  const date = new Date('2022-07-01')
  const addMonths = (numMonths:number) => {
    date.setMonth(date.getMonth() + numMonths)
  }

  

  let positionChangeIndecies: any[] = []
  for (let i = 0; i < pathStartWithCurrent.length; i++) {   
    positionChangeIndecies.push(Math.ceil(pathStartWithCurrent[i].data.time * 2))  
  }

  let percentages: any[] = []
  // const pathSWCExcludeGoal = pathStartWithCurrent.slice(0, (pathStartWithCurrent.length - 1))
  for (let i = 0; i < pathStartWithCurrent.length - 1; i++) {
    percentages.push((pathStartWithCurrent[i].data.time / timeToGoal) * 100)
  }

  let j = 0;
  let k = 0;
  let percentage = 0
  for (let i = 0; i < planData.length; i++) {
    addMonths(6)
    planData[i].name = date.toLocaleString('default', { month: 'short' }) + " " + date.toLocaleString('default', { year: 'numeric' })
    planData[i].percentage = percentage
    let prevChangeIndex = i > 0 ? positionChangeIndecies[i - 1] : 0;
    percentage += percentages[k] / (positionChangeIndecies[j] - prevChangeIndex)
    if (i == positionChangeIndecies[j]) {
      j++; k++;
    }
  }

  console.log(planData)



  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          // props.handleSubmit();
        }}
        variant="contained"
        disabled={path.length === 0 ? true : false}
        sx={{ m: 0.5 }}
        className="bottom-6 w-44 bg-[#81BD75] absolute"
      >
        Confirm Plan
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

          
           <PlanLineChart/>
       

         
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
