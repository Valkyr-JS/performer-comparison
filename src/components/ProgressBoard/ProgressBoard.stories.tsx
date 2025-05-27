import type { Meta, StoryObj } from "@storybook/react";
import ProgressBoard from "./ProgressBoard";

const meta = {
  title: "Components/Progress board",
  component: ProgressBoard,
  args: {
    columnTitles: ["Performer A", "Performer B"],
    tableData: [
      ["Lotti", "Sabine"],
      ["Marina", "Sabine"],
      ["Giselle", "Sabine"],
      ["Giselle", "Serenity"],
      ["Giselle", "Sophie"],
      ["Giselle", "Scarlett"],
      ["Giselle", "Rhian"],
      ["Kelly", "Rhian"],
      ["Kelly", "Lizz"],
      ["Sammy", "Lizz"],
    ],
    title: "Progress board",
  },
} satisfies Meta<typeof ProgressBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
