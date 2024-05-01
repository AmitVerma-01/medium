import { useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Quote from "../components/Quote";
import { SingupInput } from "@techamit/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isloggedIn = localStorage.getItem("token") ? true : false;
    !isloggedIn ? null : navigate("/");
  });
  const [signupInput, setSignupInput] = useState<SingupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  console.log(signupInput);
  const sendRes = () => {
    setLoading(true);
    try {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
          signupInput,
        )
        .then((res) => {
          localStorage.setItem("token", res.data.Token);
          localStorage.setItem("name", res.data.name);
          toast.success("SignIn successful");
          console.log(res.data.Token);
          navigate("/");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Invalid Credentials");
          console.log(err);
        });
    } catch (err) {
      setLoading(false);
      toast.error("Invalid Credentials");
      console.log(err);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col bg-gray-100 justify-center items-center h-screen">
        <div className="w-3/4 h-3/4 flex flex-col lg:bg-gray-100 rounded justify-center items-center lg:shadow">
          <div className="min-w-[300px]">
            <Heading type="signup" />
            <InputBox
              label="Name"
              placeholder="Enter your name..."
              onChange={(e) => {
                setSignupInput({
                  ...signupInput,
                  name: e.target.value.trim().toLowerCase(),
                });
              }}
            />
            <InputBox
              label="Email"
              placeholder="Enter your email..."
              onChange={(e) => {
                setSignupInput({
                  ...signupInput,
                  email: e.target.value.trim().toLowerCase(),
                });
              }}
            />
            <InputBox
              label="Password"
              type="password"
              placeholder="Password..."
              onChange={(e) => {
                setSignupInput({
                  ...signupInput,
                  password: e.target.value.trim(),
                });
              }}
            />
            <div className="mt-5">
              <Button
                disabled={loading}
                label={loading ? "Signing Up..." : "Sign Up"}
                onClick={sendRes}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
