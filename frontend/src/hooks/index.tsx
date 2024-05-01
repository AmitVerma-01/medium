import axios from "axios";
import { useEffect, useState } from "react";
interface BlogProps {
  title: string;
  content: string;
  author: { name: string };
  id: string;
}
const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        console.log(res.data.blogs);
        setLoading(false);
      });
  }, []);
  return { loading, blogs };
};

export default useBlogs;
