import React from "react";

import { ResourceImageFragmentFragment } from "./ResourceImage.fragment.generated";
import styles from "./ResourceImage.scss";

type Props = {
  image: ResourceImageFragmentFragment;
};

export const ResourceImage: React.FunctionComponent<Props> = ({ image }) => (
  <img className={styles.container} src={image.url} alt="" />
);
