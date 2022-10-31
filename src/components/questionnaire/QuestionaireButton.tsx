import Button from '@mui/material/Button';
import Link from "next/link";

const QuestionaireButton = () => {

  return (
    <>
    <Link href="/feedback">
    <Button variant="contained" className="bg-[#81bd75]">
       Answer Questionaire
      </Button>
      </Link>
    </>
  )
}

export default QuestionaireButton