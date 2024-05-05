'use client'

import Link from "next/link";
import SideNavbar from "./SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { SideNavbarState, SearchedQueryAction } from "../redux/action";
import { useEffect, useState } from "react";


const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState('');


    // Redux
    const navsidebarState = useSelector(state => state.SideNavbarState);
    const searchedQueryWordReducer = useSelector(state => state.searchedQueryWord);
    const dispatch = useDispatch()

    const DispatchnavsidebarState = () => {
        dispatch(SideNavbarState(!navsidebarState))
    };

    const DispatchSearchedQueryAction = () => {
        dispatch(SearchedQueryAction(searchQuery))
    };

    useEffect(() => {
        DispatchSearchedQueryAction()
    }, [searchQuery]);


    return (
        <>
            <div className="flex flex-row-reverse w-full">
                <nav className="flex flex-row items-start w-full">
                    <div className="flex lg:flex-row md:flex-col sm:flex-col items-center justify-around p-8 border border-gray-300 lg:w-full md:w-full">
                        <div>
                            <h1 className="md:flex sm:flex lg:hidden font-bold text-black text-2xlbefore:">MAGDESIGN</h1>
                        </div>

                        <div>
                            <div className="flex md:hidden sm:hidden lg:flex lg:flex-row items-center p-2 border w-full border-gray-400 rounded-3xl">
                                <img src="/icons/searchicon.png" className="w-6 cursor-pointer" />
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="outline-none border-none lg:w-80 md:w-40 sm:w-20 bg-transparent " />
                            </div>
                        </div>

                        <div className="14">
                            <Link href={'/'}>
                                <h1 className="md:hidden sm:hidden lg:flex font-bold text-black text-2xlbefore:">MAGDESIGN</h1>
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
                                {navsidebarState ? (
                                    <img onClick={DispatchnavsidebarState} src={"icons/closewindow.png"} className="cursor-pointer w-8" />

                                ) : (
                                    <img onClick={DispatchnavsidebarState} src={"icons/burgermenu.png"} className="cursor-pointer w-8" />
                                )}
                            </div>

                        </div>
                        <div>
                            <div className="flex md:flex sm:flex lg:hidden lg:flex-row items-center md:mt-10 sm:mt-6 p-2 border w-full border-gray-400 rounded-3xl">
                                <img src="/icons/searchicon.png" className="w-6 cursor-pointer" />
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="outline-none border-none lg:w-80 md:w-80 sm:w-80 bg-transparent " />
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