import type { Address } from "../../../domains/Address";
import {
  Tag,
  Flex,
  Text,
  IconButton,
  useClipboard,
  forwardRef,
  IconButtonProps,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useDeleteAddressFromSession from "../../../application/deleteAddressFromSession";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";

const AddressRowButton = forwardRef<IconButtonProps, "button">((props, ref) => {
  return <IconButton ref={ref} {...props} />;
});

const AddressRowName = ({ name }: { name: string }) => {
  return <Text fontSize="3xl">{name}</Text>;
};

const AddressRowCount = ({ count }: { count: number }) => {
  return (
    <Tag bg="gray.500" color="white">
      {count}
    </Tag>
  );
};

const AddressRow = ({
  address,
  count,
}: {
  address: Pick<Address, "address" | "id">;
  count: number;
}) => {
  const { doDeleteAddress } = useDeleteAddressFromSession();
  const {
    onCopy: onClipboard,
    setValue,
    hasCopied: isClipboard,
  } = useClipboard("", { timeout: 0 });

  useEffect(() => {
    setValue(address.address);
  }, []);

  return (
    <Flex gap={2} alignItems={"center"}>
      <AddressRowName data-testid="email-address" name={address.address} />
      <AddressRowButton
        data-testid="copy-address"
        onClick={onClipboard}
        icon={<CopyIcon />}
        aria-label={""}
      />
      <AddressRowButton
        data-testid="delete-address"
        onClick={() => doDeleteAddress(address)}
        icon={<DeleteIcon />}
        aria-label={""}
      />
      <AddressRowCount data-testid="email-count" count={count} />
    </Flex>
  );
};

export default AddressRow;
