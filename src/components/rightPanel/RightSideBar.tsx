import React, { useState } from 'react'

type Props = {
  path : any[]
}

const RightSideBar = (props: Props) => {
  const { path } = props;
  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <>
    <div className={`flex ${rightCollapsed ? 'h-10 w-6 overflow-hidden right-0 bg-[#eff1f4] rounded-xl' : 'h-screen w-64' } max-w- right-0 top-0 fixed justify-between items-center mx-auto flex-col p-0`} >
      <div className="flex h-full w-full overflow-scroll justify-start mx-auto flex-col bg-[#eff1f4] p-7 ">
          <div className="flex flex-col justify-start items-start mx-auto ">
              <div className="flex w-full justify-center">
                <button className="absolute left-2 top-2" onClick={() => setRightCollapsed((prev) => { return !prev })}>{rightCollapsed ? <div>&lt;</div> : <div>&gt;</div>}</button>    
              </div>
            {/* <div className="flex justify-center text-lg">{infoData.name}</div> */}
            {/* {infoData.photo !== 'undefined' && (
              <div className="flex justify-center items-center h-1/4 object-cover" >
                <img className="h-full w-full" src={infoData.photo} />
              </div>
            )}
            {infoData.salary !== 'undefined' && (
              <>
                <div className="flex w-full text-xs gap-2">
                  <div><strong>Avg base salary: </strong></div> <div>${infoData.salary}</div>
                </div>
                <hr className="w-full border-gray-600 "></hr>
              </>
            )}
            {infoData.time !== 'undefined' && (
              <>
                <div className="flex w-full text-xs gap-2">
                  <div><strong>Avg time in role: </strong></div> <div>{infoData.time ? ` ${infoData.time} years` : ' N/A'}</div>
                </div>
                <hr className="w-full border-gray-600 "></hr>
              </>
            )}

            {infoData.summary !== 'undefined' && (
              <div className="flex justify-center items-center text-xs" >
                {infoData.summary}
              </div>
            )}
            {infoData.summary !== 'undefined' && (
              <div className="flex justify-center items-center flex-col" >
                <Button variant="contained" className="bg-[#1848C8]">
                  <Link className="text-blue-600" href={infoData.link ? infoData.link : ''}><a target="_blank">Next Steps</a></Link>
                </Button>
              </div>
            )}
            <hr className="w-full border-gray-600 "></hr>
            {infoData.linkedIn !== 'undefined' && (
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="text-xs">
                  See your LinkedIn contacts who have listed this on their profile:
                </div>
                <div className="flex justify-center items-center" >
                  <Button variant="contained" className="bg-[#1848C8]">
                    <Link className="text-blue-600" href={infoData.linkedIn ? infoData.linkedIn : ''}><a target="_blank">My Network</a></Link>
                  </Button>
                </div>
              </div>
            )} */}
              
          </div>
      </div>
    </div>
    </>
  )
}

export default RightSideBar