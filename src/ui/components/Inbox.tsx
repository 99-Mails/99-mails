import { AddIcon, MinusIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Tag,
  Flex,
  Card,
  Link,
  Text,
  Center,
  Heading,
  Spinner,
  CardBody,
  CardHeader,
  CardFooter,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useEmail } from "../../services/api";
import { useStore } from "../../services/storeService";

const InboxHeadItem = ({ text, value }) => {
  return (
    <Flex gap="4">
      <Text as="b">{text}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

const InboxItem = ({ mail }) => {
  const { headerSubject, text, fromAddr, downloadUrl, rawSize, toAddr } = mail;

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <Card boxShadow="none" border="1px" borderColor="gray.200">
          <h2>
            <AccordionButton>
              {isExpanded ? (
                <>
                  <CardHeader flex="1" flexDirection="row" textAlign="left">
                    <InboxHeadItem text="Subject:" value={headerSubject} />
                    <InboxHeadItem text="Recipient:" value={toAddr} />
                    <InboxHeadItem text="Sender:" value={fromAddr} />
                    <InboxHeadItem text="Received at:" value={"now"} />
                  </CardHeader>
                  <MinusIcon fontSize="12px" />
                </>
              ) : (
                <>
                  <CardHeader as="span" flex="1" textAlign="left">
                    <Text as="b">{headerSubject}</Text>
                  </CardHeader>
                  <AddIcon fontSize="12px" />
                </>
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <CardBody border="1px" borderColor="gray.300" p="3">
              {text}
            </CardBody>
            <CardFooter>
              <Link color="blue" href={downloadUrl} target="_blank">
                <Flex gap="2" alignItems="center">
                  <DownloadIcon />
                  Download Email
                </Flex>
              </Link>
            </CardFooter>
          </AccordionPanel>
        </Card>
      )}
    </AccordionItem>
  );
};

const InboxContainer = () => {
  const { sessionID } = useStore();

  const { fetchIncomingEmails } = useEmail();
  const { data, loading, error } = fetchIncomingEmails(sessionID);

  return (
    <>
      <Flex flexDirection={"column"} gap="4">
        <Heading size="xs">
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize="3xl">Inbox</Text>
            <Tag bg="gray.500" color="white">
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
        <Accordion allowMultiple>
          {loading && (
            <Center>
              <Spinner />
            </Center>
          )}
          {data &&
            data.session.mails.map((mail, index) => (
              <InboxItem key={index} mail={mail} />
            ))}
        </Accordion>
      </Flex>
    </>
  );
};

export { InboxItem };
export default InboxContainer;
