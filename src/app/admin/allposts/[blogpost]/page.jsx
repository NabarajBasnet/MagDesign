'use client'

import { useEffect, useState } from "react";

const EditBlog = (props) => {
    const blogId = props.params.blogpost;

    const [title, setTitle] = useState('')
    const [image, setImage] = useState()
    const [introduction, setIntroduction] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [bodycontent, setBodyContent] = useState('')
    const [imageurl, setImageUrl] = useState('')
    const [imagewidth, setImageWidth] = useState('')
    const [imageheight, setImageHeight] = useState('')
    const [links, setLinks] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')
    const [mentionedpeoples, setMentionedPoples] = useState('')

    const [blogUpdated, setBlogUpdated] = useState(false);

    const getBlodDetails = async () => {
        try {
            const req = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
            const res = await req.json();
            if (!req.ok) {
                throw new Error("Couldn't fetch!")
            };
            setTitle(res.result[0].title);
            setIntroduction(res.result[0].introduction);
            setCategory(res.result[0].category);
            setSubCategory(res.result[0].subCategory);
            setBodyContent(res.result[0].bodycontent);
            setLinks(res.result[0].links);
            setAuthor(res.result[0].author);
            setDate(res.result[0].date);
            setMentionedPoples(res.result[0].mentionedpeoples);
            setImageUrl(res.result[0].imageurl)
            setImageWidth(res.result[0].imagewidth)
            setImageHeight(res.result[0].imageheight)
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getBlodDetails()
    }, []);

    const updateBlogDetails = async (e) => {
        e.preventDefault();
        try {
            const postReq = await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
                method: "PUT",
                body: JSON.stringify(
                    { title, introduction, category, subCategory, bodycontent, links, author, date, mentionedpeoples, imageurl, imagewidth, imageheight }
                )
            });
            if (postReq.ok) {
                setTimeout(() => {
                    setBlogUpdated(false)
                }, 2000);
                setBlogUpdated(true)
            }
            console.log('Post Request: ', postReq);
        }
        catch (error) {
            alert("Error: ", error)
        }
    }


    // Cloudinary image functions

    let cloud_object = {
        CLOUD_NAME: 'dhur2ubp8',
        API_KEY: '414511992419123',
        API_SECRET: 'oigXwOx-X-ziEtvbMDo55k2QGnY',
        API_ENV: 'CLOUDINARY_URL=cloudinary://414511992419123:oigXwOx-X-ziEtvbMDo55k2QGnY@dhur2ubp8'
    };


    const updateBlogImage = async (type) => {
        const data = new FormData();
        data.append('file', type === 'image' ? image : null);
        data.append('upload_preset', type === 'image' ? 'ifps_preset' : 'ifps_preset')

        const resourceType = type === 'image' ? 'image' : 'video'

        const req = await fetch(`https://api.cloudinary.com/v1_1/${cloud_object.CLOUD_NAME}/${resourceType}/upload`, {
            method: 'POST',
            body: data
        })
        const result = await req.json();
        window.alert('Image Changed Successfully!')
        setImageUrl(result.secure_url)
        setImageWidth(result.width)
        setImageHeight(result.height)


    }

    const mainImageUpdater = (e) => {
        e.preventDefault();
        updateBlogImage('image');
    }



    return (
        <>
            <div className="flex flex-col justify-center items-center h-full">
                {blogUpdated ? (
                    <div className="shadow-md border border-gray-500 rounded-md p-8 bg-green-200 text-blak font-bold font-sans">
                        <p>Blog Updated Successfully!</p>
                    </div>
                ) : ('')}
                <form className="lg:w-1/2 md:w-full sm:w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title:
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>


                    <div className=" md:w-full lg:w-full sm:w-full mt-2 flex flex-row items-center justify-between border p-1 rounded-lg border-gray-400">
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files?.[0])}
                            name="file"
                            className="w-full outline-none border-none"
                        />
                        <button onClick={(e) => mainImageUpdater(e)} className="bg-green-500 w-44 h-10 text-white font-bold rounded-lg">Upload Image</button>
                    </div>



                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Introduction:
                            <input value={introduction} onChange={(e) => setIntroduction(e.target.value)} type="text" placeholder="Introduction..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category:
                            <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Category..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Sub Category:
                            <input value={subCategory} onChange={(e) => setSubCategory(e.target.value)} type="text" placeholder="Sub Category..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Body Content:
                            <input value={bodycontent} onChange={(e) => setBodyContent(e.target.value)} type="text" placeholder="Body..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Links:
                            <input value={links} onChange={(e) => setLinks(e.target.value)} type="text" placeholder="Links..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Author:
                            <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date:
                            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Date..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Peoples:
                            <input value={mentionedpeoples} onChange={(e) => setMentionedPoples(e.target.value)} type="text" placeholder="Mention Peoples..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <button onClick={(e) => updateBlogDetails(e)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update Blog
                        </button>
                    </div>

                    <div className="flex flex-row justify-center mt-10">
                        <img src={imageurl} width={imagewidth / 8} height={imageheight / 8} />
                    </div>
                </form>
            </div>
        </>
    );

};

export default EditBlog;