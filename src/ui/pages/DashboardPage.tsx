import { useEffect } from "react";
import { Address } from "@/ui/components/Address";
import { InboxContainer } from "@/ui/components/Inbox/Inbox";
import {
  Box,
  Flex,
  Text,
  Center,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import ErrorBoundary, { ErrorFallback } from "@/ui/components/ErrorBoundary";
import { PageHead } from "../components/PageHead";

const DashboardPage = () => {
  const HeaderColor = useColorModeValue("gray.800", "white");
  const DescriptionColor = useColorModeValue("gray.600", "white");

  return (
    <>
      <PageHead title="99 Mails | Safe Disposable Email Service" />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Flex flexDirection="column" gap="8" mb="2">
          <Center flex="1" flexDirection="column" gap="16" mt="16">
            In Dashboard
          </Center>
        </Flex>
      </ErrorBoundary>
    </>
  );
};

export { DashboardPage };
