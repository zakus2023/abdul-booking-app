import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { getCurrentUser } from "../api-services/users-services";
import { message } from "antd";
import userGlobalStore, { UserStoreType } from "../store/users-store";
import Spinner from "../components/Spinner";

function PrivateLaout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  // const [user, setUser]=useState(null)
  const { setCurrentUser, currentUser }: UserStoreType =
    userGlobalStore() as UserStoreType;
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      // setUser(response.data)
      setCurrentUser(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      getData();
      setShowContent(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    showContent &&
    currentUser && (
      <div className="flex lg:flex-row flex-col gap-5 h-screen">
        <Sidebar />
        <div className="flex-1 lg:mt-10 px-8 pb-10 overflow-y-scroll"> {children} </div>
      </div>
    )
  );
}

export default PrivateLaout;
