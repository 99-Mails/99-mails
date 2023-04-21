import React, { useState } from "react";
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { supabase } from "@/services/supabaseClient";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')

  const handleLogin = async (e: Event) => {
    e.preventDefault;

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the login link!')
    }

    setLoading(false)
  }

  return (
    <Flex>
      <Box>
        <Heading>Login</Heading>
        <Text>Sign in via magic link with your email below</Text>
      </Box>
    </Flex>
  )
}

export { Auth };
