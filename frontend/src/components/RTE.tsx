import { CreateBlogInput } from "@techamit/medium-common";
import { ChangeEvent, useState } from "react";

import QuillEditor from "./TinyMCE";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const RTE = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState<CreateBlogInput>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const handleEditorChange = (newContent: string) => {
    setBlog({ ...blog, content: newContent });
  };

  const handlePublish = async () => {
    setLoading(true);
    setBlog(blog);
    try {
      if (!blog.title || !blog.content) {
        console.log(blog);
        setLoading(false);
        toast.error("Please fill all the fields");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/post`,
        blog,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      toast.success("Blog published successfully");
      setLoading(false);
      navigate(`/blog/${res.data.blogId}`);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-5 lg:p-10">
      <ToastContainer />
      <div>
        <label htmlFor={"title"} className="text-xl font-bold">
          Title :{" "}
        </label>
        <input
          type="text"
          id="title"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBlog({ ...blog, title: e.target.value })
          }
          className="outline-none bg-gray-200 w-1/2 lg:h-[7vh] rounded p-2 text-xl font-bold"
        />{" "}
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handlePublish}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
      <div>
        <h1 className="text-xl font-bold">Content : </h1>
        <QuillEditor initialValue={""} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default RTE;
