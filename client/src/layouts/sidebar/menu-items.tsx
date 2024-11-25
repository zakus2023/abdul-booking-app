import {
  BookCheck,
  CandlestickChart,
  House,
  List,
  LogOut,
  User,
  UsersRound,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import cookies from 'js-cookie'
import { message } from "antd";
import userGlobalStore, { UserStoreType } from "../../store/users-store";


function MenuItems() {
  const iconSize = 16;
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const {currentUser}:UserStoreType=userGlobalStore() as UserStoreType

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: <House size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={iconSize} />,
      isActive: currentPath === "/profile",
    },
    {
      name: "Bookings",
      path: "/profile/bookings",
      icon: <List size={iconSize} />,
      isActive: currentPath === "/profile/bookings",
    },

    {
      name: "Reports",
      path: "/profile/reports",
      icon: <CandlestickChart size={iconSize} />,
      isActive: currentPath === "/profile/reports",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: <House size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: <List size={iconSize} />,
      isActive: currentPath.includes("/admin/events"),
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <BookCheck size={iconSize} />,
      isActive: currentPath.includes("/admin/bookings"),
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <UsersRound size={iconSize} />,
      isActive: currentPath.includes("/admin/users"),
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <CandlestickChart size={iconSize} />,
      isActive: currentPath.includes("/admin/reports"),
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];

  const menuToRender = currentUser?.isAdmin ? adminMenu : userMenu;

  const onLogOut = ()=>{
    cookies.remove('token')
    navigate('/login')
    message.success('Logged out successfully')

  }

  return (
    <div className="lg:bg-gray-200 h-full p-5 w-full">
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-2xl font-bold  text-info">
          ABDUL<b className="text-primary font-bold pl-2">EVENTS</b>
        </h1>
        <span className="text-sm text-gray-600">{currentUser?.name}</span>
      </div>
      <div className="flex flex-col gap-5 gap-5 mt-10">
        {menuToRender.map((item: any) => (
          <div
            className={` px-5 py-3 flex gap-5 text-sm items-center rounded cursor-pointer ${
              item.isActive ? "bg-info text-white " : ""
            }`}
            key={item.name}
            onClick={() => {
              if(item.name == 'Logout'){
                onLogOut()
              }else{
                navigate(item.path)
              }
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
