import { useEffect, useRef, useState } from "react";
import TeamCard from "./TeamCard";

function PlayMatch({ matchInfo, matches, setMatches, setCurrMatch }) {
  const batsmanRef1 = useRef();
  const batsmanRef2 = useRef();

  const [teamA, setTeamA] = useState({
    id: 1,
    name: "",
    balls: 6,
    eachBallScore: ["", "", "", "", "", ""],
    score: 0,
    wickets: 0,
    currScore: 0,
    chance: true,
    winner: false,
    players: [],
    icon: "",
  });
  const [teamB, setTeamB] = useState({
    id: 2,
    name: "",
    balls: 6,
    eachBallScore: ["", "", "", "", "", ""],
    score: 0,
    wickets: 0,
    currScore: 0,
    chance: false,
    winner: false,
    players: [],
    icon: "",
  });

  const handleClick = (player) => {
    if (player.balls <= 0) {
      alert("Match finished");
      return;
    }

    const team = player.name === teamA.name ? teamB : teamA;
    const batsmanRef = player.name === teamA.name ? batsmanRef1 : batsmanRef2;
    let bowlerInx = team.players.findIndex((item) => item.type === "bowler");
    let batsmanInx = player.players.findIndex(
      (item) => item.id === batsmanRef.current.id
    );

    player.currScore = Math.floor(Math.random() * 8);
    const ballIdx = player.eachBallScore.findIndex((ball) => ball === "");

    if (player.currScore === 7) {
      player.wickets += 1;
      player.currScore = "Wicket";
      player.balls = Math.max(player.balls - 1, 0);
      player.chance = !player.chance;
      team.players[bowlerInx].wickets += 1;
      team.players[bowlerInx].balls += 1;
      player.players[batsmanInx].balls += 1;
      player.eachBallScore[ballIdx] = "W";
    } else if (player.currScore === 5) {
      team.players[bowlerInx].runs += 1;
      player.currScore = "Wide";
      player.score += 1;
      player.eachBallScore.push("");
      player.eachBallScore[ballIdx] = "Wd";
    } else {
      player.score += player.currScore;
      player.balls = Math.max(player.balls - 1, 0);
      player.chance = !player.chance;
      team.players[bowlerInx].balls += 1;
      team.players[bowlerInx].runs += player.currScore;
      player.players[batsmanInx].balls += 1;
      player.players[batsmanInx].runs += player.currScore;
      player.eachBallScore[ballIdx] = player.currScore;
    }

    if (player.name === teamA.name) {
      if (teamB.wickets !== 2) {
        setTeamA({ ...player });
        setTeamB({
          ...teamB,
          chance: player.currScore === "Wide" ? false : true,
        });
      } else {
        setTeamA({ ...player, chance: true });
      }
    } else {
      setTeamB({ ...player });
      if (teamA.wickets !== 2) {
        setTeamB({ ...player });
        setTeamA({
          ...teamA,
          chance: player.currScore === "Wide" ? false : true,
        });
      } else {
        setTeamB({ ...player, chance: true });
      }
    }

    const matchInd = matches.findIndex(
      (item) => item.matchNo === matchInfo?.matchNo
    );
    if (matchInd !== -1) {
      matches[matchInd].teamA = {
        ...matches[matchInd].teamA,
        score: teamA.score,
        wickets: teamA.wickets,
        balls: 6 - teamA.balls,
        players: teamA.players,
        eachBallScore: teamA.eachBallScore,
      };
      matches[matchInd].teamB = {
        ...matches[matchInd].teamB,
        score: teamB.score,
        wickets: teamB.wickets,
        balls: 6 - teamB.balls,
        players: teamB.players,
        eachBallScore: teamB.eachBallScore,
      };
      setMatches([...matches]);
    }
  };

  const updateMatches = (result) => {
    const matchInd = matches.findIndex(
      (item) => item.matchNo === matchInfo?.matchNo
    );
    matches[matchInd].result = result;
    setMatches([...matches]);
    setCurrMatch({ ...matches[matchInd], result: result });
    localStorage.setItem("matches", JSON.stringify(matches));
  };

  const updateTeamsInfo = (winTeam, qLossTeam, status) => {
    const playerData = JSON.parse(localStorage.getItem("teamsInfo"));
    const winInx = playerData.findIndex((item) => {
      return item.teamName === winTeam.name;
    });
    const lossInx = playerData.findIndex((item) => {
      return item.teamName === qLossTeam.name;
    });
    if (status === "draw") {
      playerData[winInx].matches += 1;
      playerData[winInx].points += 1;
      playerData[lossInx].matches += 1;
      playerData[lossInx].points += 1;
    } else {
      playerData[winInx].matches += 1;
      playerData[winInx].wins += 1;
      playerData[winInx].points += 2;
      playerData[lossInx].matches += 1;
      playerData[lossInx].loss += 1;
    }
    playerData[winInx].players.forEach((player, index) => {
      const plInd = winTeam.players.findIndex((item) => item.id === player.id);
      playerData[winInx].players[index] = {
        ...player,
        runs: player.runs + winTeam.players[plInd].runs,
        balls: player.balls + winTeam.players[plInd].balls,
        wickets: player.wickets + winTeam.players[plInd].wickets,
        matches: player.matches + 1,
      };
    });
    playerData[lossInx].players.forEach((player, index) => {
      const plInd = qLossTeam.players.findIndex(
        (item) => item.id === player.id
      );
      playerData[lossInx].players[index] = {
        ...player,
        runs: player.runs + qLossTeam.players[plInd].runs,
        balls: player.balls + qLossTeam.players[plInd].balls,
        wickets: player.wickets + qLossTeam.players[plInd].wickets,
        matches: player.matches + 1,
      };
    });
    localStorage.setItem("teamsInfo", JSON.stringify(playerData));
  };

  const winTeamA = () => {
    const result = `${teamA.name} won by ${teamA.score - teamB.score} runs`;
    updateMatches(result);
    updateTeamsInfo(teamA, teamB, "win");
  };

  const winTeamB = () => {
    const result = `${teamB.name} won by ${teamB.score - teamA.score} runs`;
    updateMatches(result);
    updateTeamsInfo(teamB, teamA, "win");
  };

  const matchDraw = () => {
    const result = "Match Draw";
    updateMatches(result);
    updateTeamsInfo(teamA, teamB, "draw");
  };

  useEffect(() => {
    const matchType = localStorage.getItem("matchType");
    if (matchType === "series") {
      const unfinishedMatch = matches.filter(
        (item) => item.result === "" && item.matchTypeId === "league"
      );
      if (unfinishedMatch.length === 0) {
        const teamsInfo = JSON.parse(localStorage.getItem("teamsInfo"));
        const topTwoTeams = teamsInfo
          .sort((a, b) => b.points - a.points)
          .slice(0, 2);
        const fIndex = matches.findIndex(
          (item) => item.matchTypeId === "final"
        );
        matches[fIndex].teamA.name = topTwoTeams[0].teamName;
        matches[fIndex].teamA.icon = topTwoTeams[0].icon;
        matches[fIndex].teamA.players = [
          ...topTwoTeams[0].players.map((item) => {
            return { ...item, balls: 0, runs: 0, wickets: 0 };
          }),
        ];
        matches[fIndex].teamB.name = topTwoTeams[1].teamName;
        matches[fIndex].teamB.icon = topTwoTeams[1].icon;
        matches[fIndex].teamB.players = [
          ...topTwoTeams[1].players.map((item) => {
            return { ...item, balls: 0, runs: 0, wickets: 0 };
          }),
        ];
        setMatches([...matches]);
        localStorage.setItem("matches", JSON.stringify(matches));
      }
    } else if (matchType === "ipl") {
      const q1Index = matches.findIndex(
        (item) => item.matchTypeId === "qualifier1"
      );
      const q2Index = matches.findIndex(
        (item) => item.matchTypeId === "qualifier2"
      );
      const elIndex = matches.findIndex(
        (item) => item.matchTypeId === "eleminator"
      );
      const fIndex = matches.findIndex((item) => item.matchTypeId === "final");

      if (matches?.[q1Index]?.teamA?.name === "TBQ") {
        const unfinishedMatch = matches.filter(
          (item) => item.matchTypeId === "league" && item.result === ""
        );
        if (unfinishedMatch.length === 0) {
          const teamsData = JSON.parse(localStorage.getItem("teamsInfo"));
          const topFourTeams = teamsData
            .sort((a, b) => b.points - a.points)
            .slice(0, 4);

          matches[q1Index].teamA.name = topFourTeams[0].teamName;
          matches[q1Index].teamA.icon = topFourTeams[0].icon;
          matches[q1Index].teamA.players = [
            ...topFourTeams[0].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];
          matches[q1Index].teamB.name = topFourTeams[1].teamName;
          matches[q1Index].teamB.icon = topFourTeams[1].icon;
          matches[q1Index].teamB.players = [
            ...topFourTeams[1].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];

          matches[elIndex].teamA.name = topFourTeams[2].teamName;
          matches[elIndex].teamA.icon = topFourTeams[2].icon;
          matches[elIndex].teamA.players = [
            ...topFourTeams[2].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];
          matches[elIndex].teamB.name = topFourTeams[3].teamName;
          matches[elIndex].teamB.icon = topFourTeams[3].icon;
          matches[elIndex].teamB.players = [
            ...topFourTeams[3].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];
          setMatches([...matches]);
          localStorage.setItem("matches", JSON.stringify(matches));
        }
      } else if (matches?.[q2Index]?.teamA?.name === "TBQ") {
        const unfinishedMatch = matches.filter(
          (item) =>
            item.matchTypeId === "qualifier1" &&
            item.matchTypeId === "eleminator" &&
            item.result === ""
        );
        if (unfinishedMatch.length === 0) {
          const qWonTeam = matches[q1Index].result.includes(
            matches[q1Index].teamA.name
          )
            ? "teamA"
            : "teamB";
          const qLossTeam = matches[q1Index].result.includes(
            matches[q1Index].teamA.name
          )
            ? "teamB"
            : "teamA";
          matches[q2Index].teamA.name = matches[q1Index][qLossTeam].name;
          matches[q2Index].teamA.icon = matches[q1Index][qLossTeam].icon;
          matches[q2Index].teamA.players = [
            ...matches[q1Index][qLossTeam].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];
          const eWonTeam = matches[elIndex].result.includes(
            matches[elIndex].teamA.name
          )
            ? "teamA"
            : "teamB";
          matches[q2Index].teamB.name = matches[elIndex][eWonTeam].name;
          matches[q2Index].teamB.icon = matches[elIndex][eWonTeam].icon;
          matches[q2Index].teamB.players = [
            ...matches[elIndex][eWonTeam].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];

          matches[fIndex].teamA.name = matches[q1Index][qWonTeam].name;
          matches[fIndex].teamA.icon = matches[q1Index][qWonTeam].icon;
          matches[fIndex].teamA.players = [
            ...matches[q1Index][qWonTeam].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];

          setMatches([...matches]);
          localStorage.setItem("matches", JSON.stringify(matches));
        }
      } else if (matches?.[fIndex]?.teamB?.name === "TBQ") {
        const unfinishedMatch = matches.filter(
          (item) => item.matchTypeId === "qualifier2" && item.result === ""
        );
        if (unfinishedMatch.length === 0) {
          const qWonTeam = matches[q2Index].result.includes(
            matches[q2Index].teamA.name
          )
            ? "teamA"
            : "teamB";
          matches[fIndex].teamB.name = matches[q2Index][qWonTeam].name;
          matches[fIndex].teamB.icon = matches[q2Index][qWonTeam].icon;
          matches[fIndex].teamB.players = [
            ...matches[q2Index][qWonTeam].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];

          setMatches([...matches]);
          localStorage.setItem("matches", JSON.stringify(matches));
        }
      }
    } else if (matchType === "world-cup") {
      const sf1 = matches.findIndex(
        (item) => item.matchTypeId === "semiFinal1"
      );
      const sf2 = matches.findIndex(
        (item) => item.matchTypeId === "semiFinal2"
      );
      const fIndex = matches.findIndex((item) => item.matchTypeId === "final");
      if (matches?.[sf1]?.teamA?.name === "TBQ") {
        const unfinishedMatch = matches.filter(
          (item) => item.matchTypeId === "league" && item.result === ""
        );
        if (unfinishedMatch.length === 0) {
          const teamsData = JSON.parse(localStorage.getItem("teamsInfo"));
          const topFourTeams = teamsData
            .sort((a, b) => b.points - a.points)
            .slice(0, 4);

          matches[sf1].teamA.name = topFourTeams[0].teamName;
          matches[sf1].teamA.icon = topFourTeams[0].icon;
          matches[sf1].teamA.players = [
            ...topFourTeams[0].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];
          matches[sf1].teamB.name = topFourTeams[3].teamName;
          matches[sf1].teamB.icon = topFourTeams[3].icon;
          matches[sf1].teamB.players = [
            ...topFourTeams[3].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];

          matches[sf2].teamA.name = topFourTeams[1].teamName;
          matches[sf2].teamA.icon = topFourTeams[1].icon;
          matches[sf2].teamA.players = [
            ...topFourTeams[1].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];
          matches[sf2].teamB.name = topFourTeams[2].teamName;
          matches[sf2].teamB.icon = topFourTeams[2].icon;
          matches[sf2].teamB.players = [
            ...topFourTeams[2].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];
          setMatches([...matches]);
          localStorage.setItem("matches", JSON.stringify(matches));
        }
      } else if (matches?.[fIndex]?.teamB?.name === "TBQ") {
        const unfinishedMatch = matches.filter(
          (item) =>
            (item.matchTypeId === "semiFinal1" ||
              item.matchTypeId === "semiFinal2") &&
            item.result === ""
        );
        if (unfinishedMatch.length === 0) {
          const sf1WonTeam = matches[sf1].result.includes(
            matches[sf1].teamA.name
          )
            ? "teamA"
            : "teamB";
          const sf2WonTeam = matches[sf2].result.includes(
            matches[sf2].teamA.name
          )
            ? "teamA"
            : "teamB";

          matches[fIndex].teamA.name = matches[sf1][sf1WonTeam].name;
          matches[fIndex].teamA.icon = matches[sf1][sf1WonTeam].icon;
          matches[fIndex].teamA.players = [
            ...matches[sf1][sf1WonTeam].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];

          matches[fIndex].teamB.name = matches[sf2][sf2WonTeam].name;
          matches[fIndex].teamB.icon = matches[sf2][sf2WonTeam].icon;
          matches[fIndex].teamB.players = [
            ...matches[sf2][sf2WonTeam].players.map((item) => {
              return { ...item, balls: 0, runs: 0, wickets: 0 };
            }),
          ];

          setMatches([...matches]);
          localStorage.setItem("matches", JSON.stringify(matches));
        }
      }
    }
  }, [matches]);

  useEffect(() => {
    if (teamA.balls === 0 && teamB.balls === 0) {
      if (teamA.score > teamB.score) {
        winTeamA();
      } else if (teamA.score < teamB.score) {
        winTeamB();
      } else {
        if (teamA.score > 0 && teamB.score > 0) {
          matchDraw();
        }
      }
    }
    if (
      matchInfo?.result === "" &&
      (teamA.wickets === 2 || teamB.wickets === 2)
    ) {
      if (teamB.wickets === 2 && teamA.score > teamB.score) {
        winTeamA();
      } else if (teamA.wickets === 2 && teamA.score < teamB.score) {
        winTeamB();
      } else if (teamA.wickets === 2 && teamA.score > teamB.score) {
        if (teamB.balls === 0) winTeamA();
      } else if (teamB.wickets === 2 && teamA.score < teamB.score) {
        if (teamA.balls === 0) winTeamB();
      }
    }
  }, [teamA, teamB]);

  useEffect(() => {
    if (matchInfo && matchInfo.teamA) {
      setTeamA({
        ...teamA,
        name: matchInfo.teamA.name,
        icon: matchInfo.teamA.icon,
        score: matchInfo.teamA.score,
        wickets: matchInfo.teamA.wickets,
        players: matchInfo.teamA.players,
        eachBallScore: matchInfo?.teamA?.eachBallScore || [
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        balls: matchInfo.result !== "" ? matchInfo.teamA.balls : 6,
        currScore: 0,
        chance: true,
      });
    }
    if (matchInfo && matchInfo.teamB) {
      setTeamB({
        ...teamB,
        name: matchInfo.teamB.name,
        icon: matchInfo.teamB.icon,
        score: matchInfo.teamB.score,
        wickets: matchInfo.teamB.wickets,
        players: matchInfo.teamB.players,
        eachBallScore: matchInfo?.teamB?.eachBallScore || [
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        balls: matchInfo.result !== "" ? matchInfo.teamB.balls : 6,
        currScore: 0,
        chance: false,
      });
    }
  }, [matchInfo]);

  return (
    <div className="relative flex justify-center items-center w-[350px] sm:w-[600px] h-[420px] sm:h-[600px] bg-gradient-to-br from-green-500 via-green-300 to-green-600 rounded-[140px] sm:rounded-full shadow-2xl animate-fade-in">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30px]  sm:w-[70px] h-[35%] sm:h-[40%] bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-md sm:rounded-xl shadow-lg z-0"></div>
      <div className="absolute left-[calc(50%_-_16px)] top-6 sm:top-8 font-semibold border border-gray-800 rounded-full p-1 h-8 w-8 flex items-center justify-center text-gray-700">
        {matchInfo.matchNo}
      </div>
      <div className="relative z-10 flex sm:w-full h-full items-center justify-between px-0 sm:px-8">
        <div className="w-full flex justify-center items-center">
          <TeamCard
            batsmanRef={batsmanRef1}
            team={teamA}
            teamAName={teamA.name}
            teamBName={teamB.name}
            bowler={teamB.players.filter((player) => player.type === "bowler")}
            result={matchInfo?.result}
            handleHit={handleClick}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <TeamCard
            batsmanRef={batsmanRef2}
            team={teamB}
            teamAName={teamA.name}
            teamBName={teamB.name}
            bowler={teamA.players.filter((player) => player.type === "bowler")}
            result={matchInfo?.result}
            handleHit={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayMatch;
