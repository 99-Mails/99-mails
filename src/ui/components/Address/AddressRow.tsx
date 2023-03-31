import type { AddressID } from "@/domains/Address";
import {
  Tag,
  Flex,
  Text,
  IconButton,
  useClipboard,
  forwardRef,
  IconButtonProps,
  TextProps,
  TagProps,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CopyIcon } from "@chakra-ui/icons";

const AddressRowButton = forwardRef<IconButtonProps, "button">((props, ref) => {
  return <IconButton ref={ref} {...props} />;
});

type AddressRowNameProps = TextProps & {
  name: string;
};

const AddressRowName = forwardRef<AddressRowNameProps, "div">((props, ref) => {
  const { name } = props;
  return (
    <Text ref={ref} fontSize="3xl" {...props}>
      {name}
    </Text>
  );
});

type AddressRowCountProps = TagProps & {
  count: number;
};

const AddressRowCount = forwardRef<AddressRowCountProps, "span">(
  (props, ref) => {
    const { count } = props;
    return (
      <Tag ref={ref} bg="gray.500" color="white" {...props}>
        {count}
      </Tag>
    );
  }
);

const AddressRow = (address: AddressID) => {
  const [disabled, disableAddress] = useState(false);
  const {
    onCopy: onClipboard,
    setValue,
    hasCopied,
  } = useClipboard("", { timeout: 500 });

  useEffect(() => {
    function init() {
      setValue(address.address);
    }
    init();
    return () => setValue("");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => disableAddress(true), 10 * 60000);
    return () => clearTimeout(timer);
  }, []);

  const AddressNameColor = useColorModeValue("black", "blue.900");
  const CopyButtonBg = useColorModeValue("gray.100", "yellow.400");

  return (
    <Flex gap="2" alignItems="center" justifyContent="center">
      <Center
        bg="blue.200"
        alignItems="center"
        borderRadius="full"
        px="1"
        py="0.5"
      >
        <AddressRowName
          color={AddressNameColor}
          px="4"
          fontWeight="bold"
          as={disabled ? "del" : "p"}
          data-testid="email-address"
          name={address.address}
        />
        <AddressRowButton
          data-testid="copy-address"
          isDisabled={disabled}
          onClick={onClipboard}
          borderRadius="full"
          size="md"
          icon={<CopyIcon />}
          aria-label={""}
          colorScheme={hasCopied ? "blue" : "gray"}
          bg={CopyButtonBg}
        />
      </Center>
    </Flex>
  );
};

export default AddressRow;
