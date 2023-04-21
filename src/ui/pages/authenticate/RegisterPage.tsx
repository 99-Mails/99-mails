/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import {
  Flex,
  Center,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Input,
  Container,
} from "@chakra-ui/react";
import { PageHead } from "@/ui/components/PageHead";
import { Logo } from "@/ui/components/Logo";
import { useRegister } from "@/application/authenticate/register";
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string().email("Must be a valid email."),
  password: Yup.string()
    .max(16, "Must be less than 16 characters.")
    .min(8, "Must be more than 8 characters."),
});

const RegisterPage = () => {
  const login = useRegister();
  const router = useHistory();

  return (
    <>
      <PageHead title="99 Mails | Safe Disposable Email Service" />

      <Container minH="100vh">
        <Center mt="12">
          <Logo
            onClick={() => router.push("/")}
            _hover={{
              cursor: "pointer",
            }}
          />
        </Center>

        <Center>
          <Flex
            direction="column"
            w="lg"
            h="90vh"
            justifyContent="center"
            gap="5"
          >
            <Heading textAlign="center">Register</Heading>

            <Flex>
              <Button>Google</Button>
            </Flex>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={schema}
              validateOnChange={true}
              onSubmit={(values, actions) => {
                login.registerByEmail(values);
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <Flex flexDirection="column" gap="3">
                    <FormControl>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                      />
                      <FormHelperText>{props.errors.email}</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Input
                        name="password"
                        type="password"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                      />
                      <FormHelperText>{props.errors.password}</FormHelperText>
                    </FormControl>

                    <Button
                      isDisabled={!props.isValid}
                      isLoading={login.isLoggingIn}
                      type="submit"
                      colorScheme="blue"
                    >
                      Sign Up
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Center>
      </Container>
    </>
  );
};

export default RegisterPage;
