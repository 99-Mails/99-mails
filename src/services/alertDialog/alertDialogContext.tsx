import { Portal, useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect, useRef, useState } from "react";
import AlertDialogWrapper from "./alertDialog";

interface IDialogContext {
  isOpen: boolean;
  onOpen?: Fn;
  onCancel?: Fn;
  onClose?: Fn;
  getConfirmation?: Fn;
  setButtonLoading?: Fn;
  setHeader?: Fn;
  setBody?: Fn;
  signal?: AbortSignal;
}

export const DialogContext = createContext<IDialogContext>({
  isOpen: false,
});

// TODO: code smell
// TODO: improve typing
// TODO: should move component origin to a react-portal
const DialogProvider = ({ children }) => {
  const abortControllerRef = useRef(new AbortController());

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setButtonLoading] = useState(false);
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [resolver, setResolver] = useState({ resolve: null });

  const cancelRef = useRef();

  const createPromise = () => {
    let resolver: Fn;
    return [
      new Promise((resolve) => {
        resolver = resolve;
      }),
      resolver,
    ];
  };

  const getConfirmation = (arg: any) => {
    setBody(arg.body);
    setHeader(arg.header);
    onOpen();
    const [promise, resolve] = createPromise();
    setResolver({ resolve });
    return promise;
  };

  const onClick = async (status) => {
    resolver.resolve(status);
  };

  // TODO: fix re-fetch after an a request abortion
  const onCancel = () => {
    abortControllerRef.current.abort();
    setButtonLoading(false);
    setBody("");
    setHeader("");
    onClose();
  };

  // TODO: not working!
  // useEffect(() => {
  //   if (abortControllerRef.current.signal.aborted) {
  //     onClose();
  //     setButtonLoading(false);
  //   }
  // }, [abortControllerRef.current.signal.aborted]);

  const value = {
    isOpen,
    onOpen,
    onCancel,
    onClose,
    getConfirmation,
    setButtonLoading,
    setHeader,
    setBody,
    signal: abortControllerRef.current.signal,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Portal>
        <AlertDialogWrapper
          body={body}
          cancelRef={cancelRef}
          header={header}
          isOpen={isOpen}
          isLoading={loading}
          isCancelable={!loading}
          onClick={onClick}
          onCancel={onCancel}
          onClose={onClose}
        />
      </Portal>
    </DialogContext.Provider>
  );
};

export { DialogProvider };
