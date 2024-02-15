import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import newRequest from "../utils/newRequest";
import Post from "./Post";

const Posts = () => {
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await newRequest.get(`posts/random`);
        setRandomPosts(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {randomPosts?.map((post) => (
        <Post key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
