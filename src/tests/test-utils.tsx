import React from "react";
import { render } from "@testing-library/react";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import { IStoreContext, StoreContext } from "@/services/store/store";
import { Provider } from "react-redux";
import { store } from "@/services/redux";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/ui/theme";

const renderWithContext = (
  ui: React.ReactElement,
  { storeProps, ...restOptions }: { storeProps: IStoreContext }
) =>
  render(ui, {
    wrapper: ({ children }) => {
      return (
        <ChakraProvider theme={theme}>
          <StoreContext.Provider value={storeProps}>
            <ApolloProvider client={client}>
              <Provider store={store}>{children}</Provider>
            </ApolloProvider>
          </StoreContext.Provider>
        </ChakraProvider>
      );
    },
    ...restOptions,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { renderWithContext };
export { render };
