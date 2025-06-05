import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="flex items-center justify-center h-screen p-8 sm:p-4 bg-linear-to-t from-sky-500 to-indigo-500">
      <div className="w-full h-max md:w-[80%] sm:w-[70%] sm:h-max lg:w-[60%] p-6 md:p-10 shadow-md bg-gray-50 rounded">
        <form
          onSubmit={onSubmit}
          className="m-5 lg:m-10 lg:ml-19 flex flex-col gap-5"
        >
          <h2 className="text-3xl font-bold mb-5">Login</h2>

          <label className="text-gray-700 text-sm font-bold ">
            Email
            <br />
            <input
              type="email"
              className="border rounded w-full md:w-[80%] py-1 px-2 font-normal mb-1"
              placeholder="Enter Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <br />
            {validationErrors.email ? (
              <span className="text-red-500 font-medium">
                {validationErrors.email}
              </span>
            ) : null}
          </label>

          <label className="text-gray-700 text-sm font-bold ">
            Password
            <br />
            <input
              type="password"
              className="border rounded w-full md:w-[80%] py-1 px-2 font-normal"
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <br />
            {validationErrors.password && (
              <span className="text-red-500 font-medium ">
                {validationErrors.password}
              </span>
            )}
          </label>

          <span className="text-xs">
            Not Registered?
            <Link to={"/register"} className="text-xs mx-2 underline">
              Create an account here
            </Link>
          </span>

          <span>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold rounded transition-transform transform hover:scale-105 duration-300 ease-in-out hover:bg-green-500"
            >
              Login
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
