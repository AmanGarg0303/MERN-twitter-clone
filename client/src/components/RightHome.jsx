import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const RightHome = () => {
  const users = [
    {
      _id: 1,
      name: "Aman",
      handle: "@amangarg",
      img: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    },
    {
      _id: 2,
      name: "Broo",
      handle: "@bro",
      img: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    },
    {
      _id: 3,
      name: "Binod",
      handle: "@binod",
      img: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    },
  ];

  const news = [
    {
      _id: 1,
      title: "A man died due to rain",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eaque, ratione dolores ipsum alias, hic perspiciatis id distinctio delectus nesciunt nisi doloribus deleniti tenetur totam sit molestias fugit optio esse veritatis quia ipsa autem. Nam atque accusantium itaque ad odit.",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      _id: 2,
      title: "Toffies fell from sky instead of rain",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eaque, ratione dolores ipsum alias, hic perspiciatis id distinctio delectus nesciunt nisi doloribus deleniti tenetur totam sit molestias fugit optio esse veritatis quia ipsa autem. Nam atque accusantium itaque ad odit.",
      img: "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg",
    },
  ];

  return (
    <div className="flex-1 min-h-screen dark:bg-[#123456] dark:text-white bg-[#e4e4e5]">
      <div className="flex flex-col gap-2 sticky top-0">
        {/* <div className="flex justify-between items-center border-b px-5 py-4">
          <PeopleOutlinedIcon />
          <h6 className="font-semibold text-lg">Users</h6>
        </div> */}

        <div className="flex gap-2 border rounded-full items-center border-gray-500 mx-8 my-4">
          <SearchOutlinedIcon className="ml-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search twitter"
            className="border-none outline-none w-full px-2 py-1.5 rounded-full dark:bg-[#123456] bg-[#e4e4e5]"
          />
        </div>

        <div className="flex flex-col gap-3 px-8 border-b border-gray-500 pb-3">
          {users.map((user) => (
            <div className="flex justify-between items-center" key={user?._id}>
              <div className="flex gap-2 items-center">
                <div className="border-2 border-black dark:border-white rounded-full w-11 h-11">
                  <img
                    src={user?.img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-sm">{user?.name}</span>
                  <span className="text-sm">{user?.handle}</span>
                </div>
              </div>

              <div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-full font-medium">
                  Follow
                </button>
              </div>
            </div>
          ))}
          <button>Load More...</button>
        </div>

        <div className="flex flex-col gap-3 bg-gray-100 dark:bg-[#2c5278] mx-4 px-4 my-2 py-2 rounded-md">
          <h6 className="text-xl font-medium">What's happening!</h6>

          <div className="flex flex-col gap-2">
            {news?.map((n) => (
              <div key={n?._id} className="flex items-center pb-2">
                <div className="flex-[2]">
                  <h6 className="font-semibold">{n?.title.slice(0, 20)}...</h6>
                  <p className="text-xs">{n?.desc.slice(0, 40)}...</p>
                </div>

                <div className="flex-1 w-12 h-full">
                  <img
                    src={n?.img}
                    alt=""
                    className="rounded-md w-[80%] ml-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightHome;
