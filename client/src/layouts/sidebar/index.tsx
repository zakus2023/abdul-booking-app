import { useState } from "react";
import MenuItems from "./menu-items";

import { Menu } from "lucide-react";
import { Drawer } from "antd";


function Sidebar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="">
      <div className="lg:flex hidden h-full lg:w-full">
        <MenuItems/>
      </div>

      <div className="lg:hidden p-5 bg-info flex">
        <Menu
          size={20}
          color="white"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="cursorr-pointer"
        />
      </div>
      {showMobileMenu && (
        <Drawer
          open={showMobileMenu}
          placement="left"
          onClose={() => setShowMobileMenu(false)}
        >
          <MenuItems/>
        </Drawer>
      )}
    </div>
  );
}

export default Sidebar;
