import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
// import ThankYouModal from "./ThankYouModal";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LineChart1 from "../prototypes/s7/LineChart1";
import PlanLineChart from "./PlanLineChart";


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

// type Props = {
//   handleSubmit: () => void;
//   prototypeId: string,
//   path : any[]
// };

export default function PlanModal( ) {
//   const { path } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

//   const prototypeId = props.prototypeId;

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          // props.handleSubmit();
        }}
        variant="contained"
        // disabled={path.length === 0 ? true : false}
        sx={{ m: 0.5 }}
        className="bottom-6 w-44 bg-[#81BD75] absolute"
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
