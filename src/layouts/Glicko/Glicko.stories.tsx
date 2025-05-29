import type { Meta, StoryObj } from "@storybook/react";
import Glicko from "./Glicko";
import { fn } from "@storybook/test";

const meta = {
  title: "Layouts/Glicko",
  component: Glicko,
} satisfies Meta<typeof Glicko>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    abandonTournamentHandler: fn(),
    endTournamentHandler: fn(),
    filter: {
      genders: ["FEMALE" as GenderEnum],
      limit: 5,
    },
    pauseTournamentHandler: fn(),
  },
};
