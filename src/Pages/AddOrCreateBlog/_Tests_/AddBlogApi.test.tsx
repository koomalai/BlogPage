import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../../App";
import { server } from "../../../Mocks/server";
import { HttpResponse, http } from "msw";

describe("Add Blog Api", ()=>{
    beforeEach(() => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        ); 
    });
    it("Should navigate to Add blogs page when Add Blog tab is clicked", async() => {
        expect(screen.getByRole('tab', { name: /Add Blog/i })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('tab', { name: /Add Blog/i }));
        expect(global.window.location.pathname).toBe('/addBlogs');
    });
    it('should call handleAddBlog with server not good on form submit', async () => {
        server.use(
            http.post('/api/addBlog', () => {
                return HttpResponse.error()
            }),
        );
        fireEvent.change(getBlogTitle(), { target: { value: 'koo@gmail.com' } });
        fireEvent.change(getBlogDescription(), { target: { value: 'Kal1304*' } });

        expect(getAddBlogButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getAddBlogButton());
        });
        expect(screen.getByRole('alert')).toHaveTextContent('Cannot add blog');
        expect(global.window.location.pathname).toBe('/addBlogs');
    });
    it('should call handleAddBlog with correct parameters on form submit and direct to blog page', async () => {
        fireEvent.change(getBlogTitle(), { target: { value: 'My Science Blog' } });
        fireEvent.change(getBlogDescription(), { target: { value: 'Science is interesting' } });

        expect(getAddBlogButton()).not.toBeDisabled();
        await waitFor(()=>{
            fireEvent.click(getAddBlogButton());
        });
        expect(global.window.location.pathname).toBe('/');
        expect(screen.getByRole('alert')).toHaveTextContent('Blog added successfully');
    });
});

function getBlogTitle() {
    return screen.getByTestId<HTMLInputElement>(/blog-title/i);
}
function getBlogDescription() {
    return screen.getByTestId<HTMLInputElement>(/blog-description/i) ;
}
function getAddBlogButton() {
    return screen.getByRole("button", { name: /Add Blog/i });
}
 