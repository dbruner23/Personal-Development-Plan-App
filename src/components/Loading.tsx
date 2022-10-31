import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
      <div className='flex justify-center items-center w-24 h-screen'>
          <svg className='animate-loading' viewBox="0 0 24 24">
              <circle      
                  cx="12" cy="12" r="8" 
                  strokeWidth="4" strokeLinecap="round" stroke="#1848C8" fill="none"
                  stroke-dasharray="35" strokeDashoffset="0" transform-origin="center"    
                  
              />
        </svg>
    </div>
  )
}

export default Loading