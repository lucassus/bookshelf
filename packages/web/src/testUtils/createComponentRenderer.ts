import { render } from "@testing-library/react";
import React from "react";

export function createComponentRenderer<CP>(
  Component: React.FunctionComponent<CP> | React.ComponentClass<CP>,
  baseProps: CP
) {
  return function renderComponent(props: Partial<CP> = {}) {
    const createElement = (newProps: Partial<CP> = {}) =>
      React.createElement(Component, {
        ...baseProps,
        ...props,
        ...newProps
      });

    const { rerender, ...rest } = render(createElement());

    return {
      rerender: (newProps: Partial<CP> = {}) =>
        rerender(createElement(newProps)),
      ...rest
    };
  };
}
