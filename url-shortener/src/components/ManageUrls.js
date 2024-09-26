import { useRef } from "react";
import useManageUrls from "../hooks/useManageUrls";
import Block from "./Block";

const ManageUrls = ({ refetchMetrics }) => {
  const {
    onClickDelete,
    onClickGetUrl,
    deleteError,
    deleteSuccess,
    fetchError,
    dataFetched,
  } = useManageUrls(refetchMetrics);

  const urlInputToDeleteRef = useRef(null);
  const urlInputToFetchRef = useRef(null);

  const onClickDeleteUrl = () => {
    const shortUrlId = urlInputToDeleteRef.current.value.split("tiny/")[1];
    onClickDelete(shortUrlId);
  };

  const onClickGetLongUrlByShortUrl = () => {
    const shortUrlId = urlInputToFetchRef.current.value.split("tiny/")[1];
    onClickGetUrl(shortUrlId);
  };

  return (
    <Block>
      <h1>Manage URLs</h1>

      <div>
        <p>Delete a long url by a short url</p>
        <input ref={urlInputToDeleteRef} placeholder="Short URL" />
        <button onClick={onClickDeleteUrl}>Delete</button>

        {deleteError && (
          <div>
            <span>{deleteError}</span>
          </div>
        )}

        {deleteSuccess && <p>Deleted succesfully</p>}
      </div>

      <div>
        <p>Get a long url by a short url</p>
        <input ref={urlInputToFetchRef} placeholder="Short URL" />
        <button onClick={onClickGetLongUrlByShortUrl}>Get</button>

        {fetchError && (
          <div>
            <span>{fetchError}</span>
          </div>
        )}

        {dataFetched && <p>Fetched succesfully: {dataFetched.longUrl}</p>}
      </div>
    </Block>
  );
};

export default ManageUrls;
