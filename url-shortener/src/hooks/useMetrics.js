import { useCallback, useEffect, useState } from "react";
import HTTP from "../http/http";

const useMetrics = () => {
  const [mostVisitedUrls, setMostVisitedUrls] = useState([]);
  const [mostConveretdUrls, setMostConveretdUrls] = useState([]);
  const [mostUsersByCountries, setMostUsersByCountries] = useState([]);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);

  const refetchMetrics = useCallback(async () => {
    setIsLoadingMetrics(true);

    const res = await HTTP.get("metrics");

    setIsLoadingMetrics(false);

    if (!res.ok) return;

    setMostVisitedUrls(res?.data?.mostVisitedUrls);
    setMostConveretdUrls(res?.data?.mostConvertedUrls);
    setMostUsersByCountries(res?.data?.mostUsersByCountries);
  }, []);

  useEffect(() => {
    refetchMetrics();
  }, [refetchMetrics]);

  return {
    mostVisitedUrls,
    mostConveretdUrls,
    isLoadingMetrics,
    mostUsersByCountries,
    refetchMetrics,
  };
};

export default useMetrics;
