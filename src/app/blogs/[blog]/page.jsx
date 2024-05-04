'use client'


import { useEffect, useState } from "react";

const SingleBlogPost = (props) => {

    const [blog, setBlog] = useState(null);

    const SingleblogId = props.params.blog;

    const getSingleBlogDetails = async () => {
        try {
            const req = await fetch(`http://localhost:3000/api/blogs/${SingleblogId}`);
            const res = await req.json();
            setBlog(res.result[0])
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getSingleBlogDetails()
    }, []);

    return (
        <>
            <div>
                <div>
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
                                        <h1 className="text-5xl w-1/2 font-bold">{blog.title}</h1>
                                        <p className="text-xl font-serif font-bold text-gray-400 w-1/2 mt-5">{blog.introduction}</p>
                                        <img src={blog.imageurl} className="w-1/2 mt-12 rounded-lg shadow-lg" alt="Image" />
                                        <p className="font-bold font-sans text-gray-500 text-2xl w-1/2 mt-10">{blog.bodycontent}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div>
                                        <h1>Share</h1>
                                    </div>
                                    <div className="flex flex-row">
                                        <h1>F</h1>
                                        <h1>T</h1>
                                        <h1>In</h1>
                                        <h1>P</h1>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};


export default SingleBlogPost;