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
            <div className="bg-white shadow-2xl h-screen w-full">
                <div className=" flex w-full bg-white">
                    <ul className="flex-col p-8 items-center justify-center">
                        <li className="flex flex-row-reverse justify-between">
                            <div>
                                <img onClick={DispatchSideNavbarStates} src="icons/close-button.png" className="ml-32 cursor-pointer w-8" />
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
        </section>
    )
}


export default SideNavbar;