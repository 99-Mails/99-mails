import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    border: 0,
    borderRadius: 0,
  },
});

export const accordionTheme = defineMultiStyleConfig({ baseStyle });
