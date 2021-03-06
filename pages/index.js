import Head from "next/head";
import Link from "next/link";
import { encode as btoa } from "base-64";
import React, { createContext, useState } from "react";
import styled from "styled-components";

import Results from "../components/Results";
import Search from "../components/Search";
import Attributes from "../components/Attributes";

const About = styled.div`
  background-color: #1db954;
  border: none;
  color: white;
  padding: 10px 15px;
  display: inline-block;
  position: fixed;
  bottom: 20px;
  border-radius: 2px;
`;

const Page = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 20px;
  padding-bottom: 80px;
`;

export const ApiContext = createContext(null);

export default function Home({ data }) {
  const [track, setTrack] = useState("");
  const [trackId, setTrackId] = useState("");
  //console.log(data);
  return (
    <>
      <Head>
        <title>Song Mood Analyser</title>
      </Head>
      <Page>
        <h1>Song Mood Analyser</h1>
        <Search onSearch={setTrack} />
        <ApiContext.Provider value={data.access_token}>
          {track !== "" ? (
            <Results search={track} onPick={setTrackId} />
          ) : (
            <></>
          )}
          {trackId !== "" ? <Attributes trackId={trackId} /> : <></>}
        </ApiContext.Provider>
        <About>
          <Link href="/about">About</Link>
        </About>
      </Page>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return { props: { data } };
}
