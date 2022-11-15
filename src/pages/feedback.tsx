import TextField from "@mui/material/TextField";
import { useState } from "react";
import Head from "next/head";
import ThankYouModal from "../components/questionnaire/ThankYouModal";
import { trpc } from "../utils/trpc";




const Feedback = () => {
  const [feedback, setFeedback] = useState({ favourite: '', like:'', dislike:'', improve:'' });
  const savePttrials = trpc.useraction.savePttrials.useMutation();
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback({...feedback, [event.target.name]: event.target.value});
  };

  const handleSubmit = async () => {
    const getfeedbackData = window.localStorage.getItem("feedback")
    const feedbackData = getfeedbackData == null ? [] : JSON.parse(getfeedbackData)
    feedbackData.push(feedback)
    window.localStorage.setItem('feedback', JSON.stringify(feedbackData));
  }

  return (
    <>
      <Head>
        <title>feedback form</title>
        <meta name="feedback form" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-2 flex justify-center mx-auto">

        <div className="my-12 flex flex-col">
        
        <div className="flex justify-center mb-5 ">
           <h2 className="text-3xl font-bold">Thank you for checking out this Prototype</h2>
        </div>

        <div className="flex justify-center mb-12">
           <p>Please answer a few short questions before moving on the test the next Prototype</p>
        </div>

        <div>
        
        </div>

    <div className="flex justify-center mx-auto flex-col bg-[#eff1f4] p-12 rounded-xl">

         
          <label className="text-sm mb-2">Let us know one thing you really like about this Prototype</label>
          <div className="mb-14 ">
            <TextField
              id="outlined-multiline-flexible"
              label="your answer here..."
              multiline
              maxRows={10}
              name="like"
              value={feedback.like}
              onChange={handleChange}
              sx={{ width: '45vw', backgroundColor: '#f3f6fa' }}
            />
          </div>

          <label className="text-sm mb-2">Let us know one thing you did not like about this Prototype</label>
          <div className="mb-14">
            <TextField
              id="outlined-multiline-flexible"
              label="your answer here..."
              multiline
              maxRows={10}
              name="dislike"
              value={feedback.dislike}
              onChange={handleChange}
              sx={{ width: '45vw', backgroundColor: '#f3f6fa'  }}
            ></TextField>
          </div>

          <label className="text-sm mb-2">Tell us one thing that could be done to improve it?</label>
          <div className="mb-14">
            <TextField
              id="outlined-multiline-flexible"
              label="your answer here..."
              multiline
              maxRows={10}
              name="improve"
              value={feedback.improve}
              onChange={handleChange}
              sx={{ width: '45vw', backgroundColor: '#f3f6fa'  }}
            ></TextField>
          </div>


          <div className="flex justify-center">
              <ThankYouModal handleSubmit={handleSubmit} />
          </div>
        </div>
        </div>
      </main>
    </>
  );
};

export default Feedback;
