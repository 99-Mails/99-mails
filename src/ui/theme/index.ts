import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { accordionTheme } from "./accordion";
import { menuTheme } from "@/ui/components/MenuButton";

export const theme: ThemeConfig = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  components: { Accordion: accordionTheme, Menu: menuTheme },
});
