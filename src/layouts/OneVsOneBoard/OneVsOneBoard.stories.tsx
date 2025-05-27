import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import OneVsOneBoard from "./OneVsOneBoard";

const url = import.meta.env.STORYBOOK_STASH_SERVER;

const meta = {
  title: "Boards/One vs. One",
  component: OneVsOneBoard,
  args: {
    clickSkipHandler: fn(),
    clickStopHandler: fn(),
    clickUndoHandler: fn(),
    profiles: [
      {
        changeImageHandler: fn(),
        clickSelectHandler: fn(),
        id: "12",
        imageSrc: url + "/performer/12/image?t=1743556430",
        name: "Performer A",
        rank: 1586,
      },
      {
        changeImageHandler: fn(),
        clickSelectHandler: fn(),
        id: "3",
        imageSrc: url + "/performer/3/image?t=1746745345",
        name: "Performer B",
        rank: 1145,
      },
    ],
  },
} satisfies Meta<typeof OneVsOneBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
