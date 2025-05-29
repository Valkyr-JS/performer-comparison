import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { SbDecApolloProvider } from "./decorators";
import "./stash.index.css";
import "@/scss/global.scss";

const preview: Preview = {
  decorators: [SbDecApolloProvider],
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
