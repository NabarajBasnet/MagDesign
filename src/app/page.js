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
      const limitedNoBlogs = res.result.slice(0, 3);
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
    <section className="mx-auto px-4">
      <div className="w-full">
        {latestBlog && (
          <>
            <h1 className="text-3xl flex justify-center font-bold">Latest</h1>
            <div className="w-full md:flex items-center py-10 justify-between">
              <div className="w-full bg-black md:w-5/12 h-full rounded-xl">
                <Link href={`blogs/${latestBlog._id}`}>
                  <img src={latestBlog.imageurl} className="rounded-md shadow-2xl w-full" />
                </Link>
              </div>
              <div className="md:w-6/12 h-full rounded-xl p-4 ">
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
                <div className="grid md:grid-cols-2 p-6 w-full">
                  {blogposts.slice(0,3).map((blog, _id) => (
                    <Link href={`/blogs/${blog._id}`} key={_id} className="p-5 h-2/3">
                      <div className="items-center border rounded-xl shadow-2xl w-full">
                        <div className="w-full">
                          <img src={blog.imageurl} alt="Blog Image" className="w-full object-cover rounded-t-xl shadow-2xl" />
                        </div>
                        <div className="p-5">
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

            <div className="w-full">
              <h1 className="text-3xl font-bold">Most Popular Posts</h1>
              {blogposts.slice(0, 3).map((blog) => (
                <section className="grid md:grid-cols-3 border mt-4 p-4 rounded-lg shadow-xl">
                  <div className="w-full flex justify-center">
                    <Link href={`/blogs/${blog._id}`} className="w-full flex justify-center">
                      <img src={blog.imageurl} className="rounded-lg w-full" />
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

          </>
        )}
      </div>
    </section>
  );
}
