import { PropsWithChildren } from "react";
import { Container, Box, Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box h="calc(100vh)">
      <Grid
        templateAreas={`"nav header"
            "nav main"`}
        gridTemplateRows={"100px 1fr"}
        gridTemplateColumns={"184px 1fr"}
        minH="full"
        color="black"
        border="8px"
        borderColor="blue.500"
      >
        <GridItem p="7" bg="white" area={"header"}>
          Header
        </GridItem>
        <GridItem
          position="fixed"
          w="184px"
          h="99vh"
          zIndex="10"
          p="4"
          bg="white"
          area={"nav"}
          borderRight="4px"
          borderRightColor="blue.500"
          borderBottom="8px"
          borderBottomColor="blue.500"
        >
          <Sidebar />
        </GridItem>
        <GridItem bg="white" area={"main"}>
          <Container maxW={"container.xl"} mt="18">
            {children}
          </Container>
        </GridItem>
      </Grid>
    </Box>
  );
};

export { DashboardLayout };
