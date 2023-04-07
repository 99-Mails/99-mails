import { Divider, Center, Flex, HStack, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex mt="12" bg="gray.700" h="44" flexDirection="column">
      <HStack flex="1" gap="20" justifyContent="center">
        <Link color="white">Premium</Link>
        <Link color="white">Privacy</Link>
        <Link color="white">Terms</Link>
        <Link color="white">Faq</Link>
        <Link color="white">Contacts</Link>
      </HStack>

      <Center flex="1" flexDirection="column" justifyContent="start">
        <Divider bg="white" orientation="horizontal" maxW="4xl" mt="0" />
      </Center>
    </Flex>
  );
};

export { Footer };
