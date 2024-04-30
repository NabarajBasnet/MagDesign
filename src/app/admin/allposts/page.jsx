'use client'

import DeletePost from "@/components/postDelete/DeletePost";
import Link from "next/link";
import { useState, useEffect } from "react";


const AllPosts = () => {
    const [blogpostsadmin, setBlogPostsAdmin] = useState([]);

    const getAllPostsAdmin = async () => {
        const req = await fetch('http://localhost:3000/api/blogs');
        const res = await req.json();
        setBlogPostsAdmin(res.result);
        setCurrentBlogId(res.result._id)
    };

    useEffect(() => {
        getAllPostsAdmin()
    }, []);

    const deletePost = () => {
        alert('Post Deleted!')
    };

    return (
        <>
            <div>
                <div className="grid lg:grid-cols-2 p-8 md:grid-cols-1 sm:grid-cols-1">
                    {blogpostsadmin.length > 1 ? (
                        <>
                            {blogpostsadmin.map((blog, _id) =>
                            (
                                <>
                                    <div className="flex flex-row items-start  shadow-xl rounded-2xl lg:m-3  w-110 h-full mt-10">
                                        <div className="flex flex-row items-center mt-10">
                                            <div>
                                                <img src="" alt="Blog Image" className="bg-gray-600 border-gray-500 md:w-44 md:h-44 sm:h-28 sm:w-28 lg:w-64 lg:h-64  border rounded-2xl mr-4" />
                                            </div>

                                            <div>
                                                <Link href={`/admin/allposts/${blog._id}`} key={_id}>
                                                    <div className="flex flex-row">
                                                        <p className="font-bold">{blog.category},{blog.subCategory}</p>
                                                        <p className="font-bold text-gray-500">-{blog.date}</p>
                                                    </div>
                                                </Link>

                                                <div className="mt-4">
                                                    <Link href={`/admin/allposts/${blog._id}`} key={_id}>
                                                        <p className="font-bold mt-4 text-2xl">{blog.title}</p>
                                                    </Link>

                                                    <textarea className="text-gray-500 mt-4 w-80 outline-none border-none h-32 font-bold">{blog.introduction}</textarea>
                                                </div>

                                                <div className="flex mt-4 flex-col items-center">
                                                    <div className="flex flex-row items-center">
                                                        <div>
                                                            <img src="" alt="User Image" />
                                                        </div>
                                                        <div>
                                                            <p>{blog.author}</p>
                                                            <p>CEO & Founder</p>
                                                        </div>
                                                    </div>


                                                    <div className="flex flex-row items-center justify-between w-full mt-5 border lg:p-3 md:p-1  rounded-lg border-gray-400">
                                                        <Link href={`/admin/allposts/${blog._id}`}>
                                                            <button className="underline text-green-800 hover:text-green-600 font-bold">Edit</button>
                                                        </Link>
                                                        <DeletePost id={blog._id} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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