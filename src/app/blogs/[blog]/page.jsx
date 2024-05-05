'use client'


import { useEffect, useState } from "react";
import Link from "next/link";


const SingleBlogPost = (props) => {

    const [blog, setBlog] = useState(null);
    const [allBlogs, setAllBlogs] = useState([]);
    const [relatedBlog, setRelatedBlog] = useState('');
    console.log('Related Blogs: ',relatedBlog)
    const SingleblogId = props.params.blog;


    const getSingleBlogDetails = async () => {
        try {
            const req = await fetch(`http://localhost:3000/api/blogs/${SingleblogId}`);
            const res = await req.json();
            setBlog(res.result[0]);
            setRelatedBlog(res.result[0].title);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleBlogDetails()
    }, []);

    const getAllBlogs = async () => {
        try {
            const req = await fetch(`http://localhost:3000/api/blogs/`);
            const res = await req.json();
            setAllBlogs(res.result)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, [])


    return (
        <>
            <div>
                <div className="w-full">
                    {blog && (
                        <>
                            <div className="flex flex-col justify-center items-center mt-10">
                                <div className="flex flex-col items-center">
                                    <img src={blog.imageurl} className="w-24 h-24 rounded-full shadow-xl" alt="User Image" />
                                    <h1 className="text-lg font-bold text-gray-500 mt-2">{blog.author}</h1>
                                    <p className="text-lg text-gray-500 mt-2">{blog.date}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center mt-16">
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className="text-5xl md:w-full lg:w-1/2 font-bold md:p-8">{blog.title}</h1>
                                        <p className="text-xl font-serif font-bold text-gray-400 md:w-full lg:w-1/2 mt-5">{blog.introduction}</p>
                                        <img src={blog.imageurl} className="sm:p-3 sm:rounded-lg md:w-full md:p-4 lg:w-1/2 mt-12 rounded-lg shadow-lg" alt="Image" />
                                        <p className="font-bold font-sans text-gray-500 md:p-4 sm:p-6 text-2xl md:w-full lg:w-1/2 mt-10">{blog.bodycontent}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start justify-start">
                                    <div className="text-2xl font-bold text-gray-600 mt-14">
                                        <h1>Share</h1>
                                    </div>
                                    <div className="flex flex-row items-start justify-start">
                                        <ul className="flex flex-row mt-5">
                                            <li className="mr-7 font-bold text-gray-700 bg-gray-300 rounded-full p-2 w-10 flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-xl"> <Link href='#'><h1>F</h1></Link></li>
                                            <li className="mr-7 font-bold text-gray-700 bg-gray-300 rounded-full p-2 w-10 flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-xl"> <Link href='#'><h1>I</h1></Link></li>
                                            <li className="mr-7 font-bold text-gray-700 bg-gray-300 rounded-full p-2 w-10 flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-xl"> <Link href='#'><h1>T</h1></Link></li>
                                            <li className="mr-7 font-bold text-gray-700 bg-gray-300 rounded-full p-2 w-10 flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-xl"> <Link href='#'><h1>P</h1></Link></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </>
                    )}

                    {/* Related Blogs */}
{/* 
                    <div className="flex justify-center items-start lg:w-full">
                            <div className="flex flex-col items-center mt-16 justify-start w-full">
                                <div>
                                    <h1 className="text-4xl font-bold">Related</h1>
                                </div>
                                <div className="flex lg:flex-row md:flex-col sm:flex-col items-center shadow-xl p-8 justify-center w-full m-8">
                                    <div className=" text-white flex flex-row items-center pl-10 pr-10 sm:w-full md:w-full lg:w-1/3">
                                        <img src={blog.imageurl} className="w-full rounded-lg" />
                                    </div>
                                    <div className="flex flex-col items-start justify-center pl-10 pr-10 h-64 w-full">
                                        <h1> <span className="text-xl font-bold">{blog.category}</span>, <span className="text-xl font-bold">{blog.subCategory}</span>- <span className="text-lg text-gray-500 font-bold">{blog.date}</span> </h1>
                                        <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
                                        <p className="text-gray-500 font-semibold mt-4">{blog.introduction}</p>
                                        <div className="flex flex-row items-center mt-4">
                                            <div className="mr-4">
                                                <img src={blog.imageurl} className="w-16 h-16 rounded-full" />
                                            </div>
                                            <div>
                                                <h1>{blog.author}</h1>
                                                <p>{blog.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    <div className="flex flex-col justify-around items-center">
                        <form className="flex lg:flex-row md:flex-row sm:flex-col w-full h-full items-center justify-around p-6">
                            <div>
                                <div>
                                    <label className="flex flex-col items-start w-full" >Date
                                        <input type="date" className="border w-full border-gray-400 p-2 rounded-md" placeholder="Enter your email" />
                                    </label>
                                </div>

                                <div className="flex flex-col items-start">
                                    <div className="mt-3 flex flex-col">
                                        <input type="text" className="border mt-2 border-gray-400 p-2 rounded-lg" placeholder="First Name" />
                                        <input type="text" className="border mt-2 border-gray-400 p-2 rounded-lg" placeholder="Last Name" />
                                    </div>

                                    <div className="mt-3 flex flex-col">
                                        <input type="text" className="border mt-2 border-gray-400 p-2 rounded-lg" placeholder="Enter Phone Number" />
                                        <input type="email" className="border mt-2 border-gray-400 p-2 rounded-lg" placeholder="Enter Email" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-row items-start justify-start">
                                    <textarea type="text" placeholder="Your Comment" className="flex flex-col items-start justify-start border h-64  border-gray-400 p-2 rounded-lg" />
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};


export default SingleBlogPost;
