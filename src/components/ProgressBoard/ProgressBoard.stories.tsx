import type { Meta, StoryObj } from "@storybook/react";
import ProgressBoard from "./ProgressBoard";

const meta = {
  title: "Components/Progress board",
  component: ProgressBoard,
} satisfies Meta<typeof ProgressBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
