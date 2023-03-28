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
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { Suspense, useEffect, useMemo, useState } from "react";
import useDeleteAddressFromSession from "@/application/deleteAddressFromSession";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { Timer } from "../Timer";
import { FancyDate } from "@/lib/date";

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

const AddressRow = ({
  address,
  count,
}: {
  address: AddressID;
  count: number;
}) => {
  const [disabled, disableAddress] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const { doDeleteAddress } = useDeleteAddressFromSession();
  const {
    onCopy: onClipboard,
    setValue,
    hasCopied,
  } = useClipboard("", { timeout: 1000 });

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

  useMemo(() => {
    setExpiresAt(new FancyDate().getDateWithMinutesFromNow(10));
  }, []);

  return (
    <Flex gap={2} alignItems={"center"} justifyContent="space-between">
      <AddressRowName
        as={disabled ? "del" : "p"}
        data-testid="email-address"
        name={address.address}
      />
      <HStack>
        <AddressRowButton
          data-testid="copy-address"
          isDisabled={disabled}
          onClick={onClipboard}
          size="sm"
          icon={<CopyIcon />}
          aria-label={""}
          colorScheme={hasCopied ? "green" : "gray"}
        />
        <AddressRowButton
          data-testid="delete-address"
          isDisabled={disabled}
          onClick={() => doDeleteAddress(address)}
          size="sm"
          icon={<DeleteIcon />}
          aria-label={""}
        />
        <AddressRowCount data-testid="email-count" count={count} />
        <Tag minW="60px">
          <Suspense fallback={<Spinner />}>
            <Timer expiresAt={expiresAt} isDisabled={disabled} />
          </Suspense>
        </Tag>
      </HStack>
    </Flex>
  );
};

export default AddressRow;
