import "./App.css";
import Home from "./pages/Home";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Comments from "./pages/Comments";
import LeftHome from "./components/LeftHome";
import RightHome from "./components/RightHome";
import MyProfile from "./pages/MyProfile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  const HomeLayout = () => {
    return (
      <>
        <div className="bg-[#e4e4e5] dark:bg-[#123456] flex">
          <LeftHome />
          <Outlet />
          <RightHome />
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    currentUser
      ? {
          path: "/",
          element: <HomeLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/comments/:id", //post id
              element: <Comments />,
            },
            {
              path: "/profile",
              element: <MyProfile />,
            },
            {
              path: "/explore",
              element: <Explore />,
            },
          ],
        }
      : {
          path: "/register",
          element: <Register />,
        },

    // register user
    {
      path: "/register",
      element: currentUser ? (
        <div className="bg-[#e4e4e5] dark:bg-[#123456] flex">
          <LeftHome />
          <Home />
          <RightHome />
        </div>
      ) : (
        <Register />
      ),
    },

    // login user
    {
      path: "/login",
      element: currentUser ? (
        <div className="bg-[#e4e4e5] dark:bg-[#123456] flex">
          <LeftHome />
          <Home />
          <RightHome />
        </div>
      ) : (
        <Login />
      ),
    },

    // forgot password
    // {
    //   path: "/forgotpassword",
    //   element: <ForgotPassword />
    // },

    // error page path
    // {
    //   path: "/*",
    //   element: <Error404 />,
    // },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
