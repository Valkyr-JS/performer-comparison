import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import OneVsOneBoard from "./OneVsOneBoard";

const url = import.meta.env.STORYBOOK_STASH_SERVER;

const meta = {
  title: "Boards/One vs. One",
  component: OneVsOneBoard,
  args: {
    changeImageHandler: fn(),
    clickSelectHandler: fn(),
    clickPauseHandler: fn(),
    clickSkipHandler: fn(),
    clickStopHandler: fn(),
    clickUndoHandler: fn(),
    profiles: [
      {
        id: "12",
        imageID: "0",
        imageSrc: url + "/performer/12/image?t=1743556430",
        name: "Performer A",
        glicko: { deviation: 350, rating: 1586, volatility: 0.06 },
      },
      {
        id: "3",
        imageID: "0",
        imageSrc: url + "/performer/3/image?t=1746745345",
        name: "Performer B",
        glicko: { deviation: 350, rating: 1145, volatility: 0.06 },
      },
    ],
  },
} satisfies Meta<typeof OneVsOneBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
