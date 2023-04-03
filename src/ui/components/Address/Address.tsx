import { PropsWithChildren, useEffect, useState, memo, default as React } from "react";
import {
  Box,
  Text,
  Stack,
  Center,
  Spinner,
  Heading,
  BoxProps,
  forwardRef,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTempEmail } from "@/services/store";
import { useGetAddressWithSession } from "@/services/api";
import type { Address, AddressID } from "@/domains/Address";
import { AddressRow } from "./AddressRow";
import ErrorBoundary, { ErrorFallback } from "../ErrorBoundary";
import { ApolloError } from "@apollo/client";
import { useDispatch } from "react-redux";
import { AddressTimerActions } from "@/services/sagas";

const AddressHeader = () => {
  return (
    <Center>
      <Heading size="md">Your temporary email address</Heading>
    </Center>
  );
};

type AddressBodyProps = BoxProps & {
  addresses: Address[];
  error: ApolloError;
  loading: boolean;
};

const AddressBody = memo(
  forwardRef<AddressBodyProps, "div">((props, ref) => {
    const { addresses, error, loading, ...restProps } = props;

    return (
      <Box ref={ref} mt="12" {...restProps}>
        <Stack divider={<StackDivider />} spacing="2">
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
          {addresses.length == 0 && !loading && (
            <Center>
              <Text data-testid="no-address" as="b">
                No Active Address!
              </Text>
            </Center>
          )}
          {addresses &&
            addresses.map(({ address, id }: AddressID) => (
              <AddressRow key={id} address={address} id={id} />
            ))}
        </Stack>
      </Box>
    );
  })
);

type AddressWrapperProps = PropsWithChildren & {
  reset: Fn;
};

const AddressWrapper = (props: AddressWrapperProps) => {
  const { reset, children } = props;

  const bg = useColorModeValue("gray.100", "blue.300");

  return (
    <Box
      p="8"
      borderRadius="lg"
      bg={bg}
      sx={{
        height: "200px",
        width: "600px",
        backgroundImage: `linear-gradient(90deg, blue.500 50%, transparent 50%), linear-gradient(90deg, blue.500 50%, transparent 50%), linear-gradient(0deg, blue.500 50%, transparent 50%), linear-gradient(0deg, blue.500 50%, transparent 50%)`,
        backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
        backgroundSize: "15px 3px, 15px 3px, 3px 15px, 3px 15px",
        backgroundPosition: "left top, right bottom, left bottom, right top",
        animation: "border-dance 1s infinite linear",
        "@keyframes border-dance": {
          "0%": {
            backgroundPosition:
              "left top, right bottom, left bottom, right top",
          },
          "100%": {
            backgroundPosition:
              "left 15px top, right 15px bottom , left bottom 15px , right top 15px",
          },
        },
      }}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => reset()}>
        {children}
      </ErrorBoundary>
    </Box>
  );
};

const AddressContainer = () => {
  const { sessionID } = useTempEmail();
  const { data, loading, refetch, error } = useGetAddressWithSession(sessionID);
  const [addresses, setAddresses] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    function handleAddressNotLoading() {
      if (!loading && data) {
        setAddresses(data?.session?.addresses);
        dispatch({ type: AddressTimerActions.actionTypes.START });
      }
    }
    handleAddressNotLoading();

    return () => setAddresses([]);
  }, [loading, data]);

  return (
    <AddressWrapper reset={refetch}>
      <AddressHeader />
      <AddressBody
        data-testid="address-list"
        addresses={addresses}
        error={error}
        loading={loading}
      />
    </AddressWrapper>
  );
};

export { AddressContainer };
