import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  button: {
    px: 2,
    transition: "all 0.2s",
    borderRadius: "md",
    borderWidth: "1px",
    _hover: {
      bg: "gray.400",
    },
    _focus: { boxShadow: "outline" },
  },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
