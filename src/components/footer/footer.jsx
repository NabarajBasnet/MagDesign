'use client'

import Link from "next/link";


const Footer = () => {
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col w-full items-center p-4 justify-center">
                    <div className="w-full p-6 bg-gray-200">
                        <div className="text-3xl font-bold">
                            <h1>Subscribe to newsletter</h1>
                        </div>
                        <div className="flex lg:flex-row md:flex-col sm:flex-col w-full  items-center">
                            <input type="email" placeholder="Enter your email" className="m-2 border-2 outline-none placeholder:text-xl placeholder:text-gray-500 border-gray-400 rounded-lg md:w-full sm:w-full lg:w-2/3 p-5" />
                            <button className="bg-orange-500 hover:bg-white hover:text-orange-500 hover:shadow-lg w-1/3 h-16 transition-all rounded-full text-white m-2 font-bold ">SUBSCRIBE</button>
                        </div>
                    </div>

                    <div className="flex flex-col bg-gray-100 w-full items-center justify-center">
                        <div>
                            <ul className="flex flex-row mt-10">
                                <li className="m-2 bg-gray-400 p-1 rounded-md hover:scale-105 transition-all hover:bg-yellow-500"><Link href={'/'}><img src="/icons/facebook.png" className="w-8  rounded-md" /></Link></li>
                                <li className="m-2 bg-gray-400 p-1 rounded-md hover:scale-105 transition-all hover:bg-yellow-500"><Link href={'/'}><img src="/icons/instagram.png" className="w-8  rounded-md" /></Link></li>
                                <li className="m-2 bg-gray-400 p-1 rounded-md hover:scale-105 transition-all hover:bg-yellow-500"><Link href={'/'}><img src="/icons/twitter.png" className="w-8  rounded-md" /></Link></li>
                                <li className="m-2 bg-gray-400 p-1 rounded-md hover:scale-105 transition-all hover:bg-yellow-500"><Link href={'/'}><img src="/icons/github.png" className="w-8  rounded-md" /></Link></li>
                            </ul>
                        </div>
                        <div className="mt-16">
                            <h1>Copyright ©2024 All rights reserved</h1>
                        </div>
                        <div className="mt-16">
                            <h1> <Link href={'#'} className="underline">Terms & Conditions</Link>/ <Link className="underline" href={'#'}>Privacy Policy</Link> </h1>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}


export default Footer;