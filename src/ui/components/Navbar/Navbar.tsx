import { LockIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Button,
  Spinner,
  Box,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Suspense } from "react";
import { Logo } from "../Logo";
import { Timer } from "../Timer";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useSelector } from "react-redux";
import { useGenerateSession } from "@/application/generateSession";

const Navbar = () => {
  // @ts-ignore
  const addressTimerState = useSelector((state) => state.addressTimer);

  const { isSoundEffect, toggleSoundEffect } = useSoundEffects();
  const { colorMode, toggleColorMode } = useColorMode();

  const { generateSession, loadingSession } = useGenerateSession();

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
        <Button
          size="sm"
          minW="75px"
          justifyContent="center"
          isLoading={loadingSession}
          colorScheme={addressTimerState?.isDisabled ? "red" : "linkedin"}
          onClick={() => generateSession()}
        >
          {addressTimerState?.isDisabled ? (
            <Text>Reset Address</Text>
          ) : (
            <Suspense fallback={<Spinner />}>
              <Timer
                time={addressTimerState?.seconds}
                isDisabled={addressTimerState?.isDisabled}
              />
            </Suspense>
          )}
        </Button>
        <Button
          size="sm"
          leftIcon={<Box>👑</Box>}
          colorScheme="yellow"
          variant="solid"
          onClick={() => console.log("premium user should login")}
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
