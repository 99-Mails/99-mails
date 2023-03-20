import type { Address } from "../../../domains/Address";
import {
  Tag,
  Flex,
  Text,
  Center,
  IconButton,
  useClipboard,
  useDisclosure,
  forwardRef,
  IconButtonProps,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useDeleteAddressFromSession from "../../../application/deleteAddressFromSession";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
// import { useAlertDialog } from "../../../services/alertDialogAdaptor"
// import { DialogContext } from "../../../contexts/alertDialog";
import { useAlertDialog } from "../../../services/alertDialog/alertDialogAdaptor";

const AddressRowButton = forwardRef<IconButtonProps, "button">((props, ref) => {
  return <IconButton ref={ref} {...props} />;
});

const AddressRowName = ({ name }: { name: string }) => {
  return (
    <Text data-testid="email-address" fontSize="3xl">
      {name}
    </Text>
  );
};

const AddressRowCount = ({ count }: { count: number }) => {
  return (
    <Tag data-testid="email-count" bg="gray.500" color="white">
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
  // const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setValue(address.address);
  }, []);

  // const { openDialog } = useAlertDialog()
  // alert.setOpen(true);

  return (
    <Flex gap={2} alignItems={"center"}>
      <AddressRowName name={address.address} />
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
      <AddressRowCount count={count} />
    </Flex>
  );
};

export default AddressRow;
