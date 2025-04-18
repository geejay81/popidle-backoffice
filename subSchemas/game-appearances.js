const title = "Game Appearances";

export const gameAppearances = (gameTypes, typeLabels) => ({
    name: "gameAppearances",
    type: "array",
    title,
    of: [
        {
            type: "object",
            title,
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
                        list: gameTypes,
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
                    const label = typeLabels[gameType] || gameType;
                    return {
                        title: `${label} — #${gameNumber}`
                    };
                }
            }
        }
    ],
});