import type { Meta, StoryObj } from "@storybook/react";
import OneVsOneBoard from "./OneVsOneBoard";

const meta = {
  title: "Boards/One vs. One",
  component: OneVsOneBoard,
} satisfies Meta<typeof OneVsOneBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleA: Story = {};
