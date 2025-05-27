import type { Meta, StoryObj } from "@storybook/react";
import Glicko from "./Glicko";

const meta = {
  title: "Layouts/Glicko",
  component: Glicko,
} satisfies Meta<typeof Glicko>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filter: {
      gender: {
        male: false,
        female: true,
        transMale: false,
        transFemale: false,
        intersex: false,
        nonBinary: false,
      },
    },
  },
};
