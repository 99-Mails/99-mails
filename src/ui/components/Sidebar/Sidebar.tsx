import { Link, useHistory } from "react-router-dom";
import { Box, Flex, VStack, Grid, GridItem } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineMailOpen, HiOutlineMail } from "react-icons/hi";
import { Logo } from "../Logo";

const Sidebar = () => {
  const router = useHistory();

  return (
    <Box>
      <Flex h="100px">
        <Logo
          onClick={() => router.push("/")}
          _hover={{
            cursor: "pointer",
          }}
        />
      </Flex>
      <Box py="16" fontSize="14px" height="75vh">
        <VStack>
          <Box w={"full"} alignItems={"flex-start"}>
            <Link to={"/dashboard/"}>
              <Grid
                templateAreas={`"icon text"`}
                gridTemplateColumns={"32px 1fr"}
                textAlign="left"
                alignItems="center"
                fontSize="md"
              >
                <GridItem area={"icon"}>
                  <AiFillHome size="20px" />
                </GridItem>
                <GridItem area={"text"}>
                  <span>Home</span>
                </GridItem>
              </Grid>
            </Link>
          </Box>
        </VStack>
        <VStack mt={"8"} gap="2">
          <Box position="relative" w="full" alignItems="flex-start">
            <Flex flexGrow="1"></Flex>
            <Flex
              position="absolute"
              top="0"
              flexGrow="none"
              flexDirection="column"
              gap="3"
            >
              <Link to={"/dashboard/instances"}>
                <Grid
                  templateAreas={`"icon text"`}
                  gridTemplateColumns={"32px 1fr"}
                  textAlign="left"
                  alignItems="center"
                  fontSize="md"
                >
                  <GridItem area={"icon"}>
                    <HiOutlineMailOpen size="20px" />
                  </GridItem>
                  <GridItem area={"text"}>
                    <span>Inbox</span>
                  </GridItem>
                </Grid>
              </Link>

              <Link to={"/dashboard/instances"}>
                <Grid
                  templateAreas={`"icon text"`}
                  gridTemplateColumns={"32px 1fr"}
                  textAlign="left"
                  alignItems="center"
                  fontSize="md"
                >
                  <GridItem area={"icon"}>
                    <HiOutlineMail size="20px" />
                  </GridItem>
                  <GridItem area={"text"}>
                    <span>New Email</span>
                  </GridItem>
                </Grid>
              </Link>
            </Flex>
          </Box>
        </VStack>
      </Box>
      <Flex h="100px">
        <Link to={"/dashboard/"}>
          <Grid
            templateAreas={`"icon text"`}
            gridTemplateColumns={"32px 1fr"}
            textAlign="left"
            alignItems="center"
            fontSize="md"
          >
            <GridItem area={"icon"}>
              <BiLogOut size="20px" />
            </GridItem>
            <GridItem area={"text"}>
              <Link to="/logout">Logout</Link>
            </GridItem>
          </Grid>
        </Link>
      </Flex>
    </Box>
  );
};

export { Sidebar };
