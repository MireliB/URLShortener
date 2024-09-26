import ConvertBlock from "../../components/ConvertBlock";
import ErrorBlock from "../../components/ErrorBlock";
import ManageUrls from "../../components/ManageUrls";
import Metrics from "../../components/Metrics";
import ShortenedUrlBlock from "../../components/ShortenedUrlBlock";
import useApp from "../../hooks/useApp";
import useMetrics from "../../hooks/useMetrics";
import UsersByCountriesMetrics from "../../components/UsersByCountriesMetrics";
import "./App.css";

const App = () => {
  const { onSubmitClick, shortenedURL, error, isLoadingUrl } = useApp();
  const {
    isLoadingMetrics,
    mostConveretdUrls,
    mostVisitedUrls,
    mostUsersByCountries,
    refetchMetrics,
  } = useMetrics();

  return (
    <div className="app">
      <ConvertBlock onSubmitClick={onSubmitClick} isLoadingUrl={isLoadingUrl} />

      {shortenedURL && <ShortenedUrlBlock shortenedURL={shortenedURL} />}

      {error && <ErrorBlock error={error} />}

      <ManageUrls refetchMetrics={refetchMetrics} />

      <hr />

      <Metrics
        title={"Most visited URLs"}
        metrics={mostVisitedUrls}
        label={"Visited"}
        metricKey={"visited"}
        isLoadingMetrics={isLoadingMetrics}
      />

      <Metrics
        title={"Most converted URLs"}
        metrics={mostConveretdUrls}
        label={"Converted"}
        metricKey={"converted"}
        isLoadingMetrics={isLoadingMetrics}
      />

      <UsersByCountriesMetrics
        mostUsersByCountries={mostUsersByCountries}
        isLoadingMetrics={isLoadingMetrics}
      />
    </div>
  );
};

export default App;
