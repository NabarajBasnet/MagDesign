'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(6); // Number of blogs to display per page
    const nabaraj = Number(10)
    const searchedQueryWord = useSelector(state => state.searchedQueryWord);

    const getAllBlogs = async () => {
        try {
            // const req = await fetch(`http://localhost:3000/api/blogs/?page=${1}&limit=${3}`);
            const req = await fetch(`http://localhost:3000/api/blogs/?nabaraj=${nabaraj}&`);
            console.log(req);
            const res = await req.json();
            setBlogs(res.result);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    // Logic for displaying blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs
        .filter(blog => searchedQueryWord === '' || blog.title.toLowerCase().includes(searchedQueryWord.toLowerCase()))
        .slice(indexOfFirstBlog, indexOfLastBlog);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="w-full">
            <div className="flex justify-center items-center w-full">
                {currentBlogs.length >= 1 ? (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 items-center justify-center w-full">
                        {currentBlogs.map((blog) => (
                            <div className="flex flex-col shadow-lg hover:scale-105 hover:transition-all transition-all hover:shadow-2xl rounded-xl m-5 p-4 items-center justify-center mt-5" key={blog._id}>
                                <Link href={`/blogs/${blog._id}`} key={blog._id}>
                                    <div>
                                        <img src={blog.imageurl} className="w-80 h-52 rounded-lg" alt="Blog Image" />
                                    </div>
                                    <div className="p-5">
                                        <p> <span className="text-gray-600 font-bold mt-5 text-lg">{blog.category}, </span> <span className="text-gray-600 font-bold text-lg">{blog.subCategory} </span>- <span className="text-gray-500 font-bold text-lg">{blog.date} </span></p>
                                        <h1 className="text-2xl font-bold mt-5 ">{blog.title}</h1>
                                        <p className="mt-5 text-gray-500">{blog.introduction}</p>
                                    </div>
                                    <div className="flex flex-row justify-center mt-4 items-center">
                                        <div className="mr-4">
                                            <img src={blog.imageurl} className="w-16 h-16 shadow-lg rounded-full" alt="User Image" />
                                        </div>
                                        <div>
                                            <h1 className="text-gray-500 font-bold">{blog.author}</h1>
                                            <p>CEO & Founder</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : ('')}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-5">
                <ul className="flex">
                    {[...Array(Math.ceil(blogs.length / blogsPerPage)).keys()].map(number => (
                        <li key={number} className="cursor-pointer hover:bg-gray-200 px-3 py-1 m-1" onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Blogs;
