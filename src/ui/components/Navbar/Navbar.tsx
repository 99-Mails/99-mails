import { LockIcon, MoonIcon, SunIcon, ExternalLinkIcon } from "@chakra-ui/icons";
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
import { useSelector } from "react-redux";
import { useGenerateSession } from "@/application/generateSession";
import { useHistory } from "react-router-dom";
import { useLogin } from "@/application/authenticate/login";

const Navbar = () => {
  const addressTimerState = useSelector((state) => state.addressTimer);
  const { colorMode, toggleColorMode } = useColorMode();
  const { generateSession, loadingSession } = useGenerateSession();

  const router = useHistory();
  const login = useLogin();

  return (
    <Flex p="6" justifyContent="space-between" alignItems="center">
      <Logo />
      <HStack gap="1">
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
          leftIcon={login.alreadyLogined ? <ExternalLinkIcon /> : <LockIcon />}
          colorScheme="blue"
          variant="solid"
          onClick={() => router.push("/login")}
        >
          {login.alreadyLogined ? "Dashboard" : "Login"}
        </Button>
      </HStack>
    </Flex>
  );
};

export { Navbar };
