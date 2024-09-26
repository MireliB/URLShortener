import { useCallback, useState } from "react";
import HTTP from "../http/http";

const useManageUrls = (refetchMetrics) => {
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [fetchError, setFetchError] = useState(null);
  const [dataFetched, setDataFetched] = useState(null);

  const onClickDelete = useCallback(
    async (shortUrlId) => {
      if (!shortUrlId) {
        setDeleteError("No short url was provided to delete");
        return;
      }

      const res = await HTTP.delete(shortUrlId);

      if (!res?.ok) {
        return setDeleteError(res?.message);
      }

      refetchMetrics();
      setDeleteError(null);
      setDeleteSuccess(true);
    },
    [refetchMetrics]
  );

  const onClickGetUrl = useCallback(async (shortUrlId) => {
    if (!shortUrlId) {
      setFetchError("No short url was provided to fetch");
      return;
    }

    const res = await HTTP.get(`url/${shortUrlId}`);

    if (!res?.ok) {
      return setFetchError(res?.message);
    }

    setFetchError(null);
    setDataFetched(res.data);
  }, []);

  return {
    onClickDelete,
    onClickGetUrl,
    deleteError,
    deleteSuccess,
    fetchError,
    dataFetched,
  };
};

export default useManageUrls;
