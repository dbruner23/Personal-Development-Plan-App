import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";


type Props = {
  setPrototypeId: React.Dispatch<React.SetStateAction<string>>,
  prototypeId: string,
  persona: string,
}

const PrototypeButtons = (props: Props) => {
  const { setPrototypeId, prototypeId, persona } = props
  const router = useRouter();
  const [userName, setUserName] = useState("");
 

  useEffect(() => {

    const user = window.localStorage.getItem("user") || null;
    if (typeof user === "string") {
      setUserName(JSON.parse(user));
    }
  }, []);


  return (
    <>
  
      <div className="flex flex-wrap gap-4 mt-5 fixed">

        <Button variant="outlined" className="bg-white" onClick={() => {(persona === 'Jean') ? setPrototypeId('s5New') : setPrototypeId('s6')}}>
        {(persona === 'Jean') ? 'Sankey Chart' :'3D Career Tool'} 
        </Button>

        <Button variant="outlined" className="bg-white" onClick={() => {(persona === 'Jean') ? setPrototypeId('s7') : setPrototypeId('s1')}}>
        {(persona === 'Jean') ? 'Career Timeline' :'Career Path'} 
        </Button>

        <Button variant="outlined" className="bg-white" onClick={() => {setPrototypeId('d4')}}>
            Career Tree
        </Button>
        
        <Button variant="outlined" className="opacity-90 bg-white" onClick={() => {setPrototypeId('d5')}}>
            Take Flight
        </Button>

        <Link href="/FinalFeedback">
              <Button variant="contained" className="bg-[#81bd75]">
                Final Feedback
              </Button>
        </Link>

        
      </div>
    </>
  );
};

export default PrototypeButtons;
