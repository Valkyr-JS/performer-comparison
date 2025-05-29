import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import OneVsOneBoard from "./OneVsOneBoard";
import { Glicko2 } from "glicko2";

const url = import.meta.env.STORYBOOK_STASH_SERVER;
const tournament = new Glicko2();

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
    matchIndex: 0,
    profiles: [
      {
        id: "12",
        imageID: "0",
        imageSrc: url + "/performer/12/image?t=1743556430",
        name: "Performer A",
        player: tournament.makePlayer(1586),
      },
      {
        id: "3",
        imageID: "0",
        imageSrc: url + "/performer/3/image?t=1746745345",
        name: "Performer B",
        player: tournament.makePlayer(1145),
      },
    ],
  },
} satisfies Meta<typeof OneVsOneBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
