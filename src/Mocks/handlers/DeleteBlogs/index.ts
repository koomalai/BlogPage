import { HttpResponse, http } from "msw"

export const deleteBlogHandler =
http.delete(`/api/deleteBlog/:id`, async({ params }) => {
    if(params.id){
        console.log(`${params.id}`);
        return HttpResponse.json(`${params.id}`)
    }
});