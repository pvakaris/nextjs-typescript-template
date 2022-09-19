import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { Dispatch, SetStateAction, useState } from "react";
import { GetServerSidePropsContext } from "next";
import {
  AppShell,
  useMantineTheme,
  ColorSchemeProvider,
  ColorScheme,
  MantineProvider,
  MantineTheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { getCookie, setCookie } from "cookies-next";
import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";

export interface HeaderProps {
  theme: MantineTheme;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  //   ---------   For the theme changing   ---------
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };
  // A hotkey to switch the current theme to the opposite one
  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  //   ------------------------------------------------

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <MoralisProvider
          appId={process.env.NEXT_PUBLIC_APP_ID!}
          serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
        >
          <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            // Where the navigation is
            navbar={<AppNavbar opened={opened} />}
            // Sidebar on the right
            aside={<AppSidebar />}
            // Section at the top
            header={
              <AppHeader opened={opened} theme={theme} setOpened={setOpened} />
            }
          >
            <Component {...pageProps} />
          </AppShell>
        </MoralisProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
