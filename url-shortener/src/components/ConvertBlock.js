import { memo, useRef } from "react";
import Block from "./Block";

const ConvertBlock = ({ onSubmitClick, isLoadingUrl }) => {
  const urlRef = useRef(null);
  const minutesToExpireInputRef = useRef(null);

  const onSubmitClickLocal = () => {
    const url = urlRef.current.value;
    const minutesToExpireIn = minutesToExpireInputRef.current.value;
    onSubmitClick(url, minutesToExpireIn);
  };

  return (
    <Block>
      <h1>Enter your URL</h1>

      <input type="text" placeholder="URL" ref={urlRef} />

      <p>Expires in:</p>
      <input
        type="number"
        min={0}
        placeholder="Number of minutes"
        ref={minutesToExpireInputRef}
      />

      {isLoadingUrl ? (
        "Loading..."
      ) : (
        <button onClick={onSubmitClickLocal}>Get your short URL</button>
      )}
    </Block>
  );
};

export default memo(ConvertBlock);
