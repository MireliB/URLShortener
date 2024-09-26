import { memo } from "react";
import Block from "./Block";

const ShortenedUrlBlock = ({ shortenedURL }) => {
  const onClickShortUrl = () => {
    navigator.clipboard.writeText(shortenedURL);
    alert("Copied to clipboard");
  };

  return (
    <Block>
      <h2>Your short URL is</h2>
      <p className="url-text" onClick={onClickShortUrl}>
        {shortenedURL}
      </p>
    </Block>
  );
};

export default memo(ShortenedUrlBlock);
