export default {
  name: "album",
  type: "document",
  title: "Album",
  fields: [
    {
      name: "gameId",
      type: "number",
      title: "Game ID",
    },
    {
      name: "artist",
      type: "string",
      title: "Artist",
    },
    {
      name: "albumTitle",
      type: "string",
      title: "Album Title",
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
      name: "coverArt",
      type: "image",
      title: "Cover Art",
    },
    {
      name: "decadeGameId",
      type: "number",
      title: "Decade Game ID",
    },
  ],
  preview: {
    select: {
      title: "artist",
      subtitle: "albumTitle",
      media: "coverArt"
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
