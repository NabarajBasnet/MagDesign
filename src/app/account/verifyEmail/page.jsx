'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [Error, setError] = useState(false);
    const [verifying, setVerifying] = useState(false);
    console.log('Verifying: ', verifying);

    const verifyUserEmail = async () => {
        try {
            setVerifying(true);
            const res = await fetch(`http://localhost:3000/api/users/verifyEmail?token=${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token }),
            });
            if (res.ok) {
                setTimeout(() => {
                    setVerified(false);
                }, 2500);
                setVerified(true);
                setVerifying(false);
            }
            else if (!res.ok) {
                setTimeout(() => {
                    setError(false)
                }, 2500);
                setError(true)
                setVerifying(false);
            }
        } catch (error) {
            console.log('Error: ', error.message);
            setError(true);
        }
    };

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get('token');
        setToken(urlToken || '');
        console.log('Token: ', urlToken);
    }, []);


    return (
        <section className="mx-auto px-4">
            <div className="flex flex-col w-full justify-center items-center">
                <img src="/images/verificationimage.png" className="w-6/12 md:w-3/12" />
                <h1 className="text-2xl font-bold">Verify your email address</h1>
                <p className="py-4 text-center">To start using Magdesign, we need to verify your email address.</p>
                <div className="flex justify-center p-5 w-full">
                    <button onClick={verifyUserEmail} className="w-full md:w-6/12 hover:bg-gray-700 hover:text-white bg-yellow-500 text-white font-bold p-5 rounded-md hover:drop-shadow-xl transition-all">

                        {verifying ? 'VERIFYING...' : 'CLICK TO VERIFY'}
                    </button>
                </div>
                {verified ? (
                    <h1 className="text-green-600 font-semibold">Email verification successfull</h1>
                ) : ('')}
                {Error ? (
                    <>
                        <h1 className="text-red-600 font-bold">Error verifying email</h1>
                    </>
                ) : ('')}
            </div>
        </section>
    );
}

export default VerifyEmail;
