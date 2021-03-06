import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { ApiContext } from "../pages/index";

const StyledTrack = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 500px;
  margin: auto;
  min-width: auto;
  padding: 30px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1 1 500px;
  margin: auto;
  min-width: auto;
  padding-left: 50px;
`;

function Results({ search, onPick }) {
  const access_token = useContext(ApiContext);
  const [info, setInfo] = useState(null);

  async function fetcher() {
    const res = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        encodeURIComponent(search.trim()) +
        "&type=track",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const data = await res.json();
    //console.log(data);
    const firstResult = data.tracks.items[0];
    onPick(firstResult.id);
    setInfo(
      <StyledTrack>
        <img
          src={firstResult.album.images[1].url}
          style={{ boxShadow: "0 0 1em black" }}
          alt="album_cover"
        />
        <TrackInfo>
          <h2>{firstResult.name}</h2>
          <p>
            by {firstResult.artists.map((artist) => artist.name).join("; ")}
          </p>
          <p>from {firstResult.album.name}</p>
        </TrackInfo>
      </StyledTrack>
    );
  }

  useEffect(() => {
    fetcher();
  }, [search]);

  return info;
}

export default Results;
