export const calculateMatches = (teams) => {
  const matches = [];
  for (let i = 0; i < teams.length - 1; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        teamA: {
          name: teams[i].teamName,
          balls: 0,
          wickets: 0,
          score: 0,
          players: teams[i].players,
        },
        teamB: {
          name: teams[j].teamName,
          balls: 0,
          wickets: 0,
          score: 0,
          players: teams[j].players,
        },
        result: "",
      });
    }
  }
  for (let i = matches.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [matches[i], matches[j]] = [matches[j], matches[i]];
  }
  return matches.map((match, index) => {
    return { ...match, matchNo: index + 1 };
  });
};
