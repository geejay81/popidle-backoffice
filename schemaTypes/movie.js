export default {
    name: "movie",
    type: "document",
    title: "Movie",
    fields: [
      {
        name: "gameId",
        type: "number",
        title: "Game ID",
      },
      {
        name: "decadeGameId",
        type: "number",
        title: "Decade Game ID",
      },
      {
        name: "title",
        type: "string",
        title: "Title",
      },
      {
        name: "tagline",
        type: "string",
        title: "Tagline",
      },
      {
        name: "overview",
        description: "Short synopsis of the movie",
        type: "text",
        title: "Overview",
      },
      {
        name: "year",
        description: "Year the movie was released",
        type: "number",
        title: "Year Released",
      },
      {
        name: "releaseDate",
        description: "The date the movie was released",
        type: "date",
        title: "Release date",
      },
      {
        name: "imdbId",
        type: "string",
        title: "IMDb Id",
      },
      {
        name: "tmdbId",
        type: "string",
        title: "TMDB Id",
      },
      {
        name: "poster",
        type: "image",
        title: "Poster",
      },
      {
        name: "budget",
        type: "number",
        title: "Budget",
      },
      {
        name: "revenue",
        type: "number",
        title: "Revenue",
      },
      {
        name: "runtime",
        type: "number",
        title: "Runtime",
        description: "Runtime in minutes",
      },
      {
        name: 'genres',
        type: 'array',
        of: [{type: 'string'}],
        title: 'Genres',
      },
      {
        name: 'rating',
        type: 'number',
        title: 'Rating',
        description: 'Average rating out of 10'
      },
    ],
    preview: {
      select: {
        title: "title",
        subtitle: "year",
        media: "poster"
      }
    },
    orderings: [
      {
        title: 'Game ID, Latest',
        name: 'gameIdLatest',
        by: [
          {
            field: 'gameId', 
            direction: 'desc'
          }
        ]
      },
      {
        title: 'Game ID, Oldest',
        name: 'gameIdOldest',
        by: [
          {field: 'gameId', direction: 'asc'}
        ]
      }
    ]
  };
  