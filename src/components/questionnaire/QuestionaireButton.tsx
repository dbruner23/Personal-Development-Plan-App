import Button from '@mui/material/Button';
import Link from "next/link";

const QuestionaireButton = () => {

  return (
    <>
    <Link href="/OverallFeedback">
    <Button variant="contained" className="bg-[#81bd75]">
       Feedback form
      </Button>
      </Link>
    </>
  )
}

export default QuestionaireButton