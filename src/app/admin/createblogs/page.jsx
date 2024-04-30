'use client'

import { useState } from "react";

const CreateBlogs = () => {
    const [title, setTitle] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [bodycontent, setBodyContent] = useState('')
    // const [graphics, setGraphics] = useState('')
    const [links, setLinks] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')
    const [mentionedpeoples, setMentionedPoples] = useState('')

    const [postcreated, setPostCreated] = useState(false)


    const clearFields = () => {
        setTitle(''),
            setIntroduction(''),
            setCategory(""),
            setSubCategory(''),
            setBodyContent(''),
            // setGraphics(''),
            setLinks(''),
            setAuthor(''),
            setDate(''),
            setMentionedPoples('')
    }

    const CreateBlogPost = async (e) => {
        e.preventDefault()
        const req = await fetch('http://localhost:3000/api/blogs', {
            method: "POST",
            body: JSON.stringify({
                title, introduction, category, subCategory, bodycontent, links, author, date, mentionedpeoples
            })
        });

        setTimeout(() => {
            setPostCreated(false)
        }, 1500)
        setPostCreated(req.ok)

        clearFields()
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
                                className="outline-none border bg-green-400 text-black font-bold rounded-lg mt-10 p-2 lg:w-1/5 sm:w-32 md:w-40"
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

