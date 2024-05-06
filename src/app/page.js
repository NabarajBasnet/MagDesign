'use client'


import Link from "next/link";
import { useState, useEffect } from "react";


export default function Home() {

  const [blogposts, setBlogPosts] = useState([]);
  const [limitedBlogs, setLimitedBlogs] = useState([]);
  const latestBlog = blogposts[blogposts.length - 1];
  const [paginaatedBlogs, setPaginatedBlogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  // Paginate function to slice the blogs posts array based on the current page
  const paginate = (blogposts, pageNumber) => {
    const startIndex = (pageNumber - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const toPaginateBlogs = blogposts.slice(startIndex, endIndex);
    setPaginatedBlogs(toPaginateBlogs);
  };


  //  Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginate(blogposts, pageNumber);
  }

  const fetchAllBlogPosts = async () => {
    try {
      const req = await fetch('http://localhost:3000/api/blogs');
      const res = await req.json();
      const limitedNoBlogs = res.result.slice(2, 5);
      setLimitedBlogs(limitedNoBlogs);
      setBlogPosts(res.result);
      paginate(res.result, currentPage);

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
          <h1 className="text-7xl font-bold">Latest</h1>
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
                    <h1 className="text-6xl font-bold mt-2">{latestBlog.title}</h1>
                    <p className="text-gray-500  mt-5">{latestBlog.introduction}</p>

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
                {limitedBlogs && (
                  <div className="grid lg:grid-cols-3 p-6 md:grid-cols-2 sm:grid-cols-1 w-full">
                    {limitedBlogs.map((blog, _id) => (
                      <Link href={`/blogs/${blog._id}`} key={_id} className="p-5 h-2/3">
                        <div className="flex flex-col items-center border m-4 rounded-xl shadow-2xl w-full h-full overflow-hidden p-4">
                          <div className="w-full h-96 overflow-hidden">
                            <img src={blog.imageurl} alt="Blog Image" className="w-full h-full object-cover rounded-t-xl shadow-2xl" />
                          </div>
                          <div className="p-5 flex flex-col h-full"> {/* Set fixed size for the content container */}
                            <p className="font-bold mb-2">{blog.category}, {blog.subCategory} - <span className="text-gray-600">{blog.date}</span></p>
                            <h2 className="font-bold text-3xl mb-2">{blog.title}</h2>
                            <h2 className="text-gray-600 mb-2 overflow-hidden">{blog.introduction}</h2>
                            <div className="flex flex-row items-center ">
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

              <div>
                <div className="flex w-full">
                  <div className="flex flex-col w-full justify-center items-center mt-14">
                    <h1 className="text-5xl font-bold">Most Popular Posts</h1>
                    {latestBlog && (
                      <>


                        <div className="flex flex-row w-full">
                          {paginaatedBlogs && (
                            <div className="grid lg:grid-cols-3 p-6 md:grid-cols-2 sm:grid-cols-1 w-full">
                              {paginaatedBlogs.map((blog, _id) => (
                                <Link href={`/blogs/${blog._id}`} key={_id} className="p-5 h-2/3">
                                  <div className="flex flex-col items-center border m-4 rounded-xl shadow-2xl w-full h-full overflow-hidden p-4">
                                    <div className="w-full h-80 overflow-hidden">
                                      <img src={blog.imageurl} alt="Blog Image" className="w-full h-full object-cover rounded-t-xl shadow-2xl" />
                                    </div>
                                    <div className="p-5 flex flex-col h-full">
                                      <p className="font-bold mb-2">{blog.category}, {blog.subCategory} - <span className="text-gray-600">{blog.date}</span></p>
                                      <h2 className="font-bold text-3xl mb-2">{blog.title}</h2>
                                      <h2 className=" text-gray-600 mb-2 overflow-hidden">{blog.introduction}</h2>
                                      <div className="flex flex-row items-center ">
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
                        <div className="flex items-center justify-center">
                          {[...Array(Math.ceil(blogposts.length / postsPerPage)).keys()].map((number) => (
                            <button key={number + 1} onClick={() => handlePageChange(number + 1)} className="mx-1 px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none">
                              {number + 1}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>


            </>
          )}
        </div>
      </div>
    </>
  );
}
