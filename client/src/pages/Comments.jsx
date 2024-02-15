import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Post from "../components/Post";
import newRequest from "../utils/newRequest";

const Comments = () => {
  const postId = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [post, setPost] = useState();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await newRequest.get(`posts/${postId.id}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };

    fetchPost();
  }, [postId]);

  const [desc, setDesc] = useState("");

  const handleCreateComment = async () => {
    try {
      await newRequest.post(`comments/`, {
        postId: postId.id,
        desc,
      });
      toast.success("Comment created!");
      setDesc("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const res = await newRequest.get(`comments/${postId.id}`);
        setAllComments(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    fetchAllComments();
  }, [postId.id]);

  return (
    <div className="flex-[2] border-r-2 border-gray-500 dark:text-white py-4">
      <Post post={post} />

      <div className="px-4 py-1.5 rounded-md">
        <div className="flex gap-3 px-4 bg-gray-100 dark:bg-[#2c5878] rounded-md py-2">
          <div className="w-11 h-11">
            <img
              src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
              alt=""
              className="object-cover border-2 border-black rounded-full dark:border-white"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-5">
                <span className="dark:text-white">{currentUser?.username}</span>
                <span className="dark:text-white">{currentUser?.handle}</span>
              </div>

              {/* <div>
                <DeleteForeverOutlinedIcon
                  fontSize="small"
                  className="cursor-pointer"
                />
              </div> */}
            </div>

            <div className="relative">
              <textarea
                id=""
                rows="3"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                placeholder="Write your comment here"
                className="w-full rounded-md bg-[#e4e4e5] dark:bg-[#446882] dark:text-white text-black px-3 py-1.5 outline-none"
              />
              <button
                onClick={handleCreateComment}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1 rounded-full font-medium float-right "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {allComments?.map((comment) => (
        <Comment key={comment?._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
