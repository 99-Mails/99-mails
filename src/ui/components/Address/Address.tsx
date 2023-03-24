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
import { useTempEmail } from "@/services/store";
import { useGetAddressWithSession } from "@/services/api";
import type { Address } from "@/domains/Address";
import AddressRow from "./AddressRow";
import ErrorBoundary, { ErrorFallback } from "../ErrorBoundary";

const AddressHeader = () => {
  return (
    <CardHeader>
      <Heading size="md">Your temporary email(s)</Heading>
    </CardHeader>
  );
};

const AddressBody = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) => {
  return (
    <CardBody>
      <Stack divider={<StackDivider />} spacing="4" data-testid="address-list">
        {children}
      </Stack>
    </CardBody>
  );
};

const AddressWrapper = ({
  children,
  reset,
}: {
  children: React.ReactElement[] | React.ReactElement;
  reset: () => void;
}) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => reset()}>
      <Card bg="gray.200" border="1px" borderColor="gray.300" boxShadow="none">
        {children}
      </Card>
    </ErrorBoundary>
  );
};

const AddressContainer = () => {
  const { sessionID } = useTempEmail();
  const {
    data: addressList,
    loading,
    refetch,
    error,
  } = useGetAddressWithSession(sessionID);

  // if (error) {
  //   throw new Error('Get Address With Session API failed!')
  // }

  // const { onCopy, setValue, hasCopied } = useClipboard("", { timeout: 0 });
  // const { doDeleteAddress } = useDeleteAddressFromSession();

  // const copyAddressToClipboard = useCallback(async () => {
  //   setCopyValue(address.address);
  // }, [onCopy]);

  // const onDoCopy = () => {
  //   navigator.clipboard.writeText(address.id)
  // }

  return (
    <AddressWrapper reset={refetch}>
      <AddressHeader />
      <AddressBody>
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
              <AddressRow key={address.id} address={address} count={2} />
            )
          )}
      </AddressBody>
    </AddressWrapper>
  );
};

export default AddressContainer;
