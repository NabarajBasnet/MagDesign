'use client'

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { SideNavbarState } from "../redux/action";


const SideNavbar = () => {

    const navsidebarState = useSelector(state => state.SideNavbarState)
    const dispatch = useDispatch()

    const DispatchSideNavbarStates = () => {
        dispatch(SideNavbarState(!navsidebarState))
    }
    return (
        <section>
            <div className=" shadow-2xl h-screen w-full ">
                <div className=" flex w-full justify-center text-white font-bold"> 
                    <ul className="w-full flex-col items-center text-center justify-center">
                        <li className=" p-6 cursor-pointer rounded-lg  w-full"><Link href={'/'}>Home</Link></li>
                        <li className=" p-6 cursor-pointer rounded-lg  w-full"><Link href={'/blogs'}>Blogs</Link></li>
                        <li className=" p-6 cursor-pointer rounded-lg  w-full"><Link href={'/categories'}>Categories</Link></li>
                        <li className=" p-6 cursor-pointer rounded-lg  w-full"><Link href={'/account'}>Account</Link></li>
                        <li className=" p-6 cursor-pointer rounded-lg  w-full"><Link href={'/admin'}>Admin</Link></li>
                        <li className=" p-6 cursor-pointer rounded-lg  w-full flex justify-center">
                            <button onClick={DispatchSideNavbarStates} className="bg-slate-200 p-2 rounded-lg text-red-600 hover:text-white cursor-pointer font-bold hover:bg-red-700">Close Menu</button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}


export default SideNavbar;