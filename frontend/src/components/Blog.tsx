import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface BlogProps {
  authorName: string;
  publishDate: string;
  title: string;
  content: string;
}

const Blog = ({ title, authorName, publishDate, content }: BlogProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isloggedIn = localStorage.getItem("token") ? true : false;
    isloggedIn ? null : navigate("/signin");
  });
  return (
    <div className="border-b space-y-2 m-2 py-2 ">
      <div className="flex space-x-2 items-center">
        <p className="w-5 h-5 bg-gray-200 rounded-full flex text-sm justify-center items-center">
          {authorName.charAt(0).toUpperCase()}
        </p>
        <h1>{authorName.charAt(0).toUpperCase() + authorName.slice(1)}</h1>
        <div className="flex flex-col justify-center">
          <div className="w-1 h-1  bg-gray-400 rounded-full "></div>
        </div>

        <p className="text-gray-600 text-sm/3">{publishDate}</p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm md:text-lg lg:text-xl xl:text-3xl font-bold">
            {title}
          </h1>
          <div
            className="text-sm lg:text-md xl:text-md text-gray-700 hidden md:block"
            dangerouslySetInnerHTML={{
              __html: content.substring(0, 100) + "...",
            }}
          ></div>
        </div>
        <div className="min-w-24 h-24 flex justify-center items-center ml-3 bg-gray-700">
          img
        </div>
      </div>
      <div className="text-gray-500 text-sm mt-3">
        {Math.ceil(content.length / 500)} min(s) read
      </div>
    </div>
  );
};

export default Blog;
