import {
  Header,
  MediaQuery,
  Burger,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { HeaderProps as Props } from "../pages/_app";

import { ColorModeSwitcher } from "./ColorModeSwitcher";

const AppHeader: React.FC<Props> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();

  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
        <ColorModeSwitcher />
      </div>
    </Header>
  );
};

export default AppHeader;
