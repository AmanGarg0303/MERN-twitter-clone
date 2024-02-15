import React, { useRef, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Posts from "./Posts";
import { useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import { toast, Toaster } from "react-hot-toast";

const CenterHome = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const { currentUser } = useSelector((state) => state.user);

  const onImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const handleAddPost = async () => {
    const newPost = {
      userId: currentUser?._id,
      title,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;

      try {
        // dispatch(uploadImage(data));
        await newRequest.post("upload/", data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    }
    // dispatch(uploadPost(newPost));

    try {
      await newRequest.post("posts/", newPost);
      toast.success("Post created!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

    setImage(null);
    setTitle("");
  };

  return (
    <div className="flex-[2] border-r-2 border-gray-500 min-h-screen dark:bg-[#123456] dark:text-white bg-[#e4e4e5]">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center border-b border-gray-500 px-5 py-4">
          <HomeIcon />
          <h6 className="font-semibold text-lg">HOME</h6>
        </div>

        <div className="px-8 flex gap-3 border-b border-gray-500 pb-3">
          <div className="w-11 h-11">
            <img
              src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
              alt=""
              className="object-cover border-2 border-black rounded-full dark:border-white"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div>
              <textarea
                placeholder="What's happening?"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border-b-2 border-gray-500 px-3 py-1.5 w-full rounded-md dark:bg-[#123456] bg-[#e4e4e5]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <input
                  type="file"
                  name="img"
                  ref={imageRef}
                  onChange={onImgChange}
                  className="hidden"
                />
                <span onClick={() => imageRef.current.click()}>
                  <InsertPhotoOutlinedIcon className="text-blue-500 dark:text-white" />
                </span>
                <SentimentSatisfiedAltIcon className="text-blue-500 dark:text-white" />
              </div>
              <button
                onClick={handleAddPost}
                className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-1.5 rounded-full"
              >
                Tweet
              </button>
            </div>

            {image && (
              <div className="relative">
                <CancelOutlinedIcon
                  className="absolute top-2 left-2 text-red-600 cursor-pointer z-10 contrast-200"
                  onClick={() => setImage(null)}
                />

                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-full rounded-md max-h-80 brightness-95"
                />
              </div>
            )}
          </div>
        </div>

        <div className="px-8 ">
          <Posts />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CenterHome;
