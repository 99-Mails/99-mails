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
} from "@chakra-ui/react";
import { useEffect } from "react";
import useDeleteAddressFromSession from "@/application/deleteAddressFromSession";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";

const AddressRowButton = forwardRef<IconButtonProps, "button">((props, ref) => {
  return <IconButton ref={ref} {...props} />;
});

type AddressRowNameProps = TextProps & {
  name: string;
};

const AddressRowName = forwardRef<AddressRowNameProps, "p">((props, ref) => {
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
