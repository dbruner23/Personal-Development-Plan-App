import React, { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { Mus } from '../utils/mus'
import { useRouter } from 'next/router'
import Examplesite from '../components/prototypes/d1/Examplesite'
import NodeMap from '../components/prototypes/d2/NodeMap'
import Loading from '../components/Loading'
import TubeMap from '../components/prototypes/d3/TubeMap'
import S1 from '../components/prototypes/s1/prototypeS1'
import S2 from '../components/prototypes/s2/S2'
import S3 from '../components/prototypes/s3/S3'
import CollapsibleForce from '../components/prototypes/d4/collapsibleforce'
import S4 from '../components/prototypes/s4/S4'
import S5 from '../components/prototypes/s5/S5'
import DelaunayMap from '../components/prototypes/d5/DelaunayMap'
import S6 from '../components/prototypes/s6/S6'
import S7 from '../components/prototypes/s7/S7'
import Button from '@mui/material/Button'
import NycMap from '../components/prototypes/d6/Nycmap'
import S5New from '../components/prototypes/s5/S5New'
import Usertoolkit from '../components/PrototypeButtons'
import LeftSideBar from '../components/leftPanel/LeftSideBar'
import RightSideBar from '../components/rightPanel/RightSideBar'
import PrototypeButtons from '../components/PrototypeButtons'
import Toolbar from '../components/toolbar/Toolbar'
import FeedbackModal from '../components/questionnaire/FeedbackModal'



interface IRecordWindow {
        width: number;
        height: number;
}


const Dashboard = () => {
    const router = useRouter()
    const [persona, setPersona] = useState('')
    const [prototypeId, setPrototypeId] = useState('s5New')
    const [mus, setMus] = useState<any>('')
    const [recordWindow, setRecordWindow] = useState<IRecordWindow>()
    const [lIsCollapsed, setLIsCollapsed] = useState(false)
    const [input, setInput] = useState({ currentPosition: '', goal: '' })
    const [lifestyleInput, setLifestyleInput] = useState({ extrahours: true, fulltimeEd: true, relocation: true, remotework: true })
    const [lifestyleInputStrings, setLifestyleInputStrings] = useState({ extrahours: "true", fulltimeEd: "true", relocation: "true", remotework: "true" })
    const [path, setPath] = useState([])
    
    const handleLifestyleChange = (event: any) => {
        setLifestyleInput({ ...lifestyleInput, [event.target.name]: (event.target.checked) });
        setLifestyleInputStrings({ ...lifestyleInputStrings, [event.target.name]: (event.target.checked).toString() });
    }

    const prototypeInsert = (prototype : string | string[] | undefined) => {
        switch (prototype) {
            case 'd1':
                return <Examplesite />
            case 'd2':
                return <NodeMap />
            case 'd3':
                return <TubeMap />
            case 'd4':
                return <CollapsibleForce lIsCollapsed={lIsCollapsed} persona={persona} input={input} lifestyleInputStrings={lifestyleInputStrings} setPath={setPath} />
            case 'd5':
                return <DelaunayMap persona={persona} input={input} lifestyleInputStrings={lifestyleInputStrings} setPath={setPath} />
            case 'd6':
                return <NycMap />
            case 's1':
                return <S1 />
            case 's2':
                return <S2 />
            case 's3':
                return <S3 />
            case 's4':
                return <S4 />
            case 's5':
                return <S5/>
            case 's6':
                return <S6 />
            case 's7':
                return <S7 />
            case 's5New':
                return <S5New input={input} setPath={setPath} />
            default:
                return <Loading />
        }
    }



    useEffect(() => {
        const getPersona = window.localStorage.getItem("persona") || null;
        if (typeof getPersona === "string") {
            setPersona(getPersona);
        }
        const newMus = new (Mus as any)()
        setMus(newMus);
        const windowdims = { width: window?.innerWidth, height: window?.innerHeight }
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
        const scroll = getScrollCoordinates();
        const pttrial = { prototype: prototypeId, time: time, recordWindow: recordWindow, mousemove: mousemove, clicks: clicks, scroll: scroll }
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
        }
    };

    useEffect(() => {
        if (mus !== '') {
            toggleRecord();
        }   

    }, [mus])
  
  return (
    <div>
          <LeftSideBar setLIsCollapsed={setLIsCollapsed} persona={persona} prototypeId={prototypeId} setInput={setInput} />    
          <div className="flex justify-center h-0">
            <PrototypeButtons setPrototypeId={setPrototypeId} prototypeId={prototypeId} persona={persona} setPath={setPath}/>     

            <div className={`fixed top-16 ${prototypeId == 's5New' ? "-translate-x-80" : prototypeId == 's6' ? "-translate-x-80" : prototypeId == 's7' ? "-translate-x-36" : prototypeId == 's1' ? "-translate-x-36" : prototypeId == 'd4' ? "translate-x-4" : "translate-x-40"}`}>
            <FeedbackModal prototypeId={prototypeId} handleSubmit={() => handleSave()}></FeedbackModal>
            </div>
        </div>
        {prototypeInsert(prototypeId)}
          <Toolbar handleLifestyleChange={handleLifestyleChange} lifestyleInput={lifestyleInput} />  
          <RightSideBar path={path} />
    </div>
  )
}

export default Dashboard