/**
 * This module is a bit of an hack.
 *
 * Since the requests are only made on the server side, there is no need to
 * fetch a new access token per client. So, what I tried to do was a kind of
 * singleton instance of this Spotify helper class, in order to reuse the
 * access token while it is valid.
 */

/** An helper class for Spotify API accesses. */
class Spotify {
  accessToken: string;
  nextUpdate: Date;

  constructor() {
    this.accessToken = "";
    this.nextUpdate = new Date(0);
    this.fetchNewAccessToken();
  }

  async fetchNewAccessToken() {
    const secret = Buffer.from(
      process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
    ).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${secret}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch access token, HTTP error ${response.status} (${response.statusText})`
      );
    }

    // { access_token: string, token_type: "bearer", expires_in: number }
    const data = await response.json();

    this.accessToken = data.access_token;
    this.nextUpdate = new Date(Date.now() + data.expires_in * 1000);
  }

  async getAccessToken() {
    const currentTime = new Date();

    if (currentTime > this.nextUpdate) {
      await this.fetchNewAccessToken();
    }

    return this.accessToken;
  }
}

const spotify = new Spotify();
export const getAccessToken = () => spotify.getAccessToken();
