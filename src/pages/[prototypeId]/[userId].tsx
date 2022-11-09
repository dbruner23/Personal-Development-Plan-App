import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Mus } from '../../utils/mus'
import { useRouter } from 'next/router'
import Examplesite from '../../components/prototypes/d1/Examplesite'
import NodeMap from '../../components/prototypes/d2/NodeMap'
import Loading from '../../components/Loading'
import TubeMap from '../../components/prototypes/d3/TubeMap'
import S1 from '../../components/prototypes/s1/prototypeS1'
import S2 from '../../components/prototypes/s2/S2'
import S3 from '../../components/prototypes/s3/S3'
import CollapsibleForce from '../../components/prototypes/d4/collapsibleforce'
import S4 from '../../components/prototypes/s4/S4'
import S5 from '../../components/prototypes/s5/S5'
import DelaunayMap from '../../components/prototypes/d5/DelaunayMap'


type Props = {}

const Prototype = (props: Props) => {
    const router = useRouter()
    const prototypeId = router.query.prototypeId
    const [mus, setMus] = useState<any>('')

    const prototypeInsert = (prototype : string | string[] | undefined) => {
        switch (prototype) {
            case 'd1':
                return <Examplesite />
            case 'd2':
                return <NodeMap />
            case 'd3':
                return <TubeMap />
            case 'd4':
                return <CollapsibleForce />
            case 'd5':
                return <DelaunayMap />
            case 's1':
                return <S1 />
            case 's2':
                return <S2 />
            case 's3':
                return <S3 />
            case 's4':
                return <S4 />
            case 's5':
                return <S5 />
            default:
                return <Loading />
        }
    }

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
                  {/* <h2>Data console</h2>
                  <textarea id="console" className='w-60 h-48 border'></textarea>
                  <button id="mousecoords" onClick={getMousemoveCoordinates} className='border bg-slate-400'>Get Move Coords</button>
                  <button id="clickcoords" onClick={getClickCoordinates} className='border bg-slate-400'>Get Click Coords</button>
                  <button id="scrollcoords" onClick={getScrollCoordinates} className='border bg-slate-400'>Get Scroll Coords</button>
                  <button id="timeelapseed" onClick={timeSlice} className='border bg-slate-400'>Get Time Elapsed</button>
                  <button id="save" onClick={toggleRecord} className='border bg-slate-400'>Stop Save Exit</button> */}
              </div>
              {prototypeInsert(prototypeId)}
              
      </div>
      
        
    </>
  )
}

export default Prototype