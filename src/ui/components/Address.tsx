import { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Box,
  Flex,
  Text,
  StackDivider,
  Center,
  Tag,
  useClipboard,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import useStore from "../../services/storeService";
import { useSession } from "../../services/api";

const AddressRow = ({ address, size }: { address: string; size: number }) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  useEffect(() => {
    setValue(address);
  }, [address]);

  return (
    <Box>
      <Center>
        <Heading size="xs">
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize="3xl">{address}</Text>
            <IconButton
              onClick={onCopy}
              colorScheme={hasCopied ? "green" : "gray"}
              aria-label="Search database"
              size={"xs"}
              icon={<CopyIcon />}
            />
            <Tag bg="gray.500" color="white">
              {size}
            </Tag>
          </Flex>
        </Heading>
      </Center>
    </Box>
  );
};

const Address = () => {
  const { sessionID } = useStore();
  const { getAddressWithSession } = useSession();

  const {
    data: addressList,
    loading,
  } = getAddressWithSession(sessionID);

  return (
    <Card bg="gray.200" border="1px" borderColor="gray.300" boxShadow="none">
      <CardHeader>
        <Heading size="md">Your temporary email(s)</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {loading && (
            <Center>
              <Spinner />
            </Center>
          )}
          {addressList &&
            addressList.session.addresses.map((address, index) => (
              <AddressRow key={index} address={address.address} size={2} />
            ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Address;
