import React, { useEffect, useState } from 'react'
import groq from 'groq';
import { client } from '../sanity/client' // adjust path as needed
import { Card, Box, Text, Flex, Spinner, Button } from '@sanity/ui'

const query = groq`
{
  "LatestPopIdleGame": math::max(*[_type == "album" && defined(gameAppearances[])].gameAppearances[gameType == 'original'].gameNumber),
  "Latest70sPopIdleGame": math::max(*[_type == "album" && defined(gameAppearances[])].gameAppearances[gameType == '70s'].gameNumber),
  "Latest80sPopIdleGame": math::max(*[_type == "album" && defined(gameAppearances[])].gameAppearances[gameType == '80s'].gameNumber),
  "Latest90sPopIdleGame": math::max(*[_type == "album" && defined(gameAppearances[])].gameAppearances[gameType == '90s'].gameNumber),
  "Latest00sPopIdleGame": math::max(*[_type == "album" && defined(gameAppearances[])].gameAppearances[gameType == '00s'].gameNumber),
  "LatestMoviePoster": math::max(*[_type == "movie" && defined(gameAppearances[])].gameAppearances[gameType == 'posters'].gameNumber),
  "LatestMovieTagline": math::max(*[_type == "movie" && defined(gameAppearances[])].gameAppearances[gameType == 'taglines'].gameNumber),
  "LatestMovieBlankbuster": math::max(*[_type == "movie" && defined(gameAppearances[])].gameAppearances[gameType == 'blankbuster'].gameNumber),
  "TotalAllAlbums": count(*[_type == "album"]),
  "Total70sAlbums": count(*[_type == "album" && year >= 1970 && year <= 1979]),
  "Total80sAlbums": count(*[_type == "album" && year >= 1980 && year <= 1989]),
  "Total90sAlbums": count(*[_type == "album" && year >= 1990 && year <= 1999]),
  "Total00sAlbums": count(*[_type == "album" && year >= 2000 && year <= 2009])
}
`

export default function GameStatsWidget() {
  const [data, setData] = useState(null)

  const loadData = () => {
    setData(null);
    client.fetch(query).then(setData)
  };

  useEffect(() => { loadData() }, [])

  if (!data) return (
    <Card padding={4}>
    <Flex
      align="center"
      direction="column"
      gap={3}
      height="fill"
      justify="center"
    >
      <Spinner muted />
      <Text muted size={1}>
        Loading game stats…
      </Text>
    </Flex>
  </Card>
);

  const getFinalDate = (originalDate, days) => {
    const date = new Date(originalDate);
    return date.setDate(date.getDate() + days - 1)
  }

  const latestSetGames = [
    {
      "GameType": "Original Popidle",
      "LatestGame": getFinalDate('2022-05-22', Number(data["LatestPopIdleGame"])),
      "LatestNumber": data["LatestPopIdleGame"]
    },
    {
      "GameType": "80s Popidle",
      "LatestGame": getFinalDate('2024-05-28', Number(data["Latest80sPopIdleGame"])),
      "LatestNumber": data["Latest80sPopIdleGame"]
    },
    {
      "GameType": "90s Popidle",
      "LatestGame": getFinalDate('2024-05-28', Number(data["Latest90sPopIdleGame"])),
      "LatestNumber": data["Latest90sPopIdleGame"]
    },
    {
      "GameType": "00s Popidle",
      "LatestGame": getFinalDate('2025-04-01', Number(data["Latest00sPopIdleGame"])),
      "LatestNumber": data["Latest00sPopIdleGame"]
    },
    {
      "GameType": "Movie Posters",
      "LatestGame": getFinalDate('2024-07-06', Number(data["LatestMoviePoster"])),
      "LatestNumber": data["LatestMoviePoster"]
    },
    {
      "GameType": "Movie Taglines",
      "LatestGame": getFinalDate('2024-07-22', Number(data["LatestMovieTagline"])),
      "LatestNumber": data["LatestMovieTagline"]
    },
    {
      "GameType": "Movie Blankbuster",
      "LatestGame": getFinalDate('2024-09-07', Number(data["LatestMovieBlankbuster"])),
      "LatestNumber": data["LatestMovieBlankbuster"]
    }
  ]

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Game Stats</h2>
      <Button onClick={loadData} text="Reload Data" tone="primary" style={{ marginBottom: '1rem' }} />
      <Card padding={4} radius={2} shadow={1} tone="default">
        <Box>
          <Flex paddingBottom={2} style={{ fontWeight: 'bold' }}>
            <Box flex={1}><Text>Game</Text></Box>
            <Box flex={1}><Text>Latest Date</Text></Box>
            <Box flex={1}><Text>Latest Id</Text></Box>
          </Flex>
          {latestSetGames.map((game) => (
            <Flex key={game.GameType} paddingY={2} style={{ borderTop: '1px solid #eee' }}>
              <Box flex={1}><Text>{game.GameType}</Text></Box>
              <Box flex={1}><Text>{new Date(game.LatestGame).toLocaleDateString()}</Text></Box>
              <Box flex={1}><Text>{game.LatestNumber}</Text></Box>
            </Flex>
          ))}
        </Box>
      </Card>
    </div>
  )
}
