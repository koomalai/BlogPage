import { Route, Routes } from "react-router-dom";
import AddBlogForm from "../Pages/AddOrCreateBlog/AddBlogForm";
import BlogsGrids from "../Pages/Homepage/BlogsGrids";

function AppRouters(){
    return(
        <Routes>
            <Route path="/addBlogs" element={<AddBlogForm/>}/>
            <Route path="/" element={<BlogsGrids/>}/>
        </Routes>
    )
}
export default AppRouters;