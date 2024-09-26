import { memo } from "react";
import Block from "./Block";

const Metrics = ({
  metrics = [],
  title,
  label,
  metricKey,
  isLoadingMetrics,
}) => {
  const onClickLink = (link) => {
    navigator.clipboard.writeText(link);
    alert("Copied to clipboard");
  };

  if (isLoadingMetrics) return <div>Loading Metrics...</div>;

  return (
    <>
      <h2>{title}</h2>

      <div className="metrics">
        {metrics.map((metric) => (
          <Block key={metric.shortUrl}>
            <div
              className="metric-link"
              onClick={() => onClickLink(metric.longUrl)}
            >
              {metric.longUrl}
            </div>

            <hr />

            <p
              className="metric-link small-text"
              onClick={() => onClickLink(metric.shortUrl)}
            >
              Converted to {metric.shortUrl}
            </p>

            <hr />

            <p>
              {label} {metric[metricKey]} times
            </p>
          </Block>
        ))}
      </div>
    </>
  );
};

export default memo(Metrics);
