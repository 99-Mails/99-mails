import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  container: {
    border: 0,
  },
  button: {
    borderRadius: "6px",
  },
});

export const accordionTheme = defineMultiStyleConfig({ baseStyle });
