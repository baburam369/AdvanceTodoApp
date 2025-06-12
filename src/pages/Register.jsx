import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formData.firstName === "" || formData.firstName === null) {
      errors.firstName = "First Name is Required";
    }

    if (formData.lastName === "" || formData.lastName === null) {
      errors.lastName = "Last Name is Required";
    }

    if (formData.email === "" || formData.email === null) {
      errors.email = "Email is Required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Valid Email is Required, e.g: ajax@email.com";
    }

    if (formData.password === "" || formData.password === null) {
      errors.password = "Password is Required";
    } else if (formData.password.length < 6) {
      errors.password = "Password should contain atleast 6 characters";
    }

    if (formData.password === "" || formData.cPassword !== formData.password) {
      errors.cPassword =
        "Password does not match, please re-enter correct password";
    }
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const success = await setUser(formData);
      if (success) {
        navigate("/");
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen p-8 sm:p-4 bg-linear-to-t from-sky-500 to-indigo-500">
      <div className="w-full h-max md:w-[80%] sm:w-[70%] sm:h-max lg:w-[60%] p-6 md:p-10 shadow-md bg-gray-50 rounded">
        <form
          onSubmit={handleSubmit}
          className="m-5 lg:m-10 lg:ml-19 flex flex-col gap-5"
        >
          <h2 className="text-3xl font-bold mb-5">Register</h2>
          <label className="text-gray-700 text-sm font-bold ">
            First Name
            <br />
            <input
              type="text"
              className="border rounded w-full md:w-[80%] py-1 px-2 font-normal mb-1"
              placeholder="Enter First Name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <br />
            {validationErrors.firstName ? (
              <span className="text-red-500 font-medium break-normal ">
                {validationErrors.firstName}
              </span>
            ) : null}
          </label>

          <label className="text-gray-700 text-sm font-bold ">
            Last Name
            <br />
            <input
              type="text"
              className="border rounded w-full md:w-[80%] py-1 px-2 font-normal mb-1"
              placeholder="Enter Last Name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <br />
            {validationErrors.lastName ? (
              <span className="text-red-500 font-medium ">
                {validationErrors.lastName}
              </span>
            ) : null}
          </label>

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
              className="border rounded w-full md:w-[80%] py-1 px-2 font-normal mb-1"
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
          <label className="text-gray-700 text-sm font-bold ">
            Confirm Password
            <br />
            <input
              type="password"
              className="border rounded w-full md:w-[80%] py-1 px-2 font-normal mb-1"
              placeholder="Re-enter Password"
              onChange={(e) =>
                setFormData({ ...formData, cPassword: e.target.value })
              }
            />
            <br />
            {validationErrors.cPassword && (
              <span className="text-red-500 font-medium ">
                {validationErrors.cPassword}
              </span>
            )}
          </label>

          <span className="text-xs">
            Already have an account?
            <Link to={"/login"} className="text-xs mx-2 underline">
              Login here
            </Link>
          </span>

          <span>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold rounded transition-transform transform hover:scale-105 duration-300 ease-in-out hover:bg-green-500"
            >
              Register
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
