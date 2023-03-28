import {
  Tag,
  Flex,
  Card,
  Text,
  Center,
  Heading,
  Spinner,
  CardHeader,
  Accordion,
  FlexProps,
  forwardRef,
  AccordionProps,
} from "@chakra-ui/react";
import { useFetchIncomingEmails } from "@/services/api";
import { useTempEmail } from "@/services/tempEmailAdaptor";
import type { Mail } from "@/domains/Mail";
import ErrorBoundary, { ErrorFallback } from "../ErrorBoundary";
import { default as InboxItem } from "./InboxItem";
import { useEffect } from "react";

type InboxBodyProps = AccordionProps & {
  children: React.ReactElement[] | React.ReactElement;
};

const InboxBody = forwardRef<InboxBodyProps, "div">((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <Accordion ref={ref} allowMultiple {...restProps}>
      {children}
    </Accordion>
  );
});

type InboxWrapperProps = FlexProps & {
  children: React.ReactElement[] | React.ReactElement;
  reset: () => void;
};

const InboxWrapper = forwardRef<InboxWrapperProps, "div">((props, ref) => {
  const { children, reset, ...restProps } = props;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Flex ref={ref} flexDirection={"column"} gap="4" {...restProps}>
        {children}
      </Flex>
    </ErrorBoundary>
  );
});

const InboxContainer = () => {
  const { sessionID } = useTempEmail();
  const { data, loading, error, refetch } = useFetchIncomingEmails(sessionID);

  // useEffect(() => {
  //   function updateExpiresAt() {
  //     if (!loading) {
  //       setExpiresAt(new Date(data?.session?.expiresAt).getTime());
  //     }
  //   }
  //   updateExpiresAt();

  //   return (() => setExpiresAt(0))
  // }, [data]);

  return (
    <InboxWrapper data-testid="inbox-wrapper" reset={() => refetch()}>
      <Heading size="xs">
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize="3xl">Inbox</Text>
          <Tag data-testid="inbox-emails-count" bg="gray.500" color="white">
            {data?.session.mails.length}
          </Tag>
        </Flex>
      </Heading>
      {!data?.session.mails.length && (
        <Card bg="gray.100">
          <CardHeader>
            <Heading size="md">No Emails Yet!</Heading>
          </CardHeader>
        </Card>
      )}
      <InboxBody data-testid="inbox-body">
        {error && (
          <Center>
            <Text>Error!</Text>
          </Center>
        )}
        {loading && (
          <Center>
            <Spinner />
          </Center>
        )}
        {data &&
          data.session.mails.map((mail: Mail, index: number) => (
            <InboxItem data-testid="inbox-item" key={index} mail={mail} />
          ))}
      </InboxBody>
    </InboxWrapper>
  );
};

export { InboxContainer, InboxBody };
