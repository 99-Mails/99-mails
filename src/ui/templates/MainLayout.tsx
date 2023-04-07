import { PropsWithChildren } from "react";
import { Container } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const MainLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      <Container maxW={"container.xl"}>{children}</Container>
      <Footer />
    </>
  );
};

export default MainLayout;
