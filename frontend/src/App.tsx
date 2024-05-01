import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// App.jsx
// Lazy load your route
const LazySignin = lazy(() => import("./pages/Signin"));
const LazyBlogs = lazy(() => import("./pages/Blogs"));
const LazySignup = lazy(() => import("./pages/Signup"));
const LazyFullBlog = lazy(() => import("./components/FullBlog"));
const LazyBlogWrite = lazy(() => import("./components/RTE"));

function App() {
  return (
    <BrowserRouter>
      <div className="sticky bg-white top-0">
        <Navbar />
      </div>
      <Routes>
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazySignup />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazySignin />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyBlogs />
            </Suspense>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyFullBlog />
            </Suspense>
          }
        />
        <Route
          path="/createBlog"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyBlogWrite />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
