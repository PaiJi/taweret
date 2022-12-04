import {
  AppShell,
  Header,
  Group,
  Container,
  Card,
  Box,
  Text,
} from "@mantine/core";
import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      // navbar={
      //   <Navbar width={{ base: 300 }} height={500} p="xs">
      //     <Navbar.Section>Taweret</Navbar.Section>
      //     <Navbar.Section grow mt="md">
      //       {/* Links sections */}
      //       {/* <NavbarLinksGroup/> */}
      //     </Navbar.Section>
      //     <Navbar.Section>{/* Footer with user */}</Navbar.Section>
      //   </Navbar>
      // }
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            {/* <Logo colorScheme={colorScheme} /> */}
            <span>Taweret</span>
            <span>Logout</span>
            {/* <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
              </ActionIcon> */}
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
