export const teamInfo = {
  teamId: "",
  teamName: "",
  players: [
    {
      id:'p1',
      name: "",
      type: "",
      runs: 0,
      balls: 0,
      wickets: 0,
    },
    {
      id:'p2',
      name: "",
      type: "",
      runs: 0,
      balls: 0,
      wickets: 0,
    },
    {
      id:'p3',
      name: "",
      type: "",
      runs: 0,
      balls: 0,
      wickets: 0,
    },
  ],
  balls: 6,
  wickets: 0,
  score: 0,
  currScore: 0,
  chance: true,
  winner: false,
  matches: 0,
  wins: 0,
  loss: 0,
};

const teams = [
  { ...teamInfo, team: "RCB" },
  { ...teamInfo, team: "MI" },
  { ...teamInfo, team: "CSK" },
];

const matches = [
  {
    matchNo: 0,
    teamA: "",
    teamB: "",
    result: "",
  },
];

const pointsTable = [
  {
    teamName: "",
    matches: 0,
    wins: 0,
    loss: 0,
    points: 0,
  },
];
