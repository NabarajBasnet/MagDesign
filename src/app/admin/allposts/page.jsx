'use client'

import Link from "next/link";
import { useState, useEffect } from "react";



const AllPosts = () => {
    const [blogpostsadmin, setBlogPostsAdmin] = useState([]);

    const getAllPostsAdmin = async () => {
        const req = await fetch('http://localhost:3000/api/blogs');
        const res = await req.json();
        setBlogPostsAdmin(res.result);
    };

    useEffect(() => {
        getAllPostsAdmin()
    }, []);

    const deletePost = ()=>
    {
        alert('Post Deleted!')
    }

    return (
        <>
            <div>
                <div className="grid lg:grid-cols-2 p-8 md:grid-cols-2 sm:grid-cols-1">
                    {blogpostsadmin.length > 1 ? (
                        <>
                            {blogpostsadmin.map((blog, _id) =>
                            (
                                <>
                                    <Link href={`/admin/allposts/${blog._id}`} key={_id}>
                                        <div className="flex flex-row items-start  shadow-xl rounded-2xl m-3 w-110 h-96">
                                            <div className="flex flex-row items-center">
                                                <div>
                                                    <img src="" alt="Blog Image" className="bg-gray-600 w-64 h-64 border rounded-2xl mr-4" />
                                                </div>
                                                <div>
                                                    <div className="flex flex-row">
                                                        <p className="font-bold">{blog.category},{blog.subCategory}</p>
                                                        <p className="font-bold text-gray-500">-{blog.date}</p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="font-bold mt-4 text-2xl">{blog.title}</p>
                                                        <textarea className="text-gray-500 mt-4 w-80 outline-none border-none h-32 font-bold">{blog.introduction}</textarea>
                                                    </div>
                                                    <div className="flex mt-4 flex-row items-center">
                                                        <div>
                                                            <img src="" alt="User Image" />
                                                        </div>
                                                        <div>
                                                            <p>{blog.author}</p>
                                                            <p>CEO & Founder</p>
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-row items-center justify-between w-full mt-5">
                                                        <button className="underline text-green-800 hover:text-green-600 font-bold">Edit</button>
                                                        <button onClick={()=>deletePost()} className="bg-red-600 p-1 border-none rounded-md w-28 hover:shadow-md h-10 hover:scale-105 transition-all text-white font-bold">Delete</button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    </Link>
                                </>
                            ))}
                        </>
                    ) : (
                        <>
                            <div className="flex flex-row items-center justify-center text-7xl font-bold">
                                <h1>Loading<span>...</span></h1>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default AllPosts;