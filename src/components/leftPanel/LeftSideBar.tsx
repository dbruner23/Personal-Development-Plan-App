import React, { useState } from 'react'


const LeftSideBar = () => {

  const [leftCollapsed, setLeftCollapsed] = useState(false)

  return (
    <>
    <div className={`${leftCollapsed ? 'h-10 l-10 w-6 overflow-hidden bg-[#eff1f4] rounded-xl' : 'h-full w-1/5' }  flex fixed justify-between items-center mx-auto flex-col p-0`} >
    <div className="flex h-full w-full overflow-scroll justify-start mx-auto flex-col bg-[#eff1f4] p-7 ">
                        <div className="flex flex-col justify-start items-start mx-auto ">
                            <div className="flex w-full justify-center">
                                <button className="absolute right-2 top-2" onClick={() => setLeftCollapsed((prev) => {return !prev})}>{leftCollapsed ? <div>&gt;</div> : <div>&lt;</div>}</button>
                                <div className="text-lg">About me</div>
                            </div>
                            
                        </div>
    </div>
    </div>
    </>
  )
}

export default LeftSideBar