import { useEffect, useState } from "react";
import {
  Text,
  Flex,
  Stack,
  Center,
  Spinner,
  Heading,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
  forwardRef,
  CardBodyProps,
} from "@chakra-ui/react";
import { useTempEmail } from "@/services/store";
import { useGetAddressWithSession } from "@/services/api";
import type { Address } from "@/domains/Address";
import AddressRow from "./AddressRow";
import ErrorBoundary, { ErrorFallback } from "../ErrorBoundary";
import { ApolloError } from "@apollo/client";
import { Timer } from "@/ui/components/Timer";

const AddressHeader = () => {
  return (
    <CardHeader>
      <Heading size="md">Your temporary email(s)</Heading>
    </CardHeader>
  );
};

type AddressBodyProps = CardBodyProps & {
  address: Address[];
  error: ApolloError;
  loading: boolean;
};

const AddressBody = forwardRef<AddressBodyProps, "div">((props, ref) => {
  const { address, error, loading } = props;

  return (
    <CardBody ref={ref}>
      <Stack divider={<StackDivider />} spacing="2">
        {!address && error && (
          <Center>
            <Text>Error!</Text>
          </Center>
        )}
        {loading && (
          <Center>
            <Spinner data-testid="loading-spinner" />
          </Center>
        )}
        {address.length == 0 && !loading && (
          <Center>
            <Text data-testid="no-address" as="b">
              No Active Address!
            </Text>
          </Center>
        )}
        {address &&
          address.map((address: Address, index: number) => (
            <AddressRow key={address.id} address={address} count={2} />
          ))}
      </Stack>
    </CardBody>
  );
});

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
  const { data, loading, refetch, error } = useGetAddressWithSession(sessionID);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    function handleAddressNotLoading() {
      if (!loading && data) {
        setAddress(data?.session?.addresses);
      }
    }
    handleAddressNotLoading();

    return () => setAddress([]);
  }, [loading, data]);

  return (
    <AddressWrapper reset={refetch}>
      <AddressHeader />
      <AddressBody
        data-testid="address-list"
        address={address}
        error={error}
        loading={loading}
      />
    </AddressWrapper>
  );
};

export default AddressContainer;
