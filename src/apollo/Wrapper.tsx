import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? import.meta.env.STORYBOOK_STASH_SERVER + "/graphql"
      : "/graphql",
  cache: new InMemoryCache(),
});

const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
