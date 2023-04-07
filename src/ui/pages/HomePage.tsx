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
import { useGenerateSession } from "@/application/generateSession";
import ErrorBoundary, { ErrorFallback } from "@/ui/components/ErrorBoundary";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const { generateSession } = useGenerateSession();

  useEffect(() => {
    generateSession();
  }, []);

  const HeaderColor = useColorModeValue("gray.800", "white");
  const DescriptionColor = useColorModeValue("gray.600", "white");

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>99 Mails | Safe Disposable Email Service</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="icon" type="image/png" href="logo.png" sizes="16x16" />
      </Helmet>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Flex flexDirection="column" gap="8" mb="2">
          <Center flex="1" flexDirection="column" gap="16" mt="16">
            <Heading
              as="b"
              fontSize="6xl"
              textAlign="center"
              fontWeight="extrabold"
              color={HeaderColor}
            >
              <Text as="b" fontWeight="extrabold">
                User friendly, 🔒 Safe
              </Text>{" "}
              and ⏰ available temporary ✉️ email service.
            </Heading>
            <Address />
            <Text
              as="b"
              fontSize="xl"
              w="4xl"
              textAlign="center"
              color={DescriptionColor}
            >
              Forget about <Text as="u">📩 spam</Text>,{" "}
              <Text as="u">📯 advertising mailings</Text>,{" "}
              <Text as="u">😈 hacking</Text> and{" "}
              <Text as="u">🤖 attacking robots</Text>. Keep your real mailbox
              clean and secure. 99 Mails provides temporary, secure, anonymous,
              free, disposable 📮 email address.
            </Text>
          </Center>
          <Box mt="8">
            <InboxContainer />
          </Box>
          <Center flex="1" flexDirection="column" mt="8" gap="4">
            <Heading as="h2">What is Disposable Temporary E-mail?</Heading>
            <Text
              as="p"
              fontSize="xl"
              w="4xl"
              textAlign="justify"
              color={DescriptionColor}
            >
              <Text as="b">Disposable email</Text> - is a free email service
              that allows to receive email at a temporary address that
              self-destructed after a certain time elapses. It is also known by
              names like : tempmail, 10minutemail, 10minmail, throwaway email,
              fake-mail , fake email generator, burner mail or trash-mail. Many
              forums, Wi-Fi owners, websites and blogs ask visitors to register
              before they can view content, post comments or download something.
              Temp-Mail - is most advanced throwaway email service that helps
              you avoid spam and stay safe.
            </Text>
          </Center>
        </Flex>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
