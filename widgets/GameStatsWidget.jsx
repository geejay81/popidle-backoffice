import React, { useEffect, useState } from 'react'
import groq from 'groq';
import { client } from '../sanity/client' // adjust path as needed

const query = groq`
{
  "LatestPopIdleGame": math::max(*[_type == "album" && defined(gameId)].gameId),
  "Latest80sPopIdleGame": math::max(*[_type == "album" && defined(gameAppearances[])].gameAppearances[gameType == '80s'].gameNumber),
  "Latest90sPopIdleGame": math::max(*[_type == "album" && defined(gameAppearances[])].gameAppearances[gameType == '90s'].gameNumber),
  "Latest00sPopIdleGame": math::max(*[_type == "album" && defined(gameAppearances[])].gameAppearances[gameType == '00s'].gameNumber),
  "LatestScreenIdleGame": math::max(*[_type == "movie" && defined(gameId)].gameId),
  "TotalAllAlbums": count(*[_type == "album"]),
  "Total80sAlbums": count(*[_type == "album" && year >= 1980 && year <= 1989]),
  "Total90sAlbums": count(*[_type == "album" && year >= 1990 && year <= 1999]),
  "Total00sAlbums": count(*[_type == "album" && year >= 2000 && year <= 2009])
}
`

export default function GameStatsWidget() {
  const [data, setData] = useState(null)

  useEffect(() => {
    client.fetch(query).then(setData)
  }, [])

  if (!data) return <div>Loading game stats...</div>

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Game Stats</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value ?? 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  )
}
