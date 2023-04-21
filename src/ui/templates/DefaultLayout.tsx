import { PropsWithChildren } from "react"
import { Container, Center } from "@chakra-ui/react";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Container maxW={"container.xl"}>
        <Center>
          {children}
        </Center>
      </Container>
    </>
  )
}

export default DefaultLayout;
