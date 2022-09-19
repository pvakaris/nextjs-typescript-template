import {
  Navbar,
  Text,
  Menu,
  UnstyledButton,
  Group,
  Avatar,
} from "@mantine/core";
import NavbarSelector from "./NavbarSelector";

const AppNavbar: React.FC<{ opened: boolean }> = ({ opened }) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      God help me
      {
        // <NavbarSelector></NavbarSelector>
      }
    </Navbar>
  );
};

export default AppNavbar;
