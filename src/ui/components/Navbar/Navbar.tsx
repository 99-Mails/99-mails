import { FancyDate } from "@/lib/date";
import { LockIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Button,
  Tag,
  Spinner,
  Box,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Logo } from "../Logo";
import { Timer } from "../Timer";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const Navbar = () => {
  const [disabled, disableAddress] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");

  const { isSoundEffect, toggleSoundEffect } = useSoundEffects();

  useEffect(() => {
    const timer = setTimeout(() => disableAddress(true), 10 * 60000);
    return () => clearTimeout(timer);
  }, []);

  useMemo(() => {
    setExpiresAt(new FancyDate().getDateWithMinutesFromNow(10));
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex p="6" justifyContent="space-between" alignItems="center">
      <Logo />
      <HStack gap="1">
        <IconButton
          size="sm"
          icon={
            isSoundEffect ? (
              <FaBell size="25px" color="gray" />
            ) : (
              <FaBellSlash size="30px" color="gray" />
            )
          }
          aria-label="github-link"
          bg="transparent"
          onClick={toggleSoundEffect}
        />
        <IconButton
          size="sm"
          icon={
            colorMode === "dark" ? (
              <SunIcon boxSize={6} color="gray" />
            ) : (
              <MoonIcon boxSize={6} color="gray" />
            )
          }
          aria-label="github-link"
          bg="transparent"
          onClick={toggleColorMode}
        />
        <Tag minW="75px" size="lg" justifyContent="center" colorScheme="blue">
          <Suspense fallback={<Spinner />}>
            <Timer expiresAt={expiresAt} isDisabled={disabled} />
          </Suspense>
        </Tag>
        <Button
          size="sm"
          leftIcon={<Box>👑</Box>}
          colorScheme="yellow"
          variant="solid"
        >
          Premium
        </Button>
        <Button
          size="sm"
          leftIcon={<LockIcon />}
          colorScheme="blue"
          variant="solid"
        >
          Login
        </Button>
      </HStack>
    </Flex>
  );
};

export { Navbar };
