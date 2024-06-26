import React from "react";
import { Part } from "./part";

export const Content = ({ parts }) => {
  return (
    <>
      <Part {...parts[0]} />
      <Part {...parts[1]} />
      <Part {...parts[2]} />
    </>
  );
};
