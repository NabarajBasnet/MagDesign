'use client'


import { useState } from "react";

const CreateBlogs = () => {
    const [title, setTitle] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [bodycontent, setBodyContent] = useState('')
    const [image, setImage] = useState('')
    const [links, setLinks] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')
    const [mentionedpeoples, setMentionedPoples] = useState('')
    const [imageurl, setImageUrl] = useState('');
    const [imagewidth, setImageWidth] = useState(0)
    const [imageheight, setImageHeight] = useState(0)
    const [postcreated, setPostCreated] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)

    const blogPostObj = {
        title, introduction, category, subCategory, bodycontent, links, author, date, mentionedpeoples, imageurl, imagewidth, imageheight
    }


    const clearFields = () => {
        setTitle(''), setIntroduction(''), setCategory(""), setSubCategory(''), setBodyContent(''), setImage(''), setLinks(''), setAuthor(''), setDate(''), setMentionedPoples('')
    }

    const CreateBlogPost = async (e) => {
        e.preventDefault()
        try {
            const req = await fetch('http://localhost:3000/api/blogs', {
                method: "POST",
                body: JSON.stringify({
                    title, introduction, category, subCategory, bodycontent, links, author, date, mentionedpeoples, imageurl, imagewidth, imageheight
                })
            });

            if (req.ok) {
                setPostCreated(true);
                // Clear fields after successfull request
                setTimeout(() => {
                    setPostCreated(false)
                    clearFields()
                }, 1500)
            }
        }
        catch (error) {
            alert(error)
        }
    }

    // Post Image to cloudinary and return image url
    let cloud_object = {
        CLOUD_NAME: 'dhur2ubp8',
        API_KEY: '414511992419123',
        API_SECRET: 'oigXwOx-X-ziEtvbMDo55k2QGnY',
        API_ENV: 'CLOUDINARY_URL=cloudinary://414511992419123:oigXwOx-X-ziEtvbMDo55k2QGnY@dhur2ubp8'
    };

    const handleUploadImage = async (type) => {
        const data = new FormData();
        data.append('file', type === 'image' ? image : null);
        data.append('upload_preset', type === 'image' ? 'ifps_preset' : 'ifps_preset');
        // Resource Type
        const resourceType = type === 'image' ? 'image' : null;
        const req = await fetch(`https://api.cloudinary.com/v1_1/${cloud_object.CLOUD_NAME}/${resourceType}/upload`, {
            method: "POST",
            body: data
        })

        const result = await req.json();
        setImageUrl(result.secure_url)
        setImageWidth(result.width)
        setImageHeight(result.height)
    }

    const mainImageUploader = (e) => {
        e.preventDefault();
        handleUploadImage('image')
    }


    return (
        <>
            <div>
                <div className="w-full">
                    <div className="w-full ">
                        <form className="flex flex-col w-full items-center mt-3 justify-center p-5">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Title..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />

                            <div className=" md:w-full lg:w-1/2 sm:w-full mt-2 flex flex-row items-center justify-between border p-1 rounded-lg border-gray-400">
                                <input
                                    type="file"
                                    onChange={(e) => setImage(e.target.files?.[0])}
                                    name="file"
                                    className="w-full outline-none border-none"
                                />
                                <button onClick={(e) => mainImageUploader(e)} className="bg-green-500 w-44 h-10 text-white font-bold rounded-lg">Upload Image</button>
                            </div>



                            <input
                                value={introduction}
                                onChange={(e) => setIntroduction(e.target.value)}
                                type="text"
                                placeholder="Introduction..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />
                            <input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                placeholder="Category..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />
                            <input
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                type="text"
                                placeholder="Sub Category..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />
                            <input
                                value={bodycontent}
                                onChange={(e) => setBodyContent(e.target.value)}
                                type="text"
                                placeholder="Body..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />
                            <input
                                value={links}
                                onChange={(e) => setLinks(e.target.value)}
                                type="text"
                                placeholder="Links..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />
                            <input
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                type="text"
                                placeholder="Author..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />
                            <input
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                type="date"
                                placeholder="Date..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />
                            <input
                                value={mentionedpeoples}
                                onChange={(e) => setMentionedPoples(e.target.value)}
                                type="text"
                                placeholder="Mention Peoples..."
                                className="outline-none border mt-2 rounded-lg p-3 md:w-full sm:w-full lg:w-1/2 border-gray-400 placeholder:text-gray-600"
                            />

                            <button
                                onClick={(e) => CreateBlogPost(e)}
                                className="outline-none border bg-green-500 text-white font-bold rounded-lg mt-10 p-2 lg:w-1/5 sm:w-32 md:w-40"
                            >
                                Create Blog
                            </button>

                            {postcreated ? (
                                <h1 className="mt-2 text-gray-700">Post creating please wait...</h1>
                            ) : (
                                ''
                            )}
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateBlogs;

