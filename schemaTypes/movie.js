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
        name: "title",
        type: "string",
        title: "Title",
      },
      {
        name: "year",
        type: "number",
        title: "Year Released",
      },
      {
        name: "embedKey",
        type: "string",
        title: "Embed Key",
      },
      {
        name: "poster",
        type: "image",
        title: "Poster",
      },
      {
        name: "decadeGameId",
        type: "number",
        title: "Decade Game ID",
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
  