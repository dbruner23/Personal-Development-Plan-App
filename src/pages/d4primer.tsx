import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Jean from '../../public/images/Jean.jpg'
import James from '../../public/images/James.jpg'
import { Button } from "@mui/material";


const d4primer = () => {

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const user = (window.localStorage.getItem('user') || null);
        if (typeof user === "string") {
            setUserName(JSON.parse(user))
        }
    }, [])
  return (
      <div className="flex flex-col w-screen h-screen justify-start items-center p-16 bg-gradient-to-b from-[#1848C8] to-[#AFC3FF]  text-white gap-6">
          <div className="text-2xl">Thanks for trialing "Opportunity Tree"!</div>
          <div >Before diving in...</div>
          <div>This prototype will be most fruitfully experienced and reviewed in the mindset of a couple personas.</div>
          <div className="flex justify-start gap-10 h-1/4 w-3/5">
              <div className="w-1/2">
                  <Image
                      src={James}
                  />
              </div>
              <div>Persona 1 - James, a journalist in his early 30s who has been covering financial markets for years and has
                  decided he wants to pivot his career into finance with the aim of climbing the ladder to reach at least the
                  level of Investment Banking Analyst. He has a Uni degree in journalism but no formal training in finance and is exploring options
                  for entry into the field.
              </div>
          </div>
          <div className="flex justify-start gap-10 h-1/4 w-3/5">
              <div className="w-1/2">
                  <Image
                      src={Jean}
                  />
              </div>
              <div>Persona 2 - Jean, a successful Junior Investment Banker in her late 20s has a Uni degree in finance and loves what she does. She is
                  considering her options for the future, as she aims to reach the top as a Managing Director, but is unsure whether she
                  wants to continue with the Investment Banking path or move toward Private Equity.
              </div>
          </div>
          <div>
              While the current data set is limited in scope to chart only a few career paths in finance, do feel free to experiment with other inputs as well! 
          </div>
          <Link href={`/d4/${userName}`}>
              <Button variant="contained" className="px-5 py-2 mr-6 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full">
                  Let's do this!
              </Button>
          </Link>
      </div>
  )
}

export default d4primer