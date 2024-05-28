import { useMutation } from "react-query";
import { AddBlogs } from "../../Pages/AddOrCreateBlog/Types/AddBlogs";

const addBlog = async (values: AddBlogs): Promise<AddBlogs | null> => {
  let id = values?.id;
  id = Math.floor(Math.random() * 1000000);

  const data = JSON.stringify(
    {
      "id": id,
      "BlogTitle": values?.BlogTitle,
      "BlogDescription": values?.BlogDescription
    }
  );
  const response = await fetch('/api/addBlog', {
    method: 'POST',
    body: data,
    headers: { "Content-Type": "application/json", "Accept": "application/json", "Access-Cross-Allow-Origin": "*" }
  });

  return response.json();
};

export function useAddBlog() {
  const { isLoading, mutateAsync } = useMutation(addBlog);
  return { isAddingBlog: isLoading, addBlogs: mutateAsync };
}
