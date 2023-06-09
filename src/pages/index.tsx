import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import Image from "next/future/image";
import MainImage from "../../public/images/diego-ph-fIq0tET6llw-unsplash.jpg";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  // const saveUser = trpc.useraction.saveUser.useMutation();
  const router = useRouter();

  const handleSubmit = async () => {
    // const newUser = await saveUser.mutateAsync({ username: username })
    if (username === "") {
      alert("Please enter a username.")
      return
    } 
    window.localStorage.setItem("user", JSON.stringify(username));
    router.push(`/choosePersona`);
  };

  return (
    <>
      <Head>
        <title>Personal Development Plan Prototypes</title>
        <meta name="description" content="PDP Horizons by Dacreed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="z-10 container mx-auto flex min-h-screen items-center justify-center bg-[#f67980] w-full">
        <div className="flex flex-col items-center">
          <div className="z-10 flex flex-col items-center justify-center bg-white opacity-80 p-5 rounded-md">
            <h1 className="text-2xl font-semibold mb-2">
              Welcome to PDP Horizons by Dacreed
            </h1>
            <p className="mb-5 text-sm">...your intelligent career discovery app</p>
            <p className="">Create a username to begin!</p>
            <div className=" flex flex-col mt-4">
            <input
              className="border p-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="rounded-full bg-[#328687] px-5 py-2 text-white hover:bg-[#88b4b4] mt-4"
            >
              Get Started
            </button>
            </div>
          </div>
          {/* <button onClick={() => signIn('google', {callbackUrl: 'http://localhost:3000/dashboard'})} className="hidden px-5 py-2 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full ">
            Sign up with Google
          </button>
          <p className="hidden">Already have an account?</p>
          <button onClick={() => signIn(undefined, {callbackUrl: 'http://localhost:3000/dashboard' })} className="hidden px-5 py-2 bg-[#1848C8] hover:bg-[#AFC3FF] text-white rounded-full">
            Sign in
          </button> */}
          <div className="z-0 bg-fixed fixed top-0 left-0 right-0 m-0">
          <Image src={MainImage} className="z-0" alt="sticky notes"></Image>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
