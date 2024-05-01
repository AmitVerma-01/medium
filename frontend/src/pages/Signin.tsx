import { useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Quote from "../components/Quote";
import { SigninInput } from "@techamit/medium-common";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isloggedIn = localStorage.getItem("token") ? true : false;
    !isloggedIn ? null : navigate("/");
  });
  const [signinInput, setSigninInput] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const sendRes = () => {
    setLoading(true);
    try {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,
          signinInput,
        )
        .then((res) => {
          localStorage.setItem("token", res.data.Token);
          localStorage.setItem("name", res.data.name);
          toast.success("SignIn successful");
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          toast.error("Invalid credentials");
          setLoading(false);
          console.log(err);
        });
    } catch (err) {
      toast.error("Invalid credentials");
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col bg-gray-100 justify-center items-center h-screen">
        <div className="w-3/4 h-3/4 flex flex-col lg:bg-gray-100 rounded justify-center items-center lg:shadow">
          <div className="min-w-[300px]">
            <Heading type="signin" />
            <InputBox
              label="Email"
              placeholder="Enter your email..."
              onChange={(e) => {
                setSigninInput({
                  ...signinInput,
                  email: e.target.value.trim().toLowerCase(),
                });
              }}
            />
            <InputBox
              type="password"
              label="Password"
              placeholder="Password..."
              onChange={(e) => {
                setSigninInput({
                  ...signinInput,
                  password: e.target.value,
                });
              }}
            />
            <div className="mt-5">
              <Button
                label={loading ? "Signining in..." : "Sign In"}
                onClick={sendRes}
                disabled={loading}
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

export default Signin;
