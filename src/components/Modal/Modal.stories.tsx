import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EndGlicko: Story = {
  args: {
    children: <p>Would you like to submit and view the results?</p>,
    buttons: [],
    show: true,
    title: "Tournament complete",
  },
};
