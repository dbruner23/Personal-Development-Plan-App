import React, { useState } from 'react'

const RightSideBar = () => {
  const [rightCollapsed, setRightCollapsed] = useState(false)

  return (
    <>
    <div className={`${rightCollapsed ? 'h-10 w-6 overflow-hidden right-0 bg-[#eff1f4] rounded-xl' : 'h-full w-1/5' }  flex fixed justify-between items-center mx-auto flex-col p-0`} >
    <div className="flex h-full w-full overflow-scroll justify-start mx-auto flex-col bg-[#eff1f4] p-7 ">
                        <div className="flex flex-col justify-start items-start mx-auto ">
                            <div className="flex w-full justify-center">
                                <button className="absolute left-2 top-2" onClick={() => setRightCollapsed((prev) => {return !prev})}>{rightCollapsed ? <div>&gt;</div> : <div>&lt;</div>}</button>
                                 
                            </div>
                            
                        </div>
    </div>
    </div>
    </>
  )
}

export default RightSideBar