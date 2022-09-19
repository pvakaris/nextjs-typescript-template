import {
  Navbar,
  Text,
  Menu,
  UnstyledButton,
  Group,
  Avatar,
  Divider,
} from "@mantine/core";

import {
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Logout,
  Settings,
} from "tabler-icons-react";

const NavbarSelector = () => {
  return (
    <div>
      <Menu
      //   control={
      //     <UnstyledButton
      //       sx={{
      //         display: "block",
      //         width: "100%",
      //       }}
      //     >
      //       <Group sx={{ display: "flex", justifyContent: "center" }}>
      //         <Avatar />
      //         {/* Name and wallet address */}
      //       </Group>
      //     </UnstyledButton>
      //   }
      >
        <Menu.Item icon={<UserCircle size={14} />}>Profile</Menu.Item>
        <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
        <Divider />
        <Menu.Item color="red" icon={<Logout size={14} />}>
          Log out
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavbarSelector;
