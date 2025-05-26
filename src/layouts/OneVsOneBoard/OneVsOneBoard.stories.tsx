import type { Meta, StoryObj } from "@storybook/react";
import OneVsOneBoard from "./OneVsOneBoard";

const url = import.meta.env.STORYBOOK_STASH_SERVER;

const meta = {
  title: "Boards/One vs. One",
  component: OneVsOneBoard,
} satisfies Meta<typeof OneVsOneBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profiles: [
      {
        id: "12",
        cover: url + "/performer/12/image?t=1743556430",
        name: "Performer A",
      },
      {
        id: "99",
        cover: url + "/performer/99/image?t=1746745345",
        name: "Performer B",
      },
    ],
  },
};
