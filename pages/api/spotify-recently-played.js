import querystring from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=4`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export default async (_, res) => {
  const response = await getRecentlyPlayed();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ error: true });
  }

  const items = (await response.json()).items;

  return res.status(200).json({
    items,
  });
};
