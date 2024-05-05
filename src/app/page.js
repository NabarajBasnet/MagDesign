'use client'


import Link from "next/link";
import { useState, useEffect } from "react";


export default function Home() {

  const [blogposts, setBlogPosts] = useState([]);
  const latestBlog = blogposts[blogposts.length - 1];


  const fetchAllBlogPosts = async () => {
    try {
      const req = await fetch('http://localhost:3000/api/blogs');
      const res = await req.json();
      setBlogPosts(res.result)
    }
    catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchAllBlogPosts();
  }, []);


  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col w-full justify-center items-center mt-14">
          <h1 className="text-5xl font-bold">Latest</h1>
          {latestBlog && (
            <>

              <div className="w-full flex flex-row items-center justify-center">
                <Link href={`/blogs/${latestBlog._id}`}>
                  <div className="p-10">
                    <img src={latestBlog.imageurl} alt="Blog Image" className="rounded-xl" />
                  </div>
                </Link>

                <Link href={`/blogs/${latestBlog._id}`}>
                  <div className="p-10">
                    <h1> <span className="text-lg font-bold text-gray-700">{latestBlog.category}</span>, <span className="text-lg font-bold text-gray-700">{latestBlog.subCategory}</span> - <span className="text-md font-bold text-gray-600">{latestBlog.date}</span> </h1>
                    <h1 className="text-4xl font-bold mt-2">{latestBlog.title}</h1>
                    <p className="text-gray-500 font-semibold mt-5">{latestBlog.introduction}</p>

                    <div className="flex flex-row items-center mt-5">
                      <div className="mr-4">
                        <img src={latestBlog.imageurl} className="w-16 h-16 rounded-full" />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold">{latestBlog.author}</h1>
                        <p className="text-gray-500 font-bold">CEO & Founder</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>


              <div className="flex flex-row w-full">
                {blogposts && (
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {blogposts.map((blog, _id) =>
                    (
                      <Link href={`/blogs/${blog._id}`} key={_id}>
                        <div className="flex p-5 flex-col items-center border m-4 rounded-xl shadow-2xl">
                          <div>
                            <img src={blog.imageurl} width={400} height={400} alt="Blog Image" className="rounded-xl shadow-2xl mt-5 mb-5" />
                          </div>
                          <div>
                            <div>
                              <p className="font-bold mb-5"><span>{blog.category}</span>,<span>{blog.subCategory} - <span className="text-gray-600">{blog.date}</span></span></p>
                            </div>
                            <div>
                              <h2 className="font-bold text-3xl mb-5">{blog.title}</h2>
                            </div>
                            <div>
                              <h2 className="font-bold text-gray-600 mb-5">{blog.introduction}</h2>
                            </div>
                            <div className="flex flex-row items-center">
                              <div>
                                <img src={latestBlog.imageurl} className="rounded-full mr-5 w-14 h-14" alt="User Image" />
                              </div>
                              <div>
                                <h2 className="font-bold">{latestBlog.author}</h2>
                                <p className="text-gray-500 font-bold">CEO and Founder</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
