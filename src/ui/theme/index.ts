import { extendTheme } from "@chakra-ui/react";
import { accordionTheme } from "./accordion";
import { menuTheme } from "../components/MenuButton";

export const theme = extendTheme({
  components: { Accordion: accordionTheme, Menu: menuTheme },
});
