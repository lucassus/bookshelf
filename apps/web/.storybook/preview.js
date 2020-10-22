import { CloudinaryContext } from "cloudinary-react";
import React from "react";

export const decorators = [
  (Story) => (
    <CloudinaryContext cloudName="lucassus">
      <Story />
    </CloudinaryContext>
  )
];
