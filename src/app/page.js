'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {

  const [blogposts, setBlogPosts] = useState([]);
  const latestBlog = blogposts[blogposts.length - 1];
  const [page, setPage] = useState(1);

  const blogsPerPage = 3;



  const fetchAllBlogPosts = async () => {
    try {
      const req = await fetch('http://localhost:3000/api/blogs');
      const res = await req.json();
      setBlogPosts(res.result);
    }
    catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchAllBlogPosts();
  }, []);

  // Pass query strings for pagination
  const handlePagination = async () => {
    const req = await fetch(`http://localhost:3000/api/blogs/?page=${page}&limit=${blogsPerPage}`);
    const res = await req.json();
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    handlePagination()
  }, [page]);

  useEffect(() => {
    handlePagination()
  }, []);


  return (
    <section className="mx-auto px-4">
      <div className="w-full">
        {latestBlog && (
          <>
            <h1 className="text-3xl md:text-7xl mt-16 flex justify-center font-bold">Latest</h1>
            <div className="w-full md:flex items-center mt-10 py-10 px-14 justify-between">
              <div className="w-full bg-black md:w-5/12 h-full rounded-xl">
                <Link href={`blogs/${latestBlog._id}`}>
                  <img src={latestBlog.imageurl} className="rounded-md shadow-2xl w-full" />
                </Link>
              </div>
              <div className="md:w-6/12 h-full rounded-xl">
                <Link href={`blogs/${latestBlog._id}`}>
                  <div>
                    <p className="mt-4 font-bold text-md">{latestBlog.category}, {latestBlog.subCategory} - {latestBlog.date}</p>
                    <h1 className="mt-4 font-bold text-4xl">{latestBlog.title}</h1>
                    <p className="mt-4 text-gray-600">{latestBlog.introduction}</p>
                  </div>
                  <div className="flex mt-4">
                    <div className="mr-4">
                      <img className="w-14 rounded-full h-14" src={latestBlog.imageurl} />
                    </div>
                    <div>
                      <p>{latestBlog.author}</p>
                      <p>Author</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex flex-row w-full">
              {blogposts && (
                <div className="grid md:grid-cols-3 p-6 w-full">
                  {blogposts.slice(0, 3).map((blog, _id) => (
                    <Link href={`/blogs/${blog._id}`} key={_id} className="p-5 flex justify-center items-center">
                      <div className="rounded-xl w-full">
                        <div className="w-full flex justify-center">
                          <img src={blog.imageurl} alt="Blog Image" className="w-11/12 h-96 rounded-xl shadow-lg" />
                        </div>
                        <div className="p-5 flex-col text-center">
                          <p className="font-bold mb-2">{blog.category}, {blog.subCategory} - <span className="text-gray-600">{blog.date}</span></p>
                          <h2 className="font-bold text-xl mb-2">{blog.title}</h2>
                          <h2 className="text-gray-700 mb-2 overflow-hidden">{blog.introduction}</h2>
                          <div className="flex flex-col items-center">
                            <div>
                              <img src={latestBlog.imageurl} className="rounded-full mr-3 w-14 h-14" alt="User Image" />
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

            <h1 className="text-3xl md:text-7xl mt-16 font-bold flex justify-center">Most Popular Posts</h1>

            <div className="w-full mt-10 grid md:grid-cols-3">
              {blogposts.slice(3, 6).map((blog) => (
                <section className="p-5 w-full mt-4 rounded-lg">
                  <div className="">
                    <Link href={`/blogs/${blog._id}`} className=" flex justify-center">
                      <img src={blog.imageurl} className="w-11/12 rounded-lg" />
                    </Link>
                  </div>
                  <div className="w-full flex justify-center">
                    <Link href={`/blogs/${blog._id}`} >
                      <div>
                        <p className="font-bold mt-4 text-gray-600">{blog.category}{blog.subCategory}-{blog.date}</p>
                        <h1 className="text-3xl mt-4 font-bold">{blog.title}</h1>
                        <p className="mt-4">{blog.introduction}</p>
                      </div>

                      <div className="w-full flex items-center mt-4">
                        <div className="mr-4">
                          <img src={blog.imageurl} className="w-14 h-14 rounded-full" />
                        </div>
                        <div>
                          <p>{blog.author}</p>
                          <p>CEO & Founder</p>
                        </div>
                      </div>
                    </Link>
                  </div>

                </section>
              ))}
            </div>

            <div className="flex justify-center items-center w-full">
              <button onClick={handlePrevPage} className="w-32 m-6  bg-black hover:bg-gray-700 p-2 transition-all rounded-lg text-white font-bold">Previous</button>
              <h1 className="font-bold">{page}</h1>
              <button onClick={handleNextPage} className="w-32 m-6 bg-black hover:bg-gray-700 transition-all p-2 rounded-lg text-white font-bold">Next</button>
            </div>

            {/* <div className="w-full mt-10 flex justify-around items-start p-4">
              <div className="w-4/12 flex-col justify-center items-center">
                {blogposts.slice(0, 3).map((blog) => (
                  <section className="flex p-5">
                    <div>
                      <img src={blog.imageurl} className="w-52 h-52 rounded-2xl" />
                    </div>
                    <div className="ml-5">
                      <p className="font-bold text-gray-700">{blog.category}, {blog.subCategory} - {blog.date}</p>
                      <h1 className="text-3xl font-bold">{blog.title}</h1>
                      <div>
                        <div>
                          <img src={blog.imageurl} className="w-16 h-16 rounded-full" />
                        </div>
                        <div>
                          <h1 className="font-bold text-xl">{blog.author}</h1>
                          <p className="font-bold text-gray-700">{blog.date}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>


              <div className="w-4/12 flex-col justify-center items-center">
                {blogposts.slice(3, 6).map((blog) => (
                  <section className="flex p-5">
                    <div>
                      <img src={blog.imageurl} className="w-52 h-52 rounded-2xl" />
                    </div>
                    <div className="ml-5">
                      <p className="font-bold text-gray-700">{blog.category}, {blog.subCategory} - {blog.date}</p>
                      <h1 className="text-3xl font-bold">{blog.title}</h1>
                      <div>
                        <div>
                          <img src={blog.imageurl} className="w-16 h-16 rounded-full" />
                        </div>
                        <div>
                          <h1 className="font-bold text-xl">{blog.author}</h1>
                          <p className="font-bold text-gray-700">{blog.date}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div> */}

          </>
        )}
      </div>
    </section>
  );
}
