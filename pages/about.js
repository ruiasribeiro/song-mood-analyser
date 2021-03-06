import Head from "next/head";
import React from "react";
import styled from "styled-components";

const AboutPage = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

export default function About() {
  return (
    <>
      <Head>
        <title>Song Mood Analyser | About</title>
      </Head>
      <AboutPage>
        <h1>About</h1>
        All data is fetched from the Spotify API.
        <br />
        <br />
        <p>
          <b>Description of each feature: </b>
        </p>
        <ul>
          <li>
            <b>Acousticness: </b>A confidence measure from 0 to 100% of whether
            the track is acoustic. 100% represents high confidence the track is
            acoustic.
          </li>
          <li>
            <b>Danceability: </b>Danceability describes how suitable a track is
            for dancing based on a combination of musical elements including
            tempo, rhythm stability, beat strength, and overall regularity. A
            value of 0% is least danceable and 100% is most danceable.
          </li>
          <li>
            <b>Energy: </b>Energy is a measure from 0 to 100% and represents a
            perceptual measure of intensity and activity. Typically, energetic
            tracks feel fast, loud, and noisy. For example, death metal has high
            energy, while a Bach prelude scores low on the scale. Perceptual
            features contributing to this attribute include dynamic range,
            perceived loudness, timbre, onset rate, and general entropy.
          </li>
          <li>
            <b>Liveness: </b>Detects the presence of an audience in the
            recording. Higher liveness values represent an increased probability
            that the track was performed live. A value above 80% provides a
            strong likelihood that the track is live.
          </li>
          <li>
            <b>Valence: </b>A measure from 0 to 100% describing the musical
            positiveness conveyed by a track. Tracks with high valence sound
            more positive (e.g. happy, cheerful, euphoric), while tracks with
            low valence sound more negative (e.g. sad, depressed, angry).
          </li>
        </ul>
        <br />
        Made with {"<3"} by raddrax.
      </AboutPage>
    </>
  );
}
