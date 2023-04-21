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
import { useLogin } from "@/application/authenticate/login";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Fn } from "@/types";

const schema = Yup.object({
  email: Yup.string().email("Must be a valid email."),
  password: Yup.string()
    .max(16, "Must be less than 16 characters.")
    .min(8, "Must be more than 8 characters."),
});

type LoginFormProps = {
  loginByEmail: Fn;
  isLoggingIn: boolean;
};

const LoginForm = (props: LoginFormProps) => {
  const { isLoggingIn, loginByEmail } = props;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={schema}
      validateOnChange={true}
      isInitialValid={false}
      onSubmit={(values) => {
        loginByEmail(values);
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
              isLoading={isLoggingIn}
              type="submit"
              colorScheme="blue"
            >
              Login
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

const LoginPage = () => {
  const login = useLogin();
  const router = useHistory();

  if (login.alreadyLogined) {
    router.push("/dashboard");
  }

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
            <Heading textAlign="center">Login</Heading>

            <LoginForm
              isLoggingIn={login.isLoggingIn}
              loginByEmail={login.loginByEmail}
            />
          </Flex>
        </Center>
      </Container>
    </>
  );
};

export default LoginPage;
