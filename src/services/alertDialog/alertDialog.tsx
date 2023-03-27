import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

export default function AlertDialogWrapper({
  isOpen,
  cancelRef,
  onClick,
  onClose,
  onCancel,
  header,
  body,
  isLoading,
  isCancelable,
}: {
  isOpen: boolean;
  cancelRef: any;
  onClick: Fn;
  onClose: Fn;
  onCancel: Fn;
  header: string;
  body: string;
  isLoading: boolean;
  isCancelable: boolean;
}) {
  return (
    <AlertDialog
      data-testid="alert-dialog-root"
      isCentered={true}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            data-testid="alert-dialog-header"
            fontSize="lg"
            fontWeight="bold"
          >
            {header}
          </AlertDialogHeader>

          <AlertDialogBody data-testid="alert-dialog-body">
            {body}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              isDisabled={isCancelable}
              data-testid="alert-dialog-deny"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              data-testid="alert-dialog-accept"
              colorScheme="red"
              onClick={() => onClick(true)}
              ml={3}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
