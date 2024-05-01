import { Link, useNavigate } from "react-router-dom";
import Blog from "../components/Blog";
import Quote from "../components/Quote";
import useBlogs from "../hooks";
import ContentLoader from "react-content-loader";
import { useEffect } from "react";

const Blogs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isloggedIn = localStorage.getItem("token") ? true : false;
    isloggedIn ? null : navigate("/signin");
  });
  const { blogs, loading } = useBlogs();
  console.log(blogs);
  if (loading)
    return (
      <div className="mx-auto w-screen ">
        <div className="px-5 md:px-14 ">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <MyLoader key={i} />
          ))}
        </div>
      </div>
    );
  return (
    <div>
      <div className="sticky bg-white top-0">{/*<Navbar />*/}</div>
      <div className="w-screen h-screen ">
        <div className="px-5 md:px-14 md:w-3/4 lg:w-3/5 xl:w-1/2 mx-auto">
          {blogs.map((blog) => (
            <Link to={"/blog/" + blog.id} key={blog.id}>
              <Blog
                title={blog.title}
                content={blog.content}
                authorName={blog.author.name}
                publishDate="March 29, 2024"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);
