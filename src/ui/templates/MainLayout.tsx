import { Container } from "@chakra-ui/react";

const MainLayout = (props) => {
  const { children } = props;

  return <Container maxW={"container.xl"}>{children}</Container>;
};

export default MainLayout;
