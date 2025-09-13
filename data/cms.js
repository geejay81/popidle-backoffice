import { client } from '../sanity/client'

export const getHistoricPlays = (entityType, sortOrder) => {

  const query = entityType === "album"
    ? queries.getAlbumPlays(sortOrder)
    : queries.getMoviePlays(sortOrder);

  return client.fetch(query);
};

const queries = {
  getAlbumPlays: (sortOrder) => (`
*[_type == "album"]
{
  _id,
  artist,
  albumTitle,
  year,
  "latest80s": gameAppearances[gameType == "80s"] | order(gameNumber desc)[0].gameNumber,
  "latest90s": gameAppearances[gameType == "90s"] | order(gameNumber desc)[0].gameNumber,
  "latest00s": gameAppearances[gameType == "00s"] | order(gameNumber desc)[0].gameNumber,
  "latestOriginal": gameAppearances[gameType == "original"] | order(gameNumber desc)[0].gameNumber
}
| order(${sortOrder} asc)
    `),
  getMoviePlays: (sortOrder) => (`
*[_type == "movie"]
{
_id,
title,
year,
"latestPosters": gameAppearances[gameType == "posters"] | order(gameNumber desc)[0].gameNumber,
"latestTaglines": gameAppearances[gameType == "taglines"] | order(gameNumber desc)[0].gameNumber,
"latestBlankBuster": gameAppearances[gameType == "blankbuster"] | order(gameNumber desc)[0].gameNumber
}
| order(${sortOrder} asc)
    `)
};