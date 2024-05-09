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
        <section className="mx-auto px-4 py-4">
            <div className="w-full">
                <div className="w-full  flex justify-between h-28">
                    <div className="w-4/12 flex  items-center">
                        <Link href={'/'} className="flex w-full">
                            <img src="/icons/twitter.png" className="w-7" />
                            <img src="/icons/facebook.png" className="w-7" />
                            <img src="/icons/instagram.png" className="w-7" />
                        </Link>
                    </div>
                    <div className="w-4/12 flex  justify-center">
                        <Link href={'/'}>
                            <h1 className="font-bold text-2xl">MAGDESIGN</h1>
                        </Link>
                    </div>
                    <div className="w-4/12 flex justify-end items-center">
                        {navsidebarState ? (
                            <img src="/icons/close-button.png" className="w-8 cursor-pointer" onClick={DispatchnavsidebarState} />
                        ) : (
                            <img src="/icons/menu.png" className="w-8 cursor-pointer" onClick={DispatchnavsidebarState}/>
                        )}
                    </div>
                </div>

                <div className="w-full flex justify-center items-center">
                    <div className="w-full flex border border-gray-500 p-2 rounded-full">
                        <img src="/icons/search.png" className="w-6 cursor-pointer" />
                        <input type="text" className="outline-none border-none bg-transparent w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..."  />
                    </div>
                </div>

                <div>
                    {navsidebarState?(
                        <SideNavbar/>
                    ):(
                        ''
                    )}
                </div>
            </div>
        </section>
    )
}

export default Navbar;