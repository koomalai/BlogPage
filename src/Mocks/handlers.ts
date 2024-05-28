import { createBlogHandler } from "./handlers/CreateBlog";
import { deleteBlogHandler } from "./handlers/DeleteBlogs";

export const handlers=[
    createBlogHandler,
    deleteBlogHandler
]