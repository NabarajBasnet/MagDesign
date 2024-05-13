'use client'


import { useEffect, useState } from "react";
import Link from "next/link";


const SingleBlogPost = (props) => {

    const [blog, setBlog] = useState(null);
    const [allBlogs, setAllBlogs] = useState([]);
    const [relatedBlog, setRelatedBlog] = useState('');
    console.log('Related Blogs: ', relatedBlog)
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
        <section className="mx-auto px-4 flex items-center justify-center">
            <div className="w-full">
                {blog && (
                    <>
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="flex py-14 flex-col items-center justify-center w-full md:w-11/12">
                                <img src={blog.imageurl} className="w-16 h-16 rounded-full"/>
                                <h1 className="font-bold py-1  text-xl text-gray-700">{blog.author}</h1>
                                <h1 className="font-bold text-xl text-gray-700">{blog.date}</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full md:w-11/12">
                                <h1 className="font-bold text-2xl md:text-4xl py-4 text-center">{blog.title}</h1>
                                <h1 className="text-gray-600 font-semibold font-sans text-center py-4">{blog.introduction}</h1>
                                <img src={blog.imageurl} className="w-full rounded-xl mt-4"/>
                                <p className="py-5 font-semibold text-gray-700 font-xl">{blog.bodycontent}</p>
                            </div>

                            <hr className="bg-gray-600 mt-8 mb-8 size-0.5 w-full md:w-11/12"></hr>

                            <div className="flex flex-col items-start w-full md:w-11/12 ">
                                <h1 className="text-gray-700 font-bold text-3xl">Share</h1>
                                <ul className="flex py-9">
                                    <li className="px-4"><Link href={'/'}><img src="/icons/facebook.png" className="w-8"/></Link></li>
                                    <li className="px-4"><Link href={'/'}><img src="/icons/twitter.png" className="w-8"/></Link></li>
                                    <li className="px-4"><Link href={'/'}><img src="/icons/instagram.png" className="w-8"/></Link></li>
                                    <li className="px-4"><Link href={'/'}><img src="/icons/google.png" className="w-8"/></Link></li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};


export default SingleBlogPost;
