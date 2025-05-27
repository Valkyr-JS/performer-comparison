import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import OneVsOneBoard from "./OneVsOneBoard";

const url = import.meta.env.STORYBOOK_STASH_SERVER;

const meta = {
  title: "Boards/One vs. One",
  component: OneVsOneBoard,
  args: {
    clickFiltersHandler: fn(),
    clickSelectHandler: fn(),
    clickSkipHandler: fn(),
    clickStopHandler: fn(),
    clickUndoHandler: fn(),
    profiles: [
      {
        id: "12",
        cover: url + "/performer/12/image?t=1743556430",
        name: "Performer A",
      },
      {
        id: "3",
        cover: url + "/performer/3/image?t=1746745345",
        name: "Performer B",
      },
    ],
  },
} satisfies Meta<typeof OneVsOneBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
