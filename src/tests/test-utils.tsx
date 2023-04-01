import React from "react";
import { render } from "@testing-library/react";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import { IStoreContext, StoreContext } from "@/services/store/store";

const renderWithContext = (
  ui: React.ReactElement,
  { storeProps, ...restOptions }: { storeProps: IStoreContext }
) =>
  render(ui, {
    wrapper: ({ children }) => {
      return (
        <StoreContext.Provider value={storeProps}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </StoreContext.Provider>
      );
    },
    ...restOptions,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { renderWithContext };
export { render };
