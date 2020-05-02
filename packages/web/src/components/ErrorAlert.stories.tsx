import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { ErrorAlert } from "./ErrorAlert";

export default {
  title: "ErrorAlert",
  component: ErrorAlert,
  decorators: [withKnobs]
};

export const Basic = () => {
  const message = text("Message", "Something went wrong...");

  return <ErrorAlert message={message} />;
};

export const WithRetry = () => {
  const message = text("Message", "Could not load books...");

  return <ErrorAlert message={message} onRetry={action("retry-pressed")} />;
};
