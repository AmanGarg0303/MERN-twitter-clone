import React from "react";
import TagIcon from "@mui/icons-material/Tag";

const Explore = () => {
  return (
    <div className="flex-[2] border-r-2 border-gray-500 ">
      <div className="flex justify-between items-center border-b border-gray-500 px-5 py-4 dark:text-white">
        <TagIcon />
        <h6 className="font-semibold text-lg">EXPLORE</h6>
      </div>

      <div className="px-8 py-4 flex flex-col gap-4">
        <div className="bg-gray-100 dark:bg-[#2c5278] px-8 py-4 rounded-md dark:text-white">
          <h6 className="text-sm pb-2">Trending 1</h6>
          <div className="flex justify-between">
            <h3 className="font-semibold">#amangarg</h3>
            <p>Tweets: 974</p>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-[#2c5278] px-8 py-4 rounded-md dark:text-white">
          <h6 className="text-sm pb-2">Trending 2</h6>
          <div className="flex justify-between">
            <h3 className="font-semibold">#mern</h3>
            <p>Tweets: 542</p>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-[#2c5278] px-8 py-4 rounded-md dark:text-white">
          <h6 className="text-sm pb-2">Trending 3</h6>
          <div className="flex justify-between">
            <h3 className="font-semibold">#react</h3>
            <p>Tweets: 374</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
