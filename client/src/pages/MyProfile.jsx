import React, { useEffect, useRef, useState } from "react";
import Post from "../components/Post";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

const MyProfile = () => {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [profileImg, setProfileImage] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, []);

  const imageRef = useRef();
  const onImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setProfileImage(img);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    try {
      await newRequest.get("auth/logout");
      dispatch(logout());
      toast.success("Loggod out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const myPosts = async () => {
      const res = await newRequest.get("posts/");
      setMyPosts(res.data);
    };

    myPosts();
  }, []);

  return (
    <div className="flex-[2] border-r-2 border-gray-500 bg-[#e4e4e5] dark:bg-[#123456]">
      <div className="flex justify-between items-center border-b-2 border-gray-500 px-5 py-4 dark:text-white">
        <PersonIcon />
        <h6 className="font-semibold text-lg">PROFILE</h6>
      </div>
      <div className="flex flex-col gap-2 border-b-2 border-gray-500 px-8 py-4">
        <div className="flex justify-between items-center rounded-lg ">
          <div className="flex flex-col items-center w-1/4 dark:text-gray-200">
            <img
              src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
              alt=""
              className="w-14 h-14 rounded-full object-cover overflow-hidden mb-1"
            />
            <h1 className="text-sm">{currentUser?.username}</h1>
            <h1 className="text-sm">{currentUser?.handle}</h1>
          </div>

          <div className="flex justify-evenly w-3/4 gap-1">
            <div className="flex flex-col items-center dark:text-gray-200">
              <h2>Tweets</h2>
              <h3 className="">{myPosts?.length}</h3>
            </div>
            <div className="flex items-center">
              <span className="block w-[1px] h-8 bg-gray-500"></span>
            </div>
            <div className="flex flex-col items-center dark:text-gray-200">
              <h2>Followers</h2>
              <h3 className="">{currentUser?.followers?.length}</h3>
            </div>
            <div className="flex items-center">
              <span className="block w-[1px] h-8 bg-gray-500"></span>
            </div>
            <div className="flex flex-col items-center dark:text-gray-200">
              <h2>Following</h2>
              <h3 className="">{currentUser?.followings?.length}</h3>
            </div>
          </div>
        </div>

        <div className=" p-2 rounded-lg flex justify-between text-sm text-gray-200">
          <button
            onClick={() => setOpenEditProfile(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-full font-medium"
          >
            Edit Profile
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-full font-medium"
          >
            Logout
          </button>
        </div>

        {/* Edit button modal */}
        <div
          className={`relative z-10 ${openEditProfile ? "inline" : "hidden"} `}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg my-10">
                <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg font-medium leading-6 text-gray-400"
                        id="modal-title"
                      >
                        Edit Profile
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to edit your profile?
                        </p>
                        <form className="flex flex-col">
                          <div className="bg-gray-100 flex flex-row justify-center items-center my-1 py-1.5 px-2 rounded text-sm">
                            <input
                              className=" bg-gray-100 py-1 px-2 w-full outline-none text-black"
                              type="text"
                              placeholder="New Username"
                            />
                          </div>
                          <div className="bg-gray-100 flex flex-row justify-center items-center my-1 py-1.5 px-2 rounded text-sm">
                            <input
                              className=" bg-gray-100 py-1 px-2 w-full outline-none text-black"
                              type="text"
                              placeholder="New handle"
                            />
                          </div>
                          <div className="bg-gray-100 flex flex-row justify-center items-center my-1 py-1.5 px-2 text-sm rounded">
                            <img
                              src={
                                profileImg
                                  ? URL.createObjectURL(profileImg)
                                  : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
                              }
                              alt=""
                              className="w-14 h-14 rounded-full overflow-hidden cursor-pointer object-cover"
                              onClick={() => imageRef.current.click()}
                            />
                            <span
                              className="text-gray-500 text-xs mx-5 cursor-pointer"
                              onClick={() => imageRef.current.click()}
                            >
                              Change Profile Pic
                            </span>
                            <input
                              type="file"
                              name="myImage"
                              ref={imageRef}
                              onChange={onImgChange}
                              className="hidden"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Edit Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenEditProfile(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5 className="text-center font-medium text-xl py-2 dark:text-white">
          Your Tweets
        </h5>

        {myPosts.length === 0 ? (
          <div className="text-white px-16 py-4">No tweets yet.</div>
        ) : (
          myPosts.map((post) => <Post key={post?._id} post={post} />)
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default MyProfile;
