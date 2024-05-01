import { Link } from "react-router-dom";

const Heading = ({ type }: { type: string }) => {
  return (
    <div>
      <div className="text-4xl font-bold py-3 text-center w-full">
        {type === "signin" ? "Sign In" : "Sign Up"}
      </div>
      <div className="text-gray-500 py-1 text-center">
        {type === "signin"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          to={type === "signin" ? "/signup" : "/signin"}
          className="underline"
        >
          {type === "signin" ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    </div>
  );
};

export default Heading;
