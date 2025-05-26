import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import OneVsOneBoard from "./OneVsOneBoard";

const url = import.meta.env.STORYBOOK_STASH_SERVER;

const meta = {
  title: "Boards/One vs. One",
  component: OneVsOneBoard,
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
} satisfies Meta<typeof OneVsOneBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Test that the change profile image button updates the current profile image. */
export const ChangeProfileImage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const changeImgBtn = canvas.getByRole("button", {
      name: /Change image for Performer A/i,
    });
    const profileImg = canvas.getByAltText<HTMLImageElement>("Performer A");
    const profileImgSrc = profileImg.src;

    await expect(changeImgBtn).toBeInTheDocument();
    await expect(profileImg).toBeInTheDocument();
    await userEvent.click(changeImgBtn);
    await expect(profileImg.src).not.toBe(profileImgSrc);
  },
};
