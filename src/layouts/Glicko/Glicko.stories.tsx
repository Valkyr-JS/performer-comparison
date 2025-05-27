import type { Meta, StoryObj } from "@storybook/react";
import Glicko from "./Glicko";

const meta = {
  title: "Layouts/Glicko",
  component: Glicko,
} satisfies Meta<typeof Glicko>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
