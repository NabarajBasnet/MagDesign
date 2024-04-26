'use client'

import { useState, useEffect } from "react";



const AllPosts = () => 
{
    const [blogpostsadmin, setBlogPostsAdmin] = useState([]);

    const getAllPostsAdmin = async () => {
        const req = await fetch('http://localhost:3000/api/blogs');
        const res = await req.json();
        setBlogPostsAdmin(res.result);
    };

    useEffect(() => {
        getAllPostsAdmin()
    }, []);
    console.log(blogpostsadmin)


    return (
        <>
            <div>
                <div>
                    {blogpostsadmin.length > 1 ?(
                        <>
                        {blogpostsadmin.map((blog)=>
                    {
                        <>

                        </>
                    })}
                        </>
                    ):(
                        <>
                        <h1>Loading...</h1>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default AllPosts;