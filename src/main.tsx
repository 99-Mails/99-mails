import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { StoreProvider } from "./services/store/store";
import { DialogProvider } from "./services/alertDialog/alertDialog";
import { theme } from "./ui/theme";
import { client } from "./services/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <ApolloProvider client={client}>
          <DialogProvider>
            <App />
          </DialogProvider>
        </ApolloProvider>
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);
