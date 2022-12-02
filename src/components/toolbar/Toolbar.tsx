import React from 'react'
import { useState } from 'react'
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Image from 'next/future/image';
import Lifestyle from "public/user-check.svg"

type Props = {
    handleLifestyleChange: (event: any) => void,
    lifestyleInput: { extrahours: boolean, fulltimeEd: boolean, relocation: boolean, remotework: boolean }
}

const Toolbar = ( props: Props ) => {
    const { handleLifestyleChange, lifestyleInput } = props  

    const [lstickerCollapsed, setLstickerCollapsed] = useState(true)  
  
  
return (
      <div className="flex justify-center w-screen h-0">
          <div className="flex justify-center items-center bottom-6 h-10 w-80 bg-[#eff1f4] fixed rounded-md">
              <div className="flex items-center justify-around bottom-6 h-10 w-72 fixed bg-[#eff1f4] rounded-md ">
                <div onClick={() => setLstickerCollapsed((prev) => { return prev = !prev })} className="flex justify-center items-center w-16 h-8 cursor-pointer bg-[#2B3B56] rounded-md">
                    <Image
                        alt="icon"
                        src={Lifestyle}
                    />
                </div>
                <div className={`flex ${lstickerCollapsed ? 'h-0 w-0 p-0 bg-transparent': 'h-2/5 w-1/4'} transition-all bottom-16 fixed justify-start flex-col bg-[#eff1f4] p-7 rounded-md`}>
                        <div className="flex flex-col justify-center items-start mx-auto gap-2">
                            <div className="flex w-full justify-center"> 
                            <div className={`${lstickerCollapsed ? 'hidden' : 'flex'} text-lg`}>Lifestyle Factors</div>
                            </div>
                            <label className={`${lstickerCollapsed ? 'hidden' : 'visible'}`}>
                                <input
                                    className="mr-2 cursor-pointer"
                                    type="checkbox"
                                    checked={lifestyleInput.extrahours}
                                    name="extrahours"
                                    onChange={handleLifestyleChange}
                                />
                                I&#39;m able to work outside of standard 9-5 Monday-Friday hours
                            </label>
                            <label className={`${lstickerCollapsed ? 'hidden' : 'visible'}`}>
                                <input
                                    className="mr-2 cursor-pointer"
                                    type="checkbox"
                                    checked={lifestyleInput.fulltimeEd}
                                    name="fulltimeEd"
                                    onChange={handleLifestyleChange}
                                />
                                I&#39;m able to take time out to pursue further education full-time
                            </label>
                            <label className={`${lstickerCollapsed ? 'hidden' : 'visible'}`}>
                                <input
                                    className="mr-2 cursor-pointer"
                                    type="checkbox"
                                    checked={lifestyleInput.relocation}
                                    name="relocation"
                                    onChange={handleLifestyleChange}
                                />
                                I&#39;m willing to consider relocating for the right work opportunity
                            </label>
                            <label className={`${lstickerCollapsed ? 'hidden' : 'visible'}`}>
                                <input
                                    className="mr-2 cursor-pointer"
                                    type="checkbox"
                                    checked={lifestyleInput.remotework}
                                    name="remotework"
                                    onChange={handleLifestyleChange}
                                />
                                I&#39;m willing to consider remote working options
                            </label>
                        </div>
                    </div>
                  <div className="flex w-16 h-8 cursor-pointer bg-[#2B3B56] rounded-md">

                  </div>
                  <div className="flex w-16 h-8 cursor-pointer bg-[#2B3B56] rounded-md">

                  </div>
                  <div className="flex w-16 h-8 cursor-pointer bg-[#2B3B56] rounded-md">

                  </div>
              </div>
          </div>
      </div>
  )
}

export default Toolbar