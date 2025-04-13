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
    {
      name: "gameAppearances",
      type: "array",
      title: "Game Appearances",
      of: [
        {
          type: "object",
          title: "Game Appearance",
          fields: [
            {
              name: "gameNumber",
              type: "number",
              title: "Game Number",
            },
            {
              name: "gameType",
              type: "string",
              title: "Game Type",
              options: {
                list: [
                  { title: "Original Game", value: "original" },
                  { title: "80s Game", value: "80s" },
                  { title: "90s Game", value: "90s" },
                  { title: "2000s Game", value: "00s" },
                  { title: "2010s Game", value: "10s" },
                ],
                layout: "dropdown"
              }
            }
          ],
          preview: {
            select: {
              gameNumber: "gameNumber",
              gameType: "gameType"
            },
            prepare({ gameNumber, gameType }) {
              const typeLabels = {
                original: "Original Game",
                "80s": "80s Game",
                "90s": "90s Game",
                "00s": "2000s Game",
                "10s": "2010s Game"
              };
        
              const label = typeLabels[gameType] || gameType;
              return {
                title: `${label} — #${gameNumber}`
              };
            }
          }
        }
      ],
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
