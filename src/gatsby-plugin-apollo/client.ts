import fetch from "isomorphic-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://192.168.0.20:7999/graphql/",
    fetch,
  }),
});

export default client;
