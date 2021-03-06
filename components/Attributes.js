import React, { useContext, useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import styled from "styled-components";

import { ApiContext } from "../pages/index";

const StyledAttributes = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  flex: 1;
  min-width: auto;
  padding-top: 20px;
  align-content: space-between;
`;

const Gauge = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  min-width: 0;
`;

function Attributes({ trackId }) {
  const access_token = useContext(ApiContext);
  const [info, setInfo] = useState(null);

  async function fetcher(access_token) {
    const res = await fetch(
      "https://api.spotify.com/v1/audio-features/" + trackId,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const data = await res.json();
    const { acousticness, danceability, energy, liveness, valence } = data;
    //console.log(Object.entries(data));
    setInfo(
      Object.entries({
        acousticness,
        danceability,
        energy,
        liveness,
        valence,
      }).map(([key, value]) => (
        <Gauge key={key}>
          <GaugeChart
            key={key}
            id="gauge-chart4"
            nrOfLevels={30}
            colors={["#1DB954"]}
            arcWidth={0.3}
            percent={value}
          />
          {key}
        </Gauge>
      ))
    );
  }

  useEffect(() => {
    fetcher(access_token);
  }, [trackId]);

  return (
    <>
      {info !== null ? (
        <StyledAttributes>{info}</StyledAttributes>
      ) : (
        "loading..."
      )}
    </>
  );
}

export default Attributes;
