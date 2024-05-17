'use client'

const { default: Link } = require("next/link")



const Login = () => {
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
            <div className="w-full md:w-5/12">
              <label className="p-2">
                <p>
                  Phone Number or Email*
                </p>
                <input type="text" placeholder="Please enter your Phone Number or Email" className="border-2 border-gray-600 p-4 w-full rounded-md outline-none" />
              </label>
              <label className="p-2">
                <p>
                  Password*
                </p>
                <input type="password" placeholder="Please enter your password" className="border-2 border-gray-600 p-4 w-full rounded-md outline-none" />
              </label>
              <div className="flex justify-between mt-5">
                <h1></h1>
                <Link href={'/'} className="text-blue-500 p-2">Reset Your Password</Link>

              </div>
            </div>
            <div className="w-full md:w-5/12">
              <button className="w-full transition-all  bg-black p-4 text-white my-2 rounded-md hover:bg-gray-800 font-bold">LOG IN</button>
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