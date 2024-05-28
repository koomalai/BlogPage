import { http, HttpResponse } from 'msw'

export const blogs = JSON.parse(localStorage.getItem("blogs")||"[]");

export const createBlogHandler =
http.post('/api/addBlog', async({request}) => {
    let data = await request.json();
    
    blogs.push(data);
    localStorage.setItem("blogs",JSON.stringify(blogs));
    
    return HttpResponse.json(
       true,
       {
        status: 200, 
         headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"}
        }
    );
});