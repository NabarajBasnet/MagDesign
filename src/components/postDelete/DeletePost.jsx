import { useState } from "react";

const DeletePost = (props) => {
    const blogId = props.id;    // Blog post id
    const [postDeleted, setPostDeleted] = useState(false);      // state for showing a popup message when post deleted

    const handleDeletePost = async (e) =>       // Function for requesting delete method to delete the post  
    {
        e.preventDefault();
        try {
            const req = await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
                method: 'DELETE',
            })


            if (req.ok) {
                setTimeout(() => {
                    setPostDeleted(false);
                }, 2000);
                setPostDeleted(true);
            }
        }
        catch (error) {
            alert(error)
        }

    }


    return (
        <>
            <div>
                {postDeleted ? (
                    <h1>Post Deleted !</h1>
                ) : (
                    ''
                )}
                <button onClick={(e) => handleDeletePost(e)} className="bg-red-600 text-white p-1 w-28 font-bold rounded-md lg:h-12 lg:p-0 hover:scale-105 transition-all hover:shadow-lg ">
                    Delete
                </button>
            </div>
        </>
    )
}



export default DeletePost;