import { addons } from "@storybook/addons";
import { create } from "@storybook/theming/create";

import brandImage from "../public/assets/logo.png";

const theme = create({
  base: "light",
  brandTitle: "LINK-FARM",
  brandImage: brandImage,
});
addons.setConfig({
  theme: { ...theme },
});
