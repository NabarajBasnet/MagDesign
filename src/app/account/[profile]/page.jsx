'use client'

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const editProfile = (props) => {
    const userId = props.params.profile;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState();
    console.log(user);

    const getUserDetails = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/profile`, {
                method: "GET",
            });
            const resResult = await res.json();
            setUser(resResult.user);
            setUsername(resResult.user.username)
            setEmail(resResult.user.email)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <section className="mx-auto py-4">
            <div>
                <div className="flex justify-center items-center p-8">
                    {user && (
                        <>
                            <div className="flex flex-col text-center items-center w-full">
                                <img src="/images/user.jpg" className="w-64 border rounded-full" />
                                <label className="text-blue-700 text-sm cursor-pointer">Change</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border outline-none p-2 rounded-md w-9/12 text-center my-2" />
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="border outline-none p-2 rounded-md w-9/12 text-center my-2" />
                                <span href={'/account'} className="text-blue-700 cursor-pointer hover:text-red-700 transition-all my-2 text-sm">Change Password ?</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default editProfile;