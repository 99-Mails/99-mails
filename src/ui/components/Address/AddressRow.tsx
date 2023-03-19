import { useEffect } from "react";
import {
  Tag,
  Flex,
  Text,
  Center,
  Heading,
  useClipboard,
  IconButton,
} from "@chakra-ui/react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import useDeleteAddressFromSession from "../../../application/deleteAddressFromSession";

const AddressRow = ({ email, count }: { email: string; count: number }) => {
  const { onCopy, setValue, hasCopied } = useClipboard("");

  const { doDeleteAddress } = useDeleteAddressFromSession();

  useEffect(() => {
    setValue(email);
  }, [email]);

  return (
    <>
      <Center>
        <Heading size="xs">
          <Flex gap={2} alignItems={"center"}>
            <Text data-testid="email-address" fontSize="3xl">
              {email}
            </Text>
            <IconButton
              data-testid="copy-address"
              onClick={onCopy}
              colorScheme={hasCopied ? "green" : "gray"}
              aria-label="Copy Address to clipboard"
              size={"xs"}
              icon={<CopyIcon />}
            />
            <IconButton
              data-testid="delete-address"
              onClick={() => doDeleteAddress}
              aria-label="Delete Address"
              size={"xs"}
              icon={<DeleteIcon />}
            />
            <Tag data-testid="email-count" bg="gray.500" color="white">
              {count}
            </Tag>
          </Flex>
        </Heading>
      </Center>
    </>
  );
};

export default AddressRow;
