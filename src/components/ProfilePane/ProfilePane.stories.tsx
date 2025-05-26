import type { Meta, StoryObj } from "@storybook/react";
import ProfilePane from "./ProfilePane";

const meta = {
  title: "Components/ProfilePane",
  component: ProfilePane,
} satisfies Meta<typeof ProfilePane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleA: Story = {
  args: {
    profileImage: "http://192.168.0.20:7999/performer/12/image?t=1743556430",
    images: [],
  },
};
