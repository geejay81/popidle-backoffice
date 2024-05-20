export default {
  name: "single",
  type: "document",
  title: "Single",
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
      name: "Title",
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
      subtitle: "title",
      media: "coverArt"
    }
  }
};
