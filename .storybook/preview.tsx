import React from "react";
import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "./stash.index.css";
import ApolloWrapper from "../src/apollo/Wrapper";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ApolloWrapper>
        <Story />
      </ApolloWrapper>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: "requiredFirst",
    },
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone5",
    },
  },
  tags: ["autodocs"],
};

export default preview;
