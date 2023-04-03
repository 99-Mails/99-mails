import {
  Box,
  Tag,
  Flex,
  Card,
  Text,
  Center,
  Heading,
  Spinner,
  CardHeader,
  CardBody,
  Accordion,
  FlexProps,
  forwardRef,
  AccordionProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFetchIncomingEmails } from "@/services/api";
import { useTempEmail } from "@/services/tempEmailAdaptor";
import type { Mail } from "@/domains/Mail";
import ErrorBoundary, { ErrorFallback } from "../ErrorBoundary";
import { InboxItem } from "./InboxItem";
import { PropsWithChildren, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

type InboxBodyProps = AccordionProps & PropsWithChildren;

const InboxBody = forwardRef<InboxBodyProps, "div">((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <Accordion ref={ref} allowMultiple {...restProps}>
      {children}
    </Accordion>
  );
});

type InboxWrapperProps = FlexProps &
  PropsWithChildren & {
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

  const InboxWrapperBg = useColorModeValue("gary.300", "blue.300");
  const InboxBodyBg = useColorModeValue("gray.100", "blue.100");
  const InboxEmptyTextColor = useColorModeValue("gray.500", "blue.900");

  // const { playRelaxingEffect } = useSoundEffects();

  // useEffect(() => {
  //   playRelaxingEffect()
  // }, [data])

  return (
    <InboxWrapper data-testid="inbox-wrapper" reset={() => refetch()}>
      <Heading size="xs">
        <Flex gap={2} alignItems={"center"} justifyContent="center">
          <Text fontSize="5xl">Inbox</Text>
          <Tag data-testid="inbox-emails-count" bg="gray.500" color="white">
            {data?.session.mails.length}
          </Tag>
        </Flex>
      </Heading>

      <Card
        bg={InboxWrapperBg}
        border="3px"
        borderColor="blue.500"
        borderStyle="solid"
      >
        <CardHeader>
          <Flex flex="1" flexDirection="row" justifyContent="space-between">
            <Heading size="md">No Emails Yet!</Heading>
            <Box>{loading && <Spinner />}</Box>
          </Flex>
        </CardHeader>
        <CardBody bg={InboxBodyBg} p="0">
          <Center
            flex="1"
            flexDirection="column"
            gap="3"
            minH="80"
            justifyContent="start"
          >
            {!data?.session.mails.length && (
              <Flex
                flexGrow="1"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minH="fit-content"
                data-testid="empty-inbox"
              >
                <Text fontSize="6xl">📨</Text>
                <Text as="b" fontSize="xl" color={InboxEmptyTextColor}>
                  Your inbox is empty.
                </Text>
              </Flex>
            )}
            <InboxBody data-testid="inbox-body" w="100%">
              {error && (
                <Center>
                  <Text>Error!</Text>
                </Center>
              )}
              {data &&
                data.session.mails.map((mail: Mail, index: number) => (
                  <InboxItem
                    data-testid="inbox-item"
                    key={index}
                    mail={mail}
                    w="full"
                  />
                ))}
            </InboxBody>
          </Center>
        </CardBody>
      </Card>
    </InboxWrapper>
  );
};

export { InboxContainer, InboxBody };
