import { forwardRef, Image, ImageProps } from "@chakra-ui/react";

export const Logo = forwardRef<ImageProps, "image">((props, ref) => {
  return (
    <Image
      ref={ref}
      src="logo-cropped.svg"
      w="40"
      alt="logo-99-mails"
      {...props}
    />
  );
});
