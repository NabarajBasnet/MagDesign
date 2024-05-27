'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [logedIn, setLogedIn] = useState(false);
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
    setLogging(true);
    try {
      const res = await fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        setLogging(false);
        setTimeout(() => {
          setLogedIn(false);
          router.push('/account')
        }, 1000);
        setLogedIn(true);
        setEmail('');
        setPassword('');
      }
      else if (!res.ok) {
        setError(true);
        setLogging(false);
      }
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <section className="mx-auto px-4 bg-gray-200">
      <div className="w-full">
        <div className=" w-full flex justify-center items-center">
          <div className="w-6/12 py-8 md:flex text-center items-center justify-between">
            <h1 className="text-2xl font-bold">Welcome to Magdesign!  Please login</h1>
            <span className="mt-12 md:mt-0">New member?
              <Link className="text-blue-500" href={'/account/signup'}> Register </Link>
              here.
            </span>
          </div>
        </div>

        <div className="w-full  flex justify-center ">
          <div className="w-11/12 md:w-8/12 py-16  md:flex items-center mb-32 bg-white justify-between px-12">
            {error ? (
              <>
                <p className="text-center flex justify-center items-center text-red-600 transition-all font-bold">Check you credentials!</p>
              </>
            ) : ('')}
            {logedIn ? (
              <>
                <p className="text-center flex justify-center items-center text-green-600 font-bold transition-all">Loged in successfully</p>
              </>
            ) : ('')}
            <div className="w-full md:w-5/12">
              <label className="p-2">
                <p>
                  Phone Number or Email*
                </p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Please enter your Phone Number or Email" className="border-2 border-gray-600 p-4 w-full rounded-md outline-none" />
              </label>
              <label className="p-2">
                <p>
                  Password*
                </p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Please enter your password" className="border-2 border-gray-600 p-4 w-full rounded-md outline-none" />
              </label>
              <div className="flex justify-between mt-5">
                <h1></h1>
                <Link href={'/'} className="text-blue-500 p-2">Reset Your Password</Link>

              </div>
            </div>
            <div className="w-full md:w-5/12">
              <button onClick={onLogin} className="w-full transition-all  bg-black p-4 text-white my-2 rounded-md hover:bg-gray-800 font-bold">{logging ? "Processing..." : "LOG IN"}</button>
              <p>Or, login with</p>
              <button className="w-full transition-all bg-black p-4 text-white my-2 rounded-md hover:bg-gray-800 font-bold">Login In Facebook</button>
              <button className="w-full transition-all bg-black p-4 text-white my-2 rounded-md hover:bg-gray-800 font-bold">Login In Google</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;