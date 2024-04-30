'use client'

import { useState } from "react";


const DeletePost = (props) => 
{
    const postId = props.id;
    console.log('Post Id: ', postId);
    const [postDeleted, setPostDeleted] = useState(false);

    const deletePost = async (e) => {
        try {
            const req = await fetch(`http://localhost:3000/api/blogs/${postId}`, {
                method: "DELETE",
            })
            if (req.ok) {
                setTimeout(() => {
                    setPostDeleted(false);
                }, 2000);
                setPostDeleted(true);
            }
        }
        catch (error) {
            alert('Error ', error)
        }
    }

    return (
        <>
            <div>
                <button onClick={deletePost} className="bg-red-600 p-1 border-none rounded-md w-28 hover:shadow-md h-10 hover:scale-105 transition-all text-white font-bold">Delete</button>
                {postDeleted ? (
                    <>
                        <h1>Post Deleted!</h1>
                    </>
                ) : (
                    ''
                )}
            </div>
        </>
    )
}

export default DeletePost;