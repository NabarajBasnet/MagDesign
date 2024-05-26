'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";


const SignUp = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [buttonDisabled, setButtonDiseabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const router = useRouter();

  const user = { username, email, password };

  const onSignUp = async()=>
  {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/users/signup`,{
        method:'POST',
        body: JSON.stringify(user)
      });

      console.log('RES: ',res);
      if(res.ok){
        // router.push('/account/login');
        setUsername('');
        setEmail('');
        setPassword('');
        setLoading(false);
        setTimeout(()=>
        {
          setRegistered(false);
        },2000);
        setRegistered(true);
      }

    } catch (error) {
      console.log('Signup failed!');
      toast.error(error.message);
    }
  };

  useEffect(()=>
  {
    if(username.length >0 && email.length >0 && password.length >0){
      setButtonDiseabled(false);
    }
    else{
      setButtonDiseabled(true);
    }
  },[username, email, password])

  return (
    <section className="mx-auto px-4">
      <div className="w-full bg-gray-100 pb-28 text-center md:flex md:flex-col justify-center items-center">
        <div className="w-full md:w-8/12 pt-10 md:flex md:justify-between h-32">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <span>Already member?
            <Link href={'/account/login'} className="text-blue-600"> Login </Link>
            here.
          </span>
        </div>
        {registered? (
          <h1 className="text-xl text-green-500 font-bold">Registration successfull</h1>
        ):('')}
        <div className="w-full md:w-8/12 md:flex bg-white py-10 justify-between">
          <div className="w-full p-2">
            <label className="text-start">
              <p>Username</p>
              <input value={username} onChange={(e)=>setUsername(e.target.value)} className="outline-none border-gray-500 border p-4 rounded-md w-full" placeholder="Username" />
            </label>

            <label className="text-start">
              <p className="mt-3">Email or Phone number</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="outline-none border-gray-500 border p-4 rounded-md w-full" type="email" placeholder="Email or Phone number" />
            </label>

            <label className="text-start">
              <p className="mt-3">Password*</p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="outline-none border-gray-500 border p-4 rounded-md w-full" type="password" placeholder="Minimum 6 characters with a number and a letter" />
            </label>

          </div>
          <div className="w-full p-2">
            <span className="flex mt-7 flex-col">
              <button onClick={onSignUp} className="bg-black hover:bg-gray-800 rounded-md text-white font-bold transition-all p-4">{loading?"Processing...":"SIGN UP"}</button>
              <span className="w-full text-start mt-3">By clicking "SIGN UP", I agree to Magdesign's <Link href={'/'} className="text-blue-600">Terms of Use </Link>and <Link href={'/'} className="text-blue-600">Privacy Policy</Link></span>
            </span>
            <div className="mt-12">
              <p className="text-start">Or, sign up with</p>
              <div className="w-full md:flex">
                <button className="w-full md:w-1/2 p-4 rounded-md bg-black hover:bg-gray-800 text-white font-bold transition-all m-2">Facebook</button>
                <button className="w-full md:w-1/2 p-4 rounded-md bg-black hover:bg-gray-800 text-white font-bold transition-all m-2">Google</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp;