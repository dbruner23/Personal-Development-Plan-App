import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";


type Props = {
  setPrototypeId: React.Dispatch<React.SetStateAction<string>>,
  prototypeId: string,
  persona: string,
  setPath: React.Dispatch<React.SetStateAction<any>>,
  setCurrentPos: React.Dispatch<React.SetStateAction<string>>,
  setGoal: React.Dispatch<React.SetStateAction<string>>
}

const PrototypeButtons = (props: Props) => {
  const { setPrototypeId, prototypeId, persona, setPath, setCurrentPos, setGoal } = props
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

        <Button variant="outlined" className="bg-white" onClick={() => { setPath([]); (persona === 'Jean') ? setPrototypeId('s5New') : setPrototypeId('s6'); }}>
        {(persona === 'Jean') ? 'Sankey Chart' :'3D Career Tool'} 
        </Button>

        <Button variant="outlined" className="bg-white" onClick={() => { setPath([]); (persona === 'Jean') ? setPrototypeId('s7') : setPrototypeId('s1'); }}>
        {(persona === 'Jean') ? 'Career Timeline' :'Career Path'} 
        </Button>

        <Button variant="outlined" className="bg-white" onClick={() => { setPath([]); setPrototypeId('d4'); }}>
            Career Tree
        </Button>
        
        <Button variant="outlined" className="opacity-90 bg-white" onClick={() => { setPath([]); setPrototypeId('d5'); ((persona === 'Jean') ? setCurrentPos("Junior Fullstack Developer") : setCurrentPos("Senior Digital Marketing Director")); setGoal("") }}>
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
