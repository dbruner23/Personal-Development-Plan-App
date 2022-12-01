import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
// import ThankYouModal from "./ThankYouModal";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type Props = {
  handleSubmit: () => void;
  prototypeId: string,
};

export default function FeedbackModal(props: Props) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState({
    favourite: "",
    like: "",
    dislike: "",
    improve: "",
  });
  const savePttrials = trpc.useraction.savePttrials.useMutation();
  // const router = useRouter();
  const prototypeId = props.prototypeId;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback({ ...feedback, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const username = window.localStorage.getItem("user");
    const pttrials = window.localStorage.getItem("pttrials");
    const prototypeFeedback = JSON.stringify(feedback);
    if (
      username !== null &&
      typeof prototypeId === "string" &&
      pttrials !== null &&
      prototypeFeedback !== null
    ) {
      await savePttrials.mutateAsync({
        username,
        prototypeId,
        pttrials,
        prototypeFeedback,
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          // props.handleSubmit();
        }}
        variant="contained"
        className="bg-[#1848C8]"
      >
        Give Feedback
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mb-5 flex justify-center ">
            <h2 className="text-3xl font-bold">
              Thank you for checking out this Prototype
            </h2>
          </div>

          <div className="mb-12 flex justify-center">
            <p>
              Please answer a few short questions before moving on the test the
              next Prototype
            </p>
          </div>

          <div className="mx-auto flex flex-col justify-center rounded-xl bg-[#eff1f4] p-12">
            <label className="mb-2 text-sm">
              Let us know one thing you really like about this Prototype
            </label>
            <div className="mb-14 ">
              <TextField
                id="outlined-multiline-flexible"
                label="your answer here..."
                multiline
                maxRows={10}
                name="like"
                value={feedback.like}
                onChange={handleChange}
                sx={{ width: "550px", backgroundColor: "#f3f6fa" }}
              />
            </div>

            <label className="mb-2 text-sm">
              Let us know one thing you did not like about this Prototype
            </label>
            <div className="mb-14">
              <TextField
                id="outlined-multiline-flexible"
                label="your answer here..."
                multiline
                maxRows={10}
                name="dislike"
                value={feedback.dislike}
                onChange={handleChange}
                sx={{ width: "550px", backgroundColor: "#f3f6fa" }}
              ></TextField>
            </div>

            <label className="mb-2 text-sm">
              Tell us one thing that could be done to improve it?
            </label>
            <div className="mb-14">
              <TextField
                id="outlined-multiline-flexible"
                label="your answer here..."
                multiline
                maxRows={10}
                name="improve"
                value={feedback.improve}
                onChange={handleChange}
                sx={{ width: "550px", backgroundColor: "#f3f6fa" }}
              ></TextField>
            </div>

            <Link href="/dashboard">
              <Button
                variant="contained"
                className="bg-[#81bd75]"
                onClick={() => {
                  handleSubmit();
                  handleClose();
                }}
              >
                Submit Feedback
              </Button>
            </Link>

          </div>
        </Box>
      </Modal>
    </>
  );
}
