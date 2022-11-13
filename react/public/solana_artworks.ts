export type SolanaArtworks = {
  version: "0.1.0";
  name: "solana_artworks";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "artworkImg";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "imgUrl";
          type: "string";
        },
        {
          name: "title";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "artworkImg";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "imgUrl";
            type: "string";
          },
          {
             name: "title";
             type: "string";
          }
        ];
      };
    }
  ];
  metadata: {
    address: "63uptqg9z6XpNXxHdesENUZXzvR4G42pHFetqn7jENR7";
  };
};

export const IDL: SolanaArtworks = {
  version: "0.1.0",
  name: "solana_artworks",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "artworkImg",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "imgUrl",
          type: "string",
        },
        {
          name: "title",
          type: "string",
        }
      ],
    },
  ],
  accounts: [
    {
      name: "artworkImg",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "imgUrl",
            type: "string",
          },
          {
            name: "title",
            type: "string",
          }
        ],
      },
    },
  ],
  metadata: {
    address: "63uptqg9z6XpNXxHdesENUZXzvR4G42pHFetqn7jENR7",
  },
};
