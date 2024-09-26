import { memo } from "react";
import Block from "./Block";

const ErrorBlock = ({ error }) => {
  return (
    <Block>
      <h2>Something went wrong:</h2>
      <span>{error}</span>
    </Block>
  );
};

export default memo(ErrorBlock);
