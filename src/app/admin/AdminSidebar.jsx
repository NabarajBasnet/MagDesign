'use client'

import Link from "next/link";

const AdminSidebar = () => 
{
    return (
        <div className="bg-rose-400 h-screen w-64 shadow-2xl">
            <div className="w-full py-6 shadow-xl">
                <h2 className=" text-2xl font-serif font-bold px-4">Dashboard</h2>
            </div>
            <nav className="mt-10">
                <ul>
                    <li>
                        <Link href="/admin/overview">
                            <div className="block py-2 px-4 hover:shadow-xl hover:bg-rose-800 font-bold text-lg mt-2 hover:text-white cursor-pointer">Overview</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/allposts">
                            <div className="block py-2 px-4 hover:shadow-xl hover:bg-rose-800 font-bold text-lg mt-2 hover:text-white cursor-pointer">All Posts</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/createblogs">
                            <div className="block py-2 px-4 hover:shadow-xl hover:bg-rose-800 font-bold text-lg mt-2 hover:text-white cursor-pointer">Create Blogs</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/user">
                            <div className="block py-2 px-4 hover:shadow-xl hover:bg-rose-800 font-bold text-lg mt-2 hover:text-white cursor-pointer">Users</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
