import { Image, Transformation } from "cloudinary-react";
import React from "react";

import { ResourceImageFragmentFragment } from "./ResourceImage.fragment.generated";

type Props = {
  image: ResourceImageFragmentFragment;
};

export const ResourceImage: React.FunctionComponent<Props> = ({ image }) => (
  <Image publicId={image.path}>
    <Transformation height={200} crop="scale" />
  </Image>
);
