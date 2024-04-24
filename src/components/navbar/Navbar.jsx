'use client'

import Link from "next/link";
import { useState } from "react";
import SideNavbar from "./SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { SideNavbarState } from "../redux/action";


const Navbar = () => {
    // States
    const [navsidebar, setNavsidebar] = useState(false);

    // Redux
    const navsidebarState = useSelector(state=>state.SideNavbarState)
    const dispatch = useDispatch()

    const DispatchnavsidebarState = ()=>
    {
        dispatch(SideNavbarState(!navsidebarState))
    }


    return (
        <>
            <div className="flex flex-row-reverse w-full">
                <nav className="flex flex-row items-start w-full">
                    <div className="flex flex-row items-center justify-around p-8 border border-gray-300 w-full">
                        <div>
                            <div className="flex flex-row items-center p-2 border w-full border-gray-400 rounded-3xl">
                                <img src="/icons/searchicon.png" className="w-6 cursor-pointer" />
                                <input type="text" placeholder="Search..." className="outline-none border-none w-80 bg-transparent" />
                            </div>
                        </div>

                        <div className="14">
                            <Link href={'/'}>
                                <h1 className="font-bold text-black text-2xlbefore:">MAGDESIGN</h1>
                            </Link>
                        </div>

                        <div className="flex flex-row items-center justify-between">
                            <div className="mr-64">
                                <ul className="flex flex-row items-center">
                                    <li className="mr-2"><Link href={'/'}><img src="/icons/facebook.png" className="w-6" /></Link></li>
                                    <li className="mr-2"><Link href={'/'}><img src="/icons/instagram.png" className="w-6" /></Link></li>
                                    <li className="mr-2"><Link href={'/'}><img src="/icons/twitter.png" className="w-6" /></Link></li>
                                </ul>
                            </div>

                            <div>
                                {navsidebarState?(
                                <img onClick={DispatchnavsidebarState} src={"icons/closewindow.png"} className="cursor-pointer w-8" />

                                ):(
                                <img onClick={DispatchnavsidebarState} src={"icons/burgermenu.png"} className="cursor-pointer w-8" />

                                )}
                            </div>
                        </div>

                    </div>

                </nav>
                <div>
                    {
                        navsidebarState && (
                            <>
                                <div className="fixed bg-black">
                                    <SideNavbar />
                                </div>
                            </>
                    )}
                </div>
            </div>

        </>
    )
}

export default Navbar;