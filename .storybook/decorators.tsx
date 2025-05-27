import React from "react";
import { ReactRenderer } from "@storybook/react";
import { DecoratorFunction } from "storybook/internal/types";
import ApolloWrapper from "../src/apollo/Wrapper";

/** Wrap a story in the Apollo client. */
export const SbDecApolloProvider: DecoratorFunction<ReactRenderer> = (
  StoryFn
) => {
  return <ApolloWrapper>{StoryFn()}</ApolloWrapper>;
};
