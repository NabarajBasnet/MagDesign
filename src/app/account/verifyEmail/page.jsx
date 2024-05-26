'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/verifyEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Add this line
                },
                body: JSON.stringify({ token }),
            });
            if (res.ok) {
                setVerified(true);
            } else {
                setError(true);
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

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <section className="mx-auto px-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl">Verify email</h1>
                <div>
                    <button onClick={verifyUserEmail} className="bg-blue-500 text-white font-bold p-2 w-40 rounded-md hover:drop-shadow-xl transition-all">
                        Verify Email
                    </button>
                    <h2>
                        {token ? `${token}` : "No token"}
                    </h2>
                    {verified && (
                        <div>
                            Log In
                        </div>
                    )}
                    {error && (
                        <div>
                            Verification failed. Please try again.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default VerifyEmail;
