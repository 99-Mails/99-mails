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
import { CopyIcon } from "@chakra-ui/icons";

const AddressRow = ({ email, count }: { email: string; count: number }) => {
  const { onCopy, setValue, hasCopied } = useClipboard("");

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
              onClick={onCopy}
              colorScheme={hasCopied ? "green" : "gray"}
              aria-label="Copy to clipboard"
              size={"xs"}
              icon={<CopyIcon />}
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
