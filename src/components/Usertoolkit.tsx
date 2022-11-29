import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";


type Props = {
  setPrototypeId: React.Dispatch<React.SetStateAction<string>>,
}

const Usertoolkit = (props: Props) => {
  const { setPrototypeId } = props
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
  
      <div className="flex flex-row flex-wrap gap-4 mt-2 ">

        <Button variant="outlined" onClick={() => {setPrototypeId('s5New')}}>
            Prototype 1
        </Button>

        <Button variant="outlined" onClick={() => { setPrototypeId('s6') }}>
            Prototype 2
        </Button>

        <Button variant="outlined" onClick={() => {setPrototypeId('d4')}}>
            Prototype 3
        </Button>
        
        <Button variant="outlined" onClick={() => {setPrototypeId('d5')}}>
            Prototype 4
        </Button>
      </div>

    </>
  );
};

export default Usertoolkit;
