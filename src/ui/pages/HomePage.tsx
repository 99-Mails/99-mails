import { useEffect, useState, default as React } from "react";
import { Address } from "@/ui/components/Address";
import { InboxContainer } from "@/ui/components/Inbox/Inbox";
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
import { useResetSession } from "@/application/resetSession";
import useAddAddressToSession from "@/application/addAddressToSession";
import { filterByName } from "@/domains/Domain";
import ErrorBoundary, { ErrorFallback } from "@/ui/components/ErrorBoundary";
import { useListDomains } from "@/services/api";
import { default as MenuDomainContainer } from "@/ui/components/MenuButton";

const HomePage = () => {
  const { resetSession } = useResetSession();
  const { doAddAddressToSession } = useAddAddressToSession();
  const { data: DomainListResponse, loading: isDomainList } = useListDomains();

  useEffect(() => {
    resetSession();
  }, []);

  const [selectedDomain, setSelectedDomain] = useState("");
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    if (!isDomainList) {
      setDomains([...DomainListResponse.domains.map((domain) => domain.name)]);
    }
  }, [DomainListResponse, isDomainList]);

  return (
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
            initialValue="Random Address"
            data={domains}
            onClick={() =>
              doAddAddressToSession(
                filterByName(DomainListResponse.domains, selectedDomain)
              )
            }
            onChange={(e) => setSelectedDomain(e)}
          />
          <Button as={Checkbox} size="sm">
            Forwarding
          </Button>
          <Button as={Checkbox} size="sm" _checked={{ background: "blue.300" }}>
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
  );
};

export default HomePage;
