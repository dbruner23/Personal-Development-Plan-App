import React, { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
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
import S6 from '../../components/prototypes/s6/S6'
import QuestionaireButton from '../../components/questionnaire/QuestionaireButton'
import Button from '@mui/material/Button';

interface IRecordWindow {
        width: number;
        height: number;
}

const Prototype = () => {
    const router = useRouter()
    const prototypeId = router.query.prototypeId
    const [mus, setMus] = useState<any>('')
    const [recordWindow, setRecordWindow] = useState<IRecordWindow>()

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
                case 's6':
                return <S6 />
            default:
                return <Loading />
        }
    }

    useEffect(() => {
        const newMus = new (Mus as any)()
        setMus(newMus);
        const windowdims = { width: window?.innerWidth, height: window?.outerHeight }
        setRecordWindow(windowdims)
    }, [])
    
    const getMousemoveCoordinates = function () {
        const mousemovecoords: any[] = []
        for (let i = 0; i < mus.frames.length - 1; i++) {
            if (mus.frames[i][0] === "m") {
                mousemovecoords.push([mus.frames[i][1], mus.frames[i][2]])
            }            
        }
        return mousemovecoords
    }

    const getClickCoordinates = function () {
        const clickcoords: any = []
        for (let i = 0; i < mus.frames.length - 1; i++) {
            if (mus.frames[i][0] === "c") {
                clickcoords.push([mus.frames[i][1], mus.frames[i][2]])
            }
        }
        return clickcoords
    }

    const getScrollCoordinates = function () {
        const scrollcoords: any = []
        for (let i = 0; i < mus.frames.length - 1; i++) {
            if (mus.frames[i][0] === "s") {
                scrollcoords.push([mus.frames[i][1], mus.frames[i][2]])
            }
        }
        return scrollcoords
    }

    const timeSlice = function () {
        const time = (new Date().getTime() / 1000 - (mus.startedAt))
        return time
    }

    const handleSave = () => {
        mus.stop()
        const time = timeSlice()
        const mousemove = getMousemoveCoordinates();
        const clicks = getClickCoordinates();
        const pttrial = { prototype: prototypeId, time: time, recordWindow: recordWindow, mousemove: mousemove, clicks: clicks }
        const getpttrials = window.localStorage.getItem("pttrials")
        const pttrials = getpttrials == null ? [] : JSON.parse(getpttrials)
        pttrials.push(pttrial)
        window.localStorage.setItem('pttrials', JSON.stringify(pttrials));
    }

    const toggleRecord = function () {
        if (!mus.isRecording()) {
            mus.record(getMousemoveCoordinates);
        } else {
            mus.stop();
            const time = timeSlice()
            const mousemove = getMousemoveCoordinates();
            const clicks = getClickCoordinates();
            const actions = JSON.stringify({ "time": time, "mousemove": mousemove, "clicks": clicks })
            console.log(actions)
            
        }
    };

    useEffect(() => {
        if (mus !== '') {
            toggleRecord();
        }   

    }, [mus])
  
  return (
    <>
      <div className='flex flex-col justify-start items-center relative'>
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
              <div className="flex justify-center h-10 abosolute bottom-8 mb-12">
                  {/* <Link href={"/dashboard"}>
                      <button onClick={() => handleSave() } className="mr-4 rounded-md bg-[#1848C8] px-5 py-2 text-sm text-white hover:bg-[#AFC3FF]">
                          BACK TO DASHBOARD
                      </button>
                  </Link> */}
                  <Link href="/feedback">
                      <Button onClick={() => handleSave() } variant="contained" className="bg-[#81bd75]">
                          Give Feedback
                      </Button>
                  </Link>
              </div>
              
      </div>
      
        
    </>
  )
}

export default Prototype