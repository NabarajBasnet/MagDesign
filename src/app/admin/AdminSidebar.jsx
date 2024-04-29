'use client'

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";


const AdminSidebar = () => {
    const adminSidebar = useSelector(state => state.adminSidebar)

    return (
        <div className="bg-blue-700 h-screen w-64 shadow-2xl">
            <div className="w-full py-6 text-white shadow-xl flex flex-row">
                <img src="/adminicon/dashboard.png" className="w-8" />
                {
                    adminSidebar ? (
                        <>
                            <h2 className=" text-2xl font-serif font-bold px-4">Dashboard</h2>
                        </>
                    ) : ('')
                }
            </div>
            <nav className="mt-10">
                <ul className="text-white">
                    <li>
                        <Link href="/admin/overview" className="flex flex-row hover:shadow-xl items-center ml-3">
                            <img src="/adminicon/overview.png" className="w-6 mt-2" />
                            <div className="block py-2 px-4 font-bold text-lg mt-2 hover:text-white cursor-pointer">
                            {adminSidebar ? (
                                <>
                                    <div>Overview</div>
                                </>
                            ) : ('')}
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/allposts" className="flex flex-row hover:shadow-xl items-center ml-3">
                            <img src="/adminicon/allposts.png" className="w-6 mt-2"/>
                            <div className="block py-2 px-4 font-bold text-lg mt-2 hover:text-white cursor-pointer">
                            {adminSidebar ? (
                                <>
                                    <div>All Posts</div>
                                </>
                            ) : ('')}
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/createblogs" className="flex flex-row hover:shadow-xl items-center ml-3">
                            <img src="/adminicon/create.png" alt="" className="w-6  mt-2" />
                            <div className="block py-2 px-4 font-bold text-lg mt-2 hover:text-white cursor-pointer">
                            {adminSidebar ? (
                                <>
                                    <div>Create Blogs</div>
                                </>
                            ) : ('')}
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/user" className="flex flex-row hover:shadow-xl items-center ml-3">
                            <img src="/adminicon/user.png" className="w-6 mt-2"/>
                            <div className="block py-2 px-4 font-bold text-lg mt-2 hover:text-white cursor-pointer">
                            {adminSidebar ? (
                                <>
                                    <div>Users</div>
                                </>
                            ) : ('')}
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
