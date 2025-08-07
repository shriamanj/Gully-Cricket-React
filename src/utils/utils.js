export const calculateMatches = (teams, matchType) => {
  let matches = [];
  for (let i = 0; i < teams.length - 1; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        teamA: {
          name: teams[i].teamName,
          icon: teams[i].icon,
          balls: 0,
          wickets: 0,
          score: 0,
          players: teams[i].players,
        },
        teamB: {
          name: teams[j].teamName,
          icon: teams[j].icon,
          balls: 0,
          wickets: 0,
          score: 0,
          players: teams[j].players,
        },
        result: "",
        matchTypeId: "league"
      });
    }
  }
  for (let i = matches.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [matches[i], matches[j]] = [matches[j], matches[i]];
  }
  matches = [...matches, ...addSemiFinal(matchType)];
  return matches.map((match, index) => {
    return { ...match, matchNo: index + 1 };
  });
};

const addSemiFinal = (matchType) => {
  const finalMatches = [];
  const match = {
    teamA: {
      name: "TBQ",
      icon: "",
      balls: 0,
      wickets: 0,
      score: 0,
      players: [],
    },
    teamB: {
      name: "TBQ",
      icon: "",
      balls: 0,
      wickets: 0,
      score: 0,
      players: [],
    },
    result: "",
    matchTypeId: "",
  };
  if (matchType === "ipl") {
    new Array(4).fill().forEach((_, index) => {
      const matchTypes = ["qualifier1", "eleminator", "qualifier2", "final"];
      finalMatches.push({ ...match, matchTypeId: matchTypes[index] });
    });
  } else if (matchType === "world-cup") {
    new Array(3).fill().forEach((_, index) => {
      const matchTypes = ["semiFinal1", "semiFinal2", "final"];
      finalMatches.push({ ...match, matchTypeId: matchTypes[index] });
    });
  } else {
    finalMatches.push({ ...match, matchTypeId: "final" });
  }
  return finalMatches;
};
