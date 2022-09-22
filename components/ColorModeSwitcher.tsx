import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

export function ColorModeSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center">
      <ActionIcon
        variant="outline"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {colorScheme === "dark" ? <Sun size={20} /> : <Moon size={18} />}
      </ActionIcon>
    </Group>
  );
}
