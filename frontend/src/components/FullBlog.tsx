import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface fullBlogProps {
  title: string;
  content: string;
  author: { name: string };
  AuthorBio?: string;
  postDate?: string;
}
const FullBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<fullBlogProps>({
    title: "",
    content: "",
    author: { name: "" },
    postDate: "",
    AuthorBio: "",
  });
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setBlog(res.data));
  }, []);
  return (
    <div className="grid grid-cols-3 p-14">
      <div className="col-span-3 lg:col-span-2 space-y-2 p-2">
        <h1 className="text-4xl font-extrabold">{blog.title}</h1>
        <p className="text-sm font-medium text-gray-400">
          {blog?.postDate || "Feb 20, 2024"}
        </p>
        <p
          className="pr-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></p>
      </div>
      <div className="lg:col-span-1 lg:block  hidden mt-10 p-4">
        <h3 className="mb-4 text-gray-600 font-medium">Author</h3>

        <div className="flex items-center">
          <div className="w-6 h-6 mr-5 min-w-5 rounded-full flex justify-center items-center bg-gray-200">
            {blog.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{blog.author.name}</h1>

            <p className="text-sm font-serif text-gray-400">
              {blog?.AuthorBio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
