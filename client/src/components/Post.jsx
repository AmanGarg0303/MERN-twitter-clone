import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import newRequest from "../utils/newRequest";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../redux/userSlice";

const Post = ({ post }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deletePost = async () => {
    try {
      const res = await newRequest.delete(`posts/${post?._id}`);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await newRequest.get(`users/${post?.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    getUser();
  }, [post?.userId]);

  const handleFollowUser = async () => {
    try {
      const res = await newRequest.put(`users/follow/${user?._id}`);
      dispatch(followUser(user?._id));
      toast.success(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollowUser = async () => {
    try {
      const res = await newRequest.put(`users/unfollow/${user?._id}`);
      dispatch(unFollowUser(user?._id));
      toast.success(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUnFollowUser = async () => {
  //   try {
  //     const res = await newRequest.put(`users/unfollow/${user?._id}`);
  //     dispatch(unFollowUser(user?._id));
  //     toast.success(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div className="flex gap-3 pb-7 px-8">
        <div className="w-11 h-11">
          <img
            src={
              user?.profileImg
                ? process.env.REACT_APP_PUBLIC_FOLDER + user.profileImg
                : "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
            }
            alt=""
            className="object-cover border-2 border-black rounded-full dark:border-white"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <div className="flex gap-5 items-center">
                <span className="dark:text-white">{user?.username}</span>
                <span className="dark:text-white text-xs">
                  ● {user?.handle}
                </span>
              </div>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {post?.title}
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                #nature #wildlife #sunnset
              </span>
            </div>

            {currentUser?._id !== post?.userId && (
              <div>
                {currentUser?.followings?.includes(user?._id) ? (
                  <button
                    onClick={handleUnFollowUser}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-full font-medium"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-full font-medium"
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <img
              src={
                post?.image
                  ? process.env.REACT_APP_PUBLIC_FOLDER + post.image
                  : ""
              }
              alt=""
              className="w-full rounded-md max-h-80 brightness-95"
            />
          </div>

          <div className="flex justify-between dark:text-white">
            <div className="flex gap-1 items-center" title="Like Post">
              <FavoriteBorderOutlinedIcon />
              <span>{post?.likes?.length}</span>
            </div>
            <Link to={`/comments/${post?._id}`}>
              <div className="flex gap-1 items-center" title="Comment on Post">
                <InsertCommentOutlinedIcon />
                <span>{post?.totalComments}</span>
              </div>
            </Link>

            {currentUser?._id === post?.userId && (
              <div
                className="flex gap-1 items-center cursor-pointer"
                title="Delete Post"
                onClick={deletePost}
              >
                <DeleteForeverOutlinedIcon />
              </div>
            )}

            <div className="flex gap-1 items-center" title="Add to Bookmarks">
              <BookmarkAddOutlinedIcon />
            </div>
            <div className="flex gap-1 items-center" title="Share">
              <TelegramIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
