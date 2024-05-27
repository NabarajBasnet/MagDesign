'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Account = () => {
    const [user, setUser] = useState(null);

    const router = useRouter();

    const getUserDetails = async () => {
        try {
            const req = await fetch(`http://localhost:3000/api/users/profile`, {
                method: "GET",
            });
            const res = await req.json();
            setUser(res.user);
        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    const onLogout = async()=>
    {
        try {
            const req = await fetch(`http://localhost:3000/api/users/logout`,{
                method:"POST",
            });
            if(req.ok){
                router.push('account/login');
            }
            console.log(req);

        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <section className="mx-auto px-4">
            <div className="flex w-full justify-center items-center">
                <div className="w-full flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        {user && (
                            <>
                                <img src="/images/user.jpg" className="w-64 border shadow-xl rounded-full mt-4" alt="User"/>
                                <p className="font-bold py-4">{user.username}</p>
                                <p className="font-bold ">{user.email}</p>
                                <Link href={`/account/`+user._id}><p className="text-blue-600 py-4 font-bold w-full">Profile Settings</p></Link>
                                <button onClick={onLogout} className="bg-red-600 font-bold text-white rounded-full hover:bg-gray-700 transition-all hover:shadow-xl py-4 w-full">Log Out</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Account;
