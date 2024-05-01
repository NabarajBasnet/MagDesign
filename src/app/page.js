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
                  <img src={latestBlog.imageurl} alt="Blog Image" width={latestBlog.imagewidth/3} height={latestBlog.imageheight/3} className=" border" />
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
                      <img src={latestBlog.imageurl} width={50} height={50} className="rounded-full" alt="User Image" />
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
                    {blogposts.map((blog, _id) =>
                    (
                      <Link href={'/'} key={_id}>
                        <div className="flex p-5 flex-col items-center border m-4 rounded-xl shadow-2xl">
                          <div>
                            <img src={blog.imageurl} width={latestBlog.imagewidth/5} height={latestBlog.imageheight/5} alt="Blog Image" className="rounded-xl shadow-2xl mt-5 mb-5" />
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
                                <img src={latestBlog.imageurl} className="rounded-full mr-5" width={50} height={50} alt="User Image" />
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
