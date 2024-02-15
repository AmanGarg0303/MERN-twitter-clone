import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { toast } from "react-hot-toast";
import newRequest from "../utils/newRequest";

const Comment = ({ comment }) => {
  const handleDeleteComment = async () => {
    try {
      const res = await newRequest.delete(`comments/${comment?._id}`);
      toast.success(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
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
              <span className="dark:text-white">Aman Garg</span>
              <span className="dark:text-white">@amangarg</span>
            </div>

            <div onClick={handleDeleteComment}>
              <DeleteForeverOutlinedIcon
                fontSize="small"
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="relative">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {comment?.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
