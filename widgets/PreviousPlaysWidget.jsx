import React, { useEffect, useState } from 'react'
import { getHistoricPlays } from '../data/cms'; // adjust path as needed
import { Card, Stack, Flex, Box, Text, Spinner, Select, Button } from '@sanity/ui'
import { Link } from 'sanity/router';

const entityTypes = [
  { value: 'album', label: 'Album' },
  { value: 'movie', label: 'Movie' }
];

const sortOrders = [
  { value: 'latestOriginal', label: 'Latest Original' },
  { value: 'latest80s', label: 'Latest 80s' },
  { value: 'latest90s', label: 'Latest 90s' },
  { value: 'latest00s', label: 'Latest 00s' },
  { value: 'latestPosters', label: 'Latest Posters' },
  { value: 'latestTaglines', label: 'Latest Taglines' },
  { value: 'latestBlankBuster', label: 'Latest BlankBuster' }
];

const PreviousPlaysWidget = () => {
  const [entityType, setEntityType] = useState("album");
  const [sortOrder, setSortOrder] = useState("latestOriginal");
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    getHistoricPlays(entityType, sortOrder)
      .then((records) => setData(records));
  }, [entityType, sortOrder]);

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
          Loading historic plays...
        </Text>
      </Flex>
    </Card>
  );

  return (
    <Card padding={4} radius={2} shadow={1}>
      <h2>Historic Game Appearances</h2>
      <Stack space={4}>
        {/* Controls */}
        <Flex gap={3} align="center">
          <Box>
            <Flex align="center" gap={2}>
              <Text size={1} style={{ marginRight: 8 }} htmlFor='entityType'>Entity Type:</Text>
              <Select
                id="entityType"
                value={entityType}
                onChange={e => setEntityType(e.target.value)}
                style={{ padding: '4px 8px', borderRadius: 4 }}
              >
                {entityTypes.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            </Flex>
          </Box>
          <Box>
            <Flex align="center" gap={2}>
              <Text size={1} style={{ marginRight: 8 }} htmlFor='sortOrder'>Sort Order:</Text>
              <Select
              id="sortOrder"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                style={{ padding: '4px 8px', borderRadius: 4 }}
              >
                {sortOrders.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            </Flex>
          </Box>
        </Flex>
        <Text size={1}>
          {entityType === "album"
            ? <AlbumOutput data={data} />
            : <MovieOutput data={data} />}
        </Text>
      </Stack>
    </Card>
  );
};

const tdStyle = {minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'};

const AlbumOutput = ({ data }) => (
  <Box style={{
    maxHeight: '400px',   // adjust as needed
    overflowY: 'auto'
  }}>
    <Text size={2} weight="bold" style={{ marginBottom: '1rem' }}>
      Albums {data.length} records
    </Text>
    <Flex direction="column">
      <Flex padding={2}
      style={{ 
      fontWeight: 'bold', 
      borderBottom: '1px solid #eee', 
      position: 'sticky', 
      top: 0, 
      background: 'white', // or Card background
      zIndex: 1
    }}>
        <Box flex={2}>Artist</Box>
        <Box flex={2}>Album Title</Box>
        <Box flex={1}>Year</Box>
        <Box flex={1}>Latest 80s</Box>
        <Box flex={1}>Latest 90s</Box>
        <Box flex={1}>Latest 00s</Box>
        <Box flex={1}>Latest Original</Box>
        <Box flex={1}></Box>
      </Flex>
      {data.map((album) => (
        <Flex key={album._id} padding={2} style={{ borderBottom: '1px solid #f3f3f3' }}>
          <Box flex={2} style={tdStyle}>{album.artist}</Box>
          <Box flex={2} style={tdStyle}>
            <a href={`/structure/album;${album._id}`} target="_blank" rel="noopener noreferrer">
            {album.albumTitle}
            </a>
          </Box>
          <Box flex={1} style={tdStyle}>{album.year}</Box>
          <Box flex={1} style={tdStyle}>{album.latest80s || 'N/A'}</Box>
          <Box flex={1} style={tdStyle}>{album.latest90s || 'N/A'}</Box>
          <Box flex={1} style={tdStyle}>{album.latest00s || 'N/A'}</Box>
          <Box flex={1} style={tdStyle}>{album.latestOriginal || 'N/A'}</Box>
          <Box flex={1}>
            <Link href={'#'} onClick={() => showAlbumDetails(album)}>Details</Link>
          </Box>
        </Flex>
      ))}
    </Flex>
  </Box>
);

const MovieOutput = ({ data }) => (
  <Box style={{
    maxHeight: '400px',   // adjust as needed
    overflowY: 'auto'
  }}>
    <Text size={2} weight="bold" style={{ marginBottom: '1rem' }}>
      Movies {data.length} records
    </Text>
    <Flex direction="column">
      <Flex padding={2}
        style={{ 
        fontWeight: 'bold', 
        borderBottom: '1px solid #eee', 
        position: 'sticky', 
        top: 0, 
        background: 'white', // or Card background
        zIndex: 1
      }}>
        <Box flex={3}>Title</Box>
        <Box flex={1}>Year</Box>
        <Box flex={1}>Latest Poster</Box>
        <Box flex={1}>Latest Tagline</Box>
        <Box flex={1}>Latest BlankBuster</Box>
        <Box flex={1}></Box>
      </Flex>
      {data.map((movie) => (
        <Flex key={movie._id} padding={2} style={{ borderBottom: '1px solid #f3f3f3' }}>
          <Box flex={3} style={tdStyle}>
            <a href={`/structure/movie;${movie._id}`} target="_blank" rel="noopener noreferrer">
            {movie.title}
            </a>
          </Box>
          <Box flex={1} style={tdStyle}>{movie.year}</Box>
          <Box flex={1} style={tdStyle}>{movie.latestPosters || 'N/A'}</Box>
          <Box flex={1} style={tdStyle}>{movie.latestTaglines || 'N/A'}</Box>
          <Box flex={1} style={tdStyle}>{movie.latestBlankBuster || 'N/A'}</Box>
          <Box flex={1}>
            <Link href={'#'} onClick={() => showMovieDetails(movie)}>Details</Link>
          </Box>
        </Flex>
      ))}
    </Flex>
  </Box>
);

const showMovieDetails = (movie) => {
  alert(`Movie Details:\nTitle: ${movie.title}\nYear: ${movie.year}\nTagline: ${movie.tagline}\nID: ${movie._id}`);
}

const showAlbumDetails = (album) => {
  alert(`Album Details:\nArtist: ${album.artist}\nTitle: ${album.albumTitle}\nYear: ${album.year}\nID: ${album._id}`);
}

export default PreviousPlaysWidget;