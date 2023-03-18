import { useEffect, useState, default as React } from "react";
import Address from "../components/Address/Address";
import InboxContainer from "../components/Inbox";
import {
  Heading,
  Flex,
  Center,
  Image,
  Alert,
  Stack,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { useResetSession } from "../../application/resetSession";
import MenuDomainContainer from "../components/MenuDomains";
import useAddAddressToSession from "../../application/addAddressToSession";
import type { Domain } from "../../domains/Domain";
import { INITIAL_DOMAIN } from "../../constants/domain";
import ErrorBoundary, { ErrorFallback } from "../components/ErrorBoundary";

const HomePage = () => {
  const { resetSession } = useResetSession();
  const { doAddAddressToSession } = useAddAddressToSession();

  useEffect(() => {
    resetSession();
  }, []);

  const [domain, setDomain] = useState<Domain>(INITIAL_DOMAIN);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Flex flexDirection="column" gap="4" mb="2">
          <Image src="https://placehold.co/1200x200/orange/white" />
          <Center>
            <Heading data-testid="header">Disposable email service</Heading>
          </Center>
          <Address />
          {/* <SelectDomains onChange={(e) => setDomain(e.target.value)} /> */}
          <Stack spacing={4} direction="row" align="center" mb="4">
            <Button
              name="reset-session"
              data-testid="reset-session-btn"
              onClick={() => resetSession()}
              size="sm"
            >
              Reset Session
            </Button>
            <MenuDomainContainer
              onClick={() => doAddAddressToSession(domain)}
              domain={domain}
              setDomain={setDomain}
            />
            <Button as={Checkbox} size="sm">
              Forwarding
            </Button>
            <Button
              as={Checkbox}
              size="sm"
              _checked={{ background: "blue.300" }}
            >
              Restore Access
            </Button>
          </Stack>
          <InboxContainer />
          <Alert status="info">
            Your disposable mailbox is valid until you refresh this page. 10
            minutes is not a limit any more!
          </Alert>
        </Flex>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
