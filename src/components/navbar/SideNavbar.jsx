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
        <>
            <div className="bg-white shadow-2xl h-screen w-full">
                <div className=" flex flex-row items-start w-full bg-white">

                    <div>
                        <ul className="flex flex-col p-8 items-start">
                            <li className="flex flex-row-reverse justify-between">
                                <div>
                                    <img onClick={DispatchSideNavbarStates} src="icons/closewindow.png" className="ml-32 cursor-pointer w-6" />
                                </div>
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li className="mt-10"><Link href={'/blogs'}>Blogs</Link></li>
                            <li className="mt-10"><Link href={'/categories'}>Categories</Link></li>
                            <li className="mt-10"><Link href={'/aboutus'}>About Us</Link></li>
                            <li className="mt-10"><Link href={'/contactus'}>Contact Us</Link></li>
                            <li className="mt-10"><Link href={'/account'}>Account</Link></li>
                            <li className="mt-10"><Link href={'/admin'}>Admin</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SideNavbar;