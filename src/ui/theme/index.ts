import { extendTheme } from "@chakra-ui/react";
import { accordionTheme } from "./accordion";
import { menuTheme } from "@/ui/components/MenuButton";

export const theme = extendTheme({
  components: { Accordion: accordionTheme, Menu: menuTheme },
});
