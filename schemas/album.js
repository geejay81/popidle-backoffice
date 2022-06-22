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
      name: "embedKey",
      type: "string",
      title: "Embed Key",
    },
    {
      name: "coverArt",
      type: "image",
      title: "Cover Art",
    },
  ],
  preview: {
    select: {
      title: "artist",
      subtitle: "albumTitle",
      media: "coverArt"
    }
  }
};
