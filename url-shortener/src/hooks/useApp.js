import HTTP from "../http/http";
const { useCallback, useState } = require("react");

const useApp = () => {
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [shortenedURL, setShortenedURL] = useState(null);
  const [error, setError] = useState(null);

  const onSubmitClick = useCallback(async (url, minutesToExpireIn) => {
    if (!url || !url.trim()?.length) {
      setShortenedURL(null);
      setError("Please provide a url");
      return;
    }

    setIsLoadingUrl(true);

    const res = await HTTP.post({ url, minutesToExpireIn }, "url/convert");

    setIsLoadingUrl(false);

    if (!res?.ok) {
      setError(res.message);
      setShortenedURL(null);
      return;
    }

    setShortenedURL(res?.data);
    setError(null);
  }, []);

  return {
    onSubmitClick,
    shortenedURL,
    error,
    isLoadingUrl,
  };
};

export default useApp;
