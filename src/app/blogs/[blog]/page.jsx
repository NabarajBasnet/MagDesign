'use client'

import { useEffect, useState } from "react";



const Blog = (props) => 
{
    const [blog, setBlog] = useState([])
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



    console.log('Blog: ',blog)
    console.log('Image URL: ',imageurl)

    const blogId = props.params.blog;

    const getSingleBlogDetails = async () => {
        const req = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
        const res = await req.json();
        console.log('Response: ', res.result);
        setImageUrl(res.result[0].imageurl)
        
    }



    useEffect(() => {
        getSingleBlogDetails()
    }, []);

    return (
        <>
        <p>{title}</p>
        <img src={blog.imageurl} alt="Blog Image"/>
        </>
    )
}

export default Blog;