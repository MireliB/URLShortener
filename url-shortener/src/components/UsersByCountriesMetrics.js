import { memo } from "react";
import Block from "./Block";

const UsersByCountriesMetrics = ({
  mostUsersByCountries,
  isLoadingMetrics,
}) => {
  if (isLoadingMetrics) return <div>Loading Metrics...</div>;

  return (
    <>
      <h2>Most users by countries</h2>

      <div className="metrics">
        {mostUsersByCountries.map((metric) => (
          <Block key={metric._id}>
            <p>{metric._id}</p>
            <p>{metric.count}</p>
          </Block>
        ))}
      </div>
    </>
  );
};

export default memo(UsersByCountriesMetrics);
