import type { AppProps } from "next/app";
import { Dispatch, SetStateAction, useState } from "react";
import { GetServerSidePropsContext } from "next";
import {
  AppShell,
  ColorSchemeProvider,
  ColorScheme,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { getCookie, setCookie } from "cookies-next";
import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";

import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";

export interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function MyApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  //   ---------   COLOR MODE   ---------
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );
  const [opened, setOpened] = useState(false);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  };
  //   ------------------------------------------------

  // A hotkey to switch the current theme to the opposite one
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          // Navigation on the left
          navbar={<AppNavbar opened={opened} />}
          // Sidebar on the right
          aside={<AppSidebar />}
          // Header at the top
          header={<AppHeader opened={opened} setOpened={setOpened} />}
        >
          {/* <WagmiConfig client={client}>
            <SessionProvider session={pageProps.session} refetchInterval={0}> */}
          <Component {...pageProps} />
          {/* </SessionProvider>
          </WagmiConfig> */}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
