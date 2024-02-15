import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import newRequest from "../utils/newRequest";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await newRequest.post("auth/register", {
        username,
        handle,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
      dispatch(loginFailure());
    }
  };

  return (
    <div>
      <div className=" p-2 rounded-lg flex flex-col items-center justify-center gap-2 min-h-screen bg-[#e4e4e9]">
        <div className="bg-[#123456] p-5 rounded-lg ">
          <h2 className="text-center text-xl mb-5 text-white">
            Twitter Register
          </h2>
          <form
            className="flex flex-col max-w-2xl mx-auto mb-5"
            onSubmit={handleSubmit}
          >
            <div className="bg-gray-100 flex flex-row justify-center items-center my-2 py-1.5 px-2 rounded">
              <PersonIcon className="text-gray-400 text-xl" />
              <input
                className=" bg-gray-100 py-2 px-3 w-full outline-none text-black"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="bg-gray-100 flex flex-row justify-center items-center my-2 py-1.5 px-2 rounded">
              <PersonIcon className="text-gray-400 text-xl" />
              <input
                className=" bg-gray-100 py-2 px-3 w-full outline-none text-black"
                type="text"
                placeholder="Handle"
                onChange={(e) => setHandle(e.target.value)}
                required
              />
            </div>

            <div className="bg-gray-100 flex flex-row justify-center items-center my-2 py-1.5 px-2 rounded">
              <EmailOutlinedIcon className="text-gray-400 text-xl" />
              <input
                className=" bg-gray-100 py-2 px-3 w-full outline-none text-black"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="bg-gray-100 flex flex-row justify-center items-center my-2 py-1.5 px-2 rounded">
              <HttpsOutlinedIcon className="text-gray-400 text-xl" />
              <input
                className=" bg-gray-100 py-2 px-3 w-full outline-none text-black"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mx-auto">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-full font-medium"
              >
                Register
              </button>
            </div>
          </form>

          <div className="text-sm text-gray-200 text-center">
            <Link to="/login">
              Already have an account!
              <span className="text-white font-semibold"> Login</span>
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
