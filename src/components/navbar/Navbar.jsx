'use client'

import Link from "next/link";
import SideNavbar from "./SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { SideNavbarState, SearchedQueryAction } from "../redux/action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState('');


    // Redux
    const navsidebarState = useSelector(state => state.SideNavbarState);
    const searchedQueryWordReducer = useSelector(state => state.searchedQueryWord);
    const dispatch = useDispatch()
    const router = useRouter()

    const DispatchnavsidebarState = () => {
        dispatch(SideNavbarState(!navsidebarState))
    };

    const DispatchSearchedQueryAction = () => {
        dispatch(SearchedQueryAction(searchQuery))
    };

    useEffect(() => {
        DispatchSearchedQueryAction()
    }, [searchQuery]);

    const searchPostsInServer = async () => {
        const req = await fetch(`http://localhost:3000/api/blogs/?search=${searchQuery}`);
    }

    const handleKeyPressForSearch = (e) => {
        if (e.key === 'Enter') {
            dispatch(SearchedQueryAction(searchQuery));
            router.push('/blogs/')
            searchPostsInServer();
        }
        else {
            ''
        }
    }

    return (
        <section>
            {navsidebarState ? (
                <div className="fixed inset-0 backdrop-filter backdrop-blur-md z-50 flex items-center justify-center bg-black transition-all bg-opacity-50">
                    <div className="w-full h-full  rounded-lg shadow-lg p-8 transform transition-transform ease-in-out duration-600">
                        <SideNavbar />
                    </div>
                </div>
            ) : (
                <section className="mx-auto px-4 py-8 border ">
                    <div className="w-full ">
                        <div className="w-full  flex justify-between h-24 md:h-full  md:items-center">
                            <div className="w-3/12 hidden md:flex justify-center items-center">
                                <div className="w-2/3 flex border border-gray-500 p-2 rounded-full">
                                    <img src="/icons/search.png" className="w-6 cursor-pointer" />
                                    <input type="text" onKeyPress={handleKeyPressForSearch} className="outline-none border-none bg-transparent w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
                                </div>
                            </div>

                            <div className="w-6/12 hidden md:flex  justify-center">
                                <Link href={'/'}>
                                    <h1 className="font-bold text-2xl">MAGDESIGN</h1>
                                </Link>
                            </div>

                            <div className="w-3/12 md:flex hidden items-center">
                                <Link href={'/'} className="flex w-9/12 md:justify-start">
                                    <img src="/icons/twitter.png" className="w-7" />
                                    <img src="/icons/facebook.png" className="w-7" />
                                    <img src="/icons/instagram.png" className="w-7" />
                                </Link>
                                <div className="w-3/12 justify-end">
                                    {navsidebarState ? (
                                        <img src="/icons/close-button.png" className="w-8 cursor-pointer" onClick={DispatchnavsidebarState} />
                                    ) : (
                                        <img src="/icons/menu.png" className="w-8 cursor-pointer" onClick={DispatchnavsidebarState} />
                                    )}
                                </div>
                            </div>


                            {/* Mobile */}


                            <div className="w-4/12 flex md:hidden items-center">
                                <Link href={'/'} className="flex w-full">
                                    <img src="/icons/twitter.png" className="w-7" />
                                    <img src="/icons/facebook.png" className="w-7" />
                                    <img src="/icons/instagram.png" className="w-7" />
                                </Link>
                            </div>
                            <div className="w-4/12 flex md:hidden justify-center">
                                <Link href={'/'}>
                                    <h1 className="font-bold text-2xl">MAGDESIGN</h1>
                                </Link>
                            </div>
                            <div className="w-4/12 flex md:hidden justify-end items-center">
                                {navsidebarState ? (
                                    <img src="/icons/close-button.png" className="w-8 cursor-pointer" onClick={DispatchnavsidebarState} />
                                ) : (
                                    <img src="/icons/menu.png" className="w-8 cursor-pointer" onClick={DispatchnavsidebarState} />
                                )}
                            </div>
                        </div>

                        <div className="w-full flex md:hidden justify-center items-center">
                            <div className="w-full flex border border-gray-500 p-2 rounded-full">
                                <img src="/icons/search.png" className="w-6 cursor-pointer" />
                                <input type="text" onKeyPress={handleKeyPressForSearch} className="outline-none border-none bg-transparent w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
                            </div>
                        </div>

                    </div>
                </section>
            )}
        </section>
    )
}

export default Navbar;