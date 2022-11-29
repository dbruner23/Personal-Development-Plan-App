import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";


type Props = {
  setPrototypeId: React.Dispatch<React.SetStateAction<string>>,
  prototypeId: string
}

const PrototypeButtons = (props: Props) => {
  const { setPrototypeId, prototypeId } = props
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

        <Button variant="outlined" className="bg-white" onClick={() => {setPrototypeId('s5New')}}>
            Prototype 1
        </Button>

        <Button variant="outlined" className="bg-white" onClick={() => { setPrototypeId('s6') }}>
            Prototype 2
        </Button>

        <Button variant="outlined" className="bg-white" onClick={() => {setPrototypeId('d4')}}>
            Career Tree
        </Button>
        
        <Button variant="outlined" className="bg-white" onClick={() => {setPrototypeId('d5')}}>
            Take Flight
        </Button>
      </div>
    </>
  );
};

export default PrototypeButtons;
