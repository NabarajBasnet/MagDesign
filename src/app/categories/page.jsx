// 'use client'


// import React, { useState } from "react";

// const MyComponent = () => {
//   const [items] = useState([]); // Your array of objects
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   // Function to get the current page of items
//   const getCurrentPageItems = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return items.slice(startIndex, endIndex);
//   };

//   // Function to handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div>
//       {/* Display current page items */}
//       {getCurrentPageItems().map((item, index) => (
//         <div key={index}>
//           {/* Render your item here */}
//           <p>{item.name}</p>
//         </div>
//       ))}

//       {/* Pagination controls */}
//       <div>
//         {/* Previous page button */}
//         <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//           Previous
//         </button>

//         {/* Page numbers */}
//         {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
//           <button key={i + 1} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
//             {i + 1}
//           </button>
//         ))}

//         {/* Next page button */}
//         <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyComponent;



'use client'

import { useEffect, useState } from "react";

const Categories = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(3)
    const blogsLength = blogs.length;
    console.log('Length: ', blogsLength)
    const numberOfPages = blogsLength / postsPerPage
    console.log('Start index: ', startIndex);
    console.log('End index: ', endIndex);

    const getAllBlogs = async () => {
        try {
            const req = await fetch('http://localhost:3000/api/blogs');
            const res = await req.json();
            setBlogs(res.result);
        }
        catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllBlogs()
    }, []);

    // Handle Previous Page
    const handlePrevPage = () => {

        if (startIndex <= 0) {
            setStartIndex(0)
            setCurrentPage(1)
            throw new Error('No more previous pages')
        }
        else {
            setStartIndex(startIndex - 3)
            setCurrentPage(currentPage - 1)
            setEndIndex(endIndex - 3)

        }
    }

    const handleNextPage = () => {
        if (endIndex > blogsLength) {
            setStartIndex(blogsLength - 1)
            setEndIndex(10);
            setCurrentPage(blogsLength / 3);
            throw new Error('No more pages')
        }
        else {
            setStartIndex(startIndex + 3)
            setCurrentPage(currentPage + 1)
            setEndIndex(endIndex + 3)
        }

    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1>Categories</h1>
                <div>
                    {blogs.length >= 1 ? (
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-4">
                            {blogs.slice(startIndex, endIndex).map((blog) => (
                                <div key={blog._id} className="flex flex-col items-center m-6">
                                    <h1 className="text-xl font-bold">{blog.title}</h1>
                                    <img src={blog.imageurl} className="w-80 h-96" />
                                </div>
                            ))}
                        </div>
                    ) : ('')}

                </div>
                <div className="flex flex-row items-center">
                    <button onClick={handlePrevPage} className="bg-green-500 p-2 hover:scale-105 transition-all m-3 w-32 rounded-lg text-white font-bold">Prev</button>
                    <p>{currentPage}</p>
                    <button onClick={handleNextPage} className="bg-blue-500 p-2 hover:scale-105 transition-all m-3 w-32 rounded-lg text-white font-bold">Next</button>
                </div>
            </div>
        </>
    )
}


export default Categories;