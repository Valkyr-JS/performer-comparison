import type { Meta, StoryObj } from "@storybook/react";
import ProfilePane from "./ProfilePane";

const serverURL = import.meta.env.STORYBOOK_STASH_SERVER;

const meta = {
  title: "Components/ProfilePane",
  component: ProfilePane,
} satisfies Meta<typeof ProfilePane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleA: Story = {
  args: {
    images: [
      serverURL + "/performer/12/image?t=1743556430",
      serverURL + "/image/38822/image?t=1746814733",
      serverURL + "/image/109403/image?t=1746367355",
    ],
    name: "Danielle",
    thumbs: [
      serverURL + "/performer/12/image?t=1743556430",
      serverURL + "/image/38822/thumbnail?t=1746814733",
      serverURL + "/image/109403/thumbnail?t=1746367355",
    ],
  },
};
