import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    title: String,
    introduction: String,
    category: String,
    subCategory: String,
    bodycontent: String,
    links: String,
    author: String,
    date: String,
    mentionedpeoples: String,
    imageurl: String,
    imagewidth: Number,
    imageheight: Number
});

const BlogPost = mongoose.models.magdesignposts || mongoose.model('magdesignposts', BlogPostSchema);
export default BlogPost;
