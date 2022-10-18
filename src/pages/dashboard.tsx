import React from 'react'
import { useSession, signOut, getSession, GetSessionParams } from 'next-auth/react';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';




type Props = {}

const dashboard = (props: Props) => {
    const { data: session, status } = useSession()
    console.log(session)

    if (status === 'authenticated') {
        return (
            <main className="container mx-auto flex min-h-screen flex-col gap-5 items-center justify-center p-4">
                <div>Hello {session.user?.name} Please select one of our prototypes to demo:</div>
                <Link href="">
                    <div className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">Prototype 1</div>
                </Link>
                <Link href="">
                    <div className="w-60 h-48 bg-slate-400 border rounded cursor-pointer">Prototype 2</div>
                </Link>
                <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} className="px-5 py-2 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full">
                    Sign Out
                </button>
            </main>
        )
    }
}

export default dashboard
