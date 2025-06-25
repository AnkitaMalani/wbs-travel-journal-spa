import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import AuthContextprovider from "../context/AuthContextProvider.jsx";
import { Navbar, ChatBtn } from "@/components";

import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <AuthContextprovider>
      <div className="container mx-auto">
        <ToastContainer
          position="bottom-left"
          autoClose={1500}
          theme="colored"
        />
        <Navbar />
        <Outlet />
        <ChatBtn />
      </div>
    </AuthContextprovider>
  );
};

export default RootLayout;
