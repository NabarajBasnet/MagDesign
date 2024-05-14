'use client'

import DeletePost from "@/components/postDelete/DeletePost";
import Link from "next/link";
import { useState, useEffect } from "react";


const AllPosts = () => {
    const [blogpostsadmin, setBlogPostsAdmin] = useState([]);

    const getAllPostsAdmin = async () => {
        try {
            const req = await fetch('http://localhost:3000/api/blogs');
            const res = await req.json();
            setBlogPostsAdmin(res.result);
        }
        catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        getAllPostsAdmin()
    }, []);


    return (
        <>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 p-8">
                    {blogpostsadmin.length >= 1 ? (
                        <>
                            {blogpostsadmin.map((blog, _id) =>
                            (
                                <>
                                    <div className="w-full shadow-xl rounded-2xl" key={_id}>
                                        <div className="mt-10">
                                            <div className="w-full px-4">
                                                <img src={blog.imageurl} alt="Blog Image" className="h-96 w-full bg-gray-600 border-gray-500  border rounded-2xl mr-4 sm:mb-10" />
                                            </div>

                                            <div className="w-full px-4">
                                                <Link href={`/admin/allposts/${blog._id}`}>
                                                    <div className="flex justify-center">
                                                        <p className="font-bold">{blog.category},{blog.subCategory}</p>
                                                        <p className="font-bold text-gray-500">-{blog.date}</p>
                                                    </div>
                                                </Link>

                                                <div className="mt-4 w-full">
                                                    <Link href={`/admin/allposts/${blog._id}`}>
                                                        <p className="font-bold w-full text-center mt-4 text-2xl">{blog.title}</p>
                                                    </Link>

                                                    <textarea className="text-gray-500 mt-4 w-full outline-none border-none h-32 font-bold">{blog.introduction}</textarea>
                                                </div>


                                                <div className="w-full flex justify-center items-center">
                                                    <div>
                                                        <img src={blog.imageurl} className="rounded-full mr-5 w-16 h-16" alt="User Image" />
                                                    </div>
                                                    <div>
                                                        <p>{blog.author}</p>
                                                        <p>CEO & Founder</p>
                                                    </div>
                                                </div>

                                                
                                                <div className="flex w-full items-center justify-between mt-5 p-5 rounded-lg">
                                                        <Link href={`/admin/allposts/${blog._id}`}>
                                                            <button className="underline text-green-800 hover:text-green-600 font-bold">Edit</button>
                                                        </Link>
                                                        <div>
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