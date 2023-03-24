import { AddIcon, MinusIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Flex,
  Card,
  Link,
  Text,
  CardBody,
  CardHeader,
  CardFooter,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionItemProps,
  forwardRef,
} from "@chakra-ui/react";
import type { MailSummary } from "@/domains/Mail";

const InboxHeadItem = ({ text, value }: { text: string; value: string }) => {
  return (
    <Flex gap="4">
      <Text as="b">{text}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

type InboxItemProps = AccordionItemProps & {
  mail: MailSummary;
};

const InboxItem = forwardRef<InboxItemProps, "div">((props, ref) => {
  const { mail, ...restProps } = props;
  const { headerSubject, toAddr, fromAddr, text, downloadUrl } = mail;

  return (
    <AccordionItem ref={ref} {...restProps}>
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
              <Link color="blue" href={downloadUrl.href} target="_blank">
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
});

export { InboxHeadItem };
export default InboxItem;
