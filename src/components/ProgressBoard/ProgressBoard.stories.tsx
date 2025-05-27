import type { Meta, StoryObj } from "@storybook/react";
import ProgressBoard from "./ProgressBoard";

const meta = {
  title: "Components/Progress board",
  component: ProgressBoard,
  args: {
    columnTitles: ["Performer A", "Performer B"],
    tableData: [
      ["Lotti", "Sabine", 1],
      ["Marina", "Sabine", 1],
      ["Giselle", "Sabine", 0],
      ["Giselle", "Serenity", 0],
      ["Giselle", "Sophie", 0],
      ["Giselle", "Scarlett", 0],
      ["Giselle", "Rhian", 1],
      ["Kelly", "Rhian", 0],
      ["Kelly", "Lizz", 1],
      ["Sammy", "Lizz", 0],
    ],
    title: "Progress board",
  },
} satisfies Meta<typeof ProgressBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
