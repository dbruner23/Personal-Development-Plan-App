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


type Props = {}

const dashboard = (props: Props) => {
    const { data: session, status } = useSession()
    const [userdetails, setUserdetails] = useState<IUser>()
    
    interface IUser {
        id: string
        username: string
    }

    useEffect(() => {
        const user = (window.localStorage.getItem('user') || null);
        if (typeof user === "string") {
            setUserdetails(JSON.parse(user))         
        }
    }, [])

    // if (status === 'authenticated') {
    return (
        <main className="container mx-auto flex min-h-screen flex-col gap-5 items-center justify-center p-4">
            <div>Hello {userdetails?.username} Please select one of our prototypes to demo:</div>
            <Link href="">
                <div className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">Prototype 1</div>
            </Link>
            <Link href="/prototypeS1">
                <Image 
                src={PrototypeS1image} 
                alt="image of prototype 1S"
                className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">
                </Image>
            </Link>
            <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} className="px-5 py-2 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full">
                Sign Out
            </button>
        </main>
    )
}

export default dashboard
