import React, { useEffect, useRef, useState } from 'react'
import { useSession, signOut, getSession, GetSessionParams } from 'next-auth/react';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { string } from 'zod';
import Image from 'next/future/image';
import PrototypeS1image from '../components/innerCircleGraph/img/prototypeS1.png'
import PrototypeS2image from '../components/prototypes/s2/img/graphS2.png'
import PrototypeD1image from '../components/prototypes/s2/img/PrototypeD1.jpg'
import PrototypeS3image from '../components/prototypes/s2/img/PrototypeS3.png'
import PrototypeD2image from '../components/prototypes/s2/img/PrototypeD2.png'
import PrototypeS4image from '../components/prototypes/s2/img/PrototypeS4.png'
import PrototypeS5image from '../components/prototypes/s2/img/PrototypeS5.png'
import PrototypeS6image from '../components/prototypes/s2/img/PrototypeS6.png'
import QuestionaireButton from '../components/questionnaire/QuestionaireButton';


const Dashboard = () => {

    // const { Track, trackEvent } = useTracking({ page: "dashboard" })
    // const { data: session, status } = useSession()
    const router = useRouter()
    
    const [userName, setUserName] = useState('')
    
    useEffect(() => {
        const user = (window.localStorage.getItem('user') || null);
        if (typeof user === "string") {
            setUserName(JSON.parse(user))         
        }
    }, [])

    const logOut = () => {
        window.localStorage.clear();
        router.push('/')
    }

    // if (status === 'authenticated') {
    return (
        <main className="container mx-auto flex min-h-screen flex-col gap-5 items-center justify-center p-4">
            <div className='text-center'>
                <h1 className='font-bold mb-4'>Hello {userName}! Please find a variety of PDP prototypes listed below.</h1>
                <p>Select each Prototype to demo and fill out the Prototype feedback form.</p>
                <p>Once you reviewed all of the prototypes, please also fill out the feedback form at the bottom of this page.</p>
                <p>Thank you for helping us with this project.</p>
                </div>
            <div className="flex flex-row justify-between gap-5 flex-wrap">

            <Link href={`/d2/${userName}`}>
            <Image 
                src={PrototypeD1image} 
                alt="image of prototype 1D"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`s1/${userName}`}>
                <Image 
                src={PrototypeS1image} 
                alt="image of prototype 1S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

                <Link href={`s2/${userName}`}>
                <Image 
                src={PrototypeS2image} 
                alt="image of prototype 2S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`s3/${userName}`}>
                <Image 
                src={PrototypeS3image} 
                alt="image of prototype 3S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`/d4/${userName}`}>
            <Image 
                src={PrototypeD2image} 
                alt="image of prototype D2"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>


            <Link href={`s4/${userName}`}>
                <Image 
                src={PrototypeS4image} 
                alt="image of prototype 4S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`s5/${userName}`}>
                <Image 
                src={PrototypeS5image} 
                alt="image of prototype 5S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`s6/${userName}`}>
                <Image 
                src={PrototypeS6image} 
                alt="image of prototype 6S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`/d1/${userName}`}>
                <div className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                     Prototype 1
                </div>
            </Link>

            </div>

        <div className="my-10">
            <button onClick={() => logOut()} className="px-5 py-2 mr-6 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full">
                Sign Out
            </button>

            <QuestionaireButton />
        </div>
            {/* <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} className="px-5 py-2 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full">
                Sign Out
            </button> */}
        </main>
    )
}

export default Dashboard

