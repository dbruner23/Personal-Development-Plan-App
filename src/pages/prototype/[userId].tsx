import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Mus } from '../../utils/mus'
import Map from '../../components/prototypes/d1/map'

type Props = {}

const Prototype1 = (props: Props) => {
    const [mus, setMus] = useState<any>('')
    console.log(mus)

    useEffect(() => {
        const newMus = new (Mus as any)()
        setMus(newMus);
    }, [])

    const setConsoleData = function () {
        var textarea = document.getElementById("console");
        if (textarea) {
            textarea.innerHTML = JSON.stringify(mus.getData());
            textarea.scrollTop = textarea.scrollHeight;
        }
    };

    const getMousemoveCoordinates = function () {
        const mousemovecoords : any = []
        for (let i = 0; i < mus.frames.length - 1; i++) {
            if (mus.frames[i][0] === "m") {
                mousemovecoords.push([mus.frames[i][1], mus.frames[i][2]])
            }
        }
        var textarea = document.getElementById("console");
        if (textarea) {
            textarea.innerHTML = JSON.stringify(mousemovecoords);
            textarea.scrollTop = textarea.scrollHeight;
        }
    }

    const getClickCoordinates = function () {
        const clickcoords: any = []
        for (let i = 0; i < mus.frames.length - 1; i++) {
            if (mus.frames[i][0] === "c") {
                clickcoords.push([mus.frames[i][1], mus.frames[i][2]])
            }
        }
    }

    const getScrollCoordinates = function () {
        const clickcoords: any = []
        for (let i = 0; i < mus.frames.length - 1; i++) {
            if (mus.frames[i][0] === "s") {
                clickcoords.push([mus.frames[i][1], mus.frames[i][2]])
            }
        }
    }

    const timeSlice = function () {
        // console.log(new Date().getTime() / 1000)
        let time = (new Date().getTime() / 1000 - (mus.startedAt))
        console.log(time)
    }

    const handleSave = () => {

    }

    var toggleRecord = function () {
        if (!mus.isRecording()) {
            mus.record(setConsoleData);
        } else {
            mus.stop();
            setConsoleData();
        }
    };

    useEffect(() => {
        if (mus !== '') {
            toggleRecord();
        }   
    }, [mus])
  
  return (
    <>
      <div className='flex justify-center'>
              <div className='flex flex-col justify-center fixed'>
                  <h2>Data console</h2>
                  <textarea id="console" className='w-60 h-48 border'></textarea>
                  {/* <button id="recording" onClick={toggleRecord} className='border bg-slate-400'>Start recording</button> */}
                  <button id="mousecoords" onClick={getMousemoveCoordinates} className='border bg-slate-400'>Get Move Coords</button>
                  <button id="clickcoords" onClick={getClickCoordinates} className='border bg-slate-400'>Get Click Coords</button>
                  <button id="scrollcoords" onClick={getScrollCoordinates} className='border bg-slate-400'>Get Scroll Coords</button>
                  <button id="timeelapseed" onClick={timeSlice} className='border bg-slate-400'>Get Time Elapsed</button>
                  <button id="save" onClick={toggleRecord} className='border bg-slate-400'>Stop Save Exit</button>
              </div>
              <Map/>
      </div>
      
        
    </>
  )
}

export default Prototype1