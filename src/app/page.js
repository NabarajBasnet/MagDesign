'use client'


import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Home() {

  const [blogposts, setBlogPosts] = useState([]);
  const latestBlog = blogposts[blogposts.length - 1];


  const fetchAllBlogPosts = async () => {
    const req = await fetch('http://localhost:3000/api/blogs');
    const res = await req.json();
    setBlogPosts(res.result)
  };

  useEffect(() => {
    fetchAllBlogPosts();
  }, []);


  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col w-full justify-center items-center mt-14">
          <h1 className="text-5xl font-bold">Trending</h1>
          {latestBlog && (
            <>
              <div className=" flex md:flex-col sm:flex-col lg:flex-row w-full h-1/2 mb-64 md:justify-center lg:justify-center mt-14">
                <div className="m-4 lg:w-1/2 lg:h-1/2 md:w-full sm:w-full md:p-10 sm:p-10">
                  <img src="" alt="Blog Image" className="w-full border h-full" />
                </div>
                <div className=" m-4 lg:w-1/2 lg:h-1/2 md:w-full sm:w-full md:p-10 sm:p-10">
                  <div>
                    <h2 className="flex flex-row"><span className="font-bold text-black">{latestBlog.category}, {latestBlog.subCategory}</span> - <span className="font-bold text-gray-500">{latestBlog.date}</span></h2>
                  </div>
                  <div className="mt-5">
                    <h1 className="font-bold text-5xl">{latestBlog.title}</h1>
                  </div>
                  <div className="mt-5">
                    <h3 className="font-bold text-gray-500">{latestBlog.introduction}</h3>
                  </div>
                  <div className="flex flex-row items-center mt-5">
                    <div>
                      <img src="" alt="User Image" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-bold">{latestBlog.author}</h2>
                      <p className="text-gray-400 font-bold">CEO and Founder</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full">
                {blogposts && (
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {blogposts.map((blog) =>
                    (
                      <Link href={'/'}>
                        <div className="flex flex-col items-center border m-4 rounded-xl shadow-xl">
                          <div>
                            <img src="" alt="Blog Image" className="w-40 h-60" />
                          </div>
                          <div>
                            <div>
                              <p className="font-bold"><span>{blog.category}</span>,<span>{blog.subCategory} - <span className="text-gray-600">{blog.date}</span></span></p>
                            </div>
                            <div>
                              <h2 className="font-bold text-2xl">{blog.title}</h2>
                            </div>
                            <div>
                              <h2 className="font-bold text-gray-500">{blog.introduction}</h2>
                            </div>
                            <div className="flex flex-row items-center">
                              <div>
                                <img src="" alt="User Image" />
                              </div>
                              <div>
                                <h2 className="font-bold">{latestBlog.author}</h2>
                                <p className="text-gray-400 font-bold">CEO and Founder</p>
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
