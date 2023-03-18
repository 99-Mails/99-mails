import {
  Stack,
  Center,
  Spinner,
  Heading,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
} from "@chakra-ui/react";
import { useStore } from "../../../services/storeService";
import { useSession } from "../../../services/api";
import AddressRow from "./AddressRow";

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
        <Stack divider={<StackDivider />} spacing="4" data-testid="address-list">
          {loading && (
            <Center>
              <Spinner data-testid="loading-spinner" />
            </Center>
          )}
          {addressList &&
            addressList.session.addresses.map((address, index) => (
              <AddressRow key={index} email={address.address} count={2} />
            ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Address;
