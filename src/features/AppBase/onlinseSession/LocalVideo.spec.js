import { render } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import LocalVideo from "./LocalVideo";
it("renders without crashing", () => {
  const div = document.createElement("div");
  let props = {
    isVideo: false,
    setIsVideo: () => {},
    isAudio: false,
    setIsAudio: () => {},
    connecting: false,
  };
  ReactDOM.render(<LocalVideo {...props} />, div);
});

it("video exists", () => {
  let props = {
    isVideo: false,
    setIsVideo: () => {},
    isAudio: false,
    setIsAudio: () => {},
    connecting: false,
  };
  const { getByRole } = render(<LocalVideo {...props} />);
  expect(getByRole("video")).toBeTruthy();
});
