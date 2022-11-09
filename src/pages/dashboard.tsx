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
import PrototypeS4image from '../components/prototypes/s2/img/PrototypeS4.png'
import PrototypeS5image from '../components/prototypes/s2/img/PrototypeS5.png'


type Props = {
}

const dashboard = (props: Props) => {

    // const { Track, trackEvent } = useTracking({ page: "dashboard" })
    const { data: session, status } = useSession()
    const router = useRouter()
    interface IUser {
        id: string
        username: string
    }
    const [userdetails, setUserdetails] = useState<IUser>()
    
    useEffect(() => {
        const user = (window.localStorage.getItem('user') || null);
        if (typeof user === "string") {
            setUserdetails(JSON.parse(user))         
        }
    }, [])

    const logOut = () => {
        window.localStorage.clear();
        router.push('/')
    }

    // if (status === 'authenticated') {
    return (
        <main className="container mx-auto flex min-h-screen flex-col gap-5 items-center justify-center p-4">
            <div>Hello {userdetails?.username}! Please select one of our prototypes to demo:</div>

            <div className="flex flex-row justify-between gap-5 flex-wrap">

            <Link href={`/d2/${userdetails?.id}`}>
            <Image 
                src={PrototypeD1image} 
                alt="image of prototype 1D"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`s1/${userdetails?.id}`}>
                <Image 
                src={PrototypeS1image} 
                alt="image of prototype 1S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

                <Link href={`s2/${userdetails?.id}`}>
                <Image 
                src={PrototypeS2image} 
                alt="image of prototype 2S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`s3/${userdetails?.id}`}>
                <Image 
                src={PrototypeS3image} 
                alt="image of prototype 3S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`/d4/${userdetails?.id}`}>
                <div className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                     Collapsible Force
                </div>
            </Link>


            <Link href={`s4/${userdetails?.id}`}>
                <Image 
                src={PrototypeS4image} 
                alt="image of prototype 4S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`s5/${userdetails?.id}`}>
                <Image 
                src={PrototypeS5image} 
                alt="image of prototype 5S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>

            <Link href={`/d1/${userdetails?.id}`}>
                <div className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                     Prototype 1
                </div>
            </Link>

            </div>

            <button onClick={() => logOut()} className="px-5 py-2 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full">
                Sign Out
            </button>
            {/* <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} className="px-5 py-2 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full">
                Sign Out
            </button> */}
        </main>
    )
}

export default dashboard

