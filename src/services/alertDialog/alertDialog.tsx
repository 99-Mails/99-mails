import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { createContext, useCallback, useRef, useState } from "react";

interface IDialogContext {
  isOpen: boolean;
  onOpen?: Fn;
  onClose?: Fn;
  getConfirmation?: Fn;
  setButtonLoading?: Fn;
  setHeader?: Fn;
  setBody?: Fn;
}

export const DialogContext = createContext<IDialogContext>({ isOpen: false });

// TODO: should move component to separate file
// TODO: should move component origin to a react-portal
const DialogProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setButtonLoading] = useState(false);
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("fff");
  const [resolver, setResolver] = useState({ resolve: null });
  const cancelRef = useRef();

  const createPromise = () => {
    let resolver;
    return [
      new Promise((resolve) => {
        resolver = resolve;
      }),
      resolver,
    ];
  };

  const getConfirmation = async (arg) => {
    setBody(arg.body);
    setHeader(arg.header);
    onOpen();
    const [promise, resolve] = await createPromise();
    setResolver({ resolve });
    return promise;
  };

  const onClick = async (status) => {
    resolver.resolve(status);
  };

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        getConfirmation,
        setButtonLoading,
        setHeader,
        setBody,
      }}
    >
      {children}

      <AlertDialog
        isCentered={true}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>{body}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                data-testid="alert-dialog-deny"
                onClick={() => onClick(false)}
              >
                Cancel
              </Button>
              <Button
                data-testid="alert-dialog-accept"
                colorScheme="red"
                onClick={() => onClick(true)}
                ml={3}
                isLoading={loading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </DialogContext.Provider>
  );
};

export { DialogProvider };
