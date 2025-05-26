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
    profileImage: serverURL + "/performer/12/image?t=1743556430",
    images: [],
  },
};
