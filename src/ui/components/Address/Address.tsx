import {
  Text,
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
import { useGetAddressWithSession } from "../../../services/api";
import type { Address } from "../../../domains/Address";
import AddressRow from "./AddressRow";
import ErrorBoundary, { ErrorFallback } from "../ErrorBoundary";

const Address = () => {
  const { sessionID } = useStore();
  const {
    data: addressList,
    loading,
    refetch,
    error,
  } = useGetAddressWithSession(sessionID);

  // if (error) {
  //   throw new Error('Get Address With Session API failed!')
  // }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => refetch()}>
      <Card bg="gray.200" border="1px" borderColor="gray.300" boxShadow="none">
        <CardHeader>
          <Heading size="md">Your temporary email(s)</Heading>
        </CardHeader>

        <CardBody>
          <Stack
            divider={<StackDivider />}
            spacing="4"
            data-testid="address-list"
          >
            {error && (
              <Center>
                <Text>Error!</Text>
              </Center>
            )}
            {loading && (
              <Center>
                <Spinner data-testid="loading-spinner" />
              </Center>
            )}
            {addressList &&
              addressList.session.addresses.map(
                (address: Address, index: number) => (
                  <AddressRow key={index} email={address.address} count={2} />
                )
              )}
          </Stack>
        </CardBody>
      </Card>
    </ErrorBoundary>
  );
};

export default Address;
