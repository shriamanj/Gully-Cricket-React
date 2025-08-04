import { useEffect, useRef, useState } from "react";
import PlayerCard from "./PlayerCard";

function PlayMatch({ matchInfo, matches, setMatches, setCurrMatch }) {
  const batsmanRef1 = useRef();
  const batsmanRef2 = useRef();

  const [teamA, setTeamA] = useState({
    id: 1,
    name: "",
    balls: 6,
    score: 0,
    wickets: 0,
    currScore: 0,
    chance: true,
    winner: false,
    players: [],
  });
  const [teamB, setTeamB] = useState({
    id: 2,
    name: "",
    balls: 6,
    score: 0,
    wickets: 0,
    currScore: 0,
    chance: false,
    winner: false,
    players: [],
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
    if (player.currScore === 7) {
      player.wickets += 1;
      player.currScore = "Wicket";
      player.balls = Math.max(player.balls - 1, 0);
      player.chance = !player.chance;
      team.players[bowlerInx].wickets += 1;
      team.players[bowlerInx].balls += 1;
      player.players[batsmanInx].balls += 1;
    } else if (player.currScore === 5) {
      team.players[bowlerInx].runs += 1;
      player.currScore = "Wide";
      player.score += 1;
    } else {
      player.score += player.currScore;
      player.balls = Math.max(player.balls - 1, 0);
      player.chance = !player.chance;
      team.players[bowlerInx].balls += 1;
      team.players[bowlerInx].runs += player.currScore;
      player.players[batsmanInx].balls += 1;
      player.players[batsmanInx].runs += player.currScore;
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
      };
      matches[matchInd].teamB = {
        ...matches[matchInd].teamB,
        score: teamB.score,
        wickets: teamB.wickets,
        balls: 6 - teamB.balls,
        players: teamB.players,
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
    matchInfo.result = result;
    setCurrMatch({ ...matchInfo });
    localStorage.setItem("matches", JSON.stringify(matches));
  };

  const updateTeamsInfo = (winTeam, lossTeam, status) => {
    const playerData = JSON.parse(localStorage.getItem("teamsInfo"));
    const winInx = playerData.findIndex((item) => {
      return item.teamName === winTeam.name;
    });
    const lossInx = playerData.findIndex((item) => {
      return item.teamName === lossTeam.name;
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
      const plInd = lossTeam.players.findIndex((item) => item.id === player.id);
      playerData[lossInx].players[index] = {
        ...player,
        runs: player.runs + lossTeam.players[plInd].runs,
        balls: player.balls + lossTeam.players[plInd].balls,
        wickets: player.wickets + lossTeam.players[plInd].wickets,
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
    alert("Match Draw");
    updateTeamsInfo(teamA, teamB, "draw");
  };

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
        score: matchInfo.teamA.score,
        wickets: matchInfo.teamA.wickets,
        players: matchInfo.teamA.players,
        balls: 6,
        currScore: 0,
        chance: true,
      });
    }
    if (matchInfo && matchInfo.teamB) {
      setTeamB({
        ...teamB,
        name: matchInfo.teamB.name,
        score: matchInfo.teamB.score,
        wickets: matchInfo.teamB.wickets,
        players: matchInfo.teamB.players,
        balls: 6,
        currScore: 0,
        chance: false,
      });
    }
  }, [matchInfo]);

  return (
    <div className="relative flex justify-center items-center w-[340px] sm:w-[600px] h-[420px] sm:h-[600px] bg-gradient-to-br from-green-500 via-green-300 to-green-600 rounded-[140px] sm:rounded-full shadow-2xl animate-fade-in">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40px]  sm:w-[70px] h-[35%] sm:h-[40%] bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-md sm:rounded-xl shadow-lg z-0"></div>
      <div className="relative z-10 flex sm:w-full h-full items-center justify-between px-0 sm:px-8">
        <div className="w-full flex justify-center items-center">
          <PlayerCard
            batsmanRef={batsmanRef1}
            player={teamA}
            bowler={teamB.players.filter((player) => player.type === "bowler")}
            result={matchInfo?.result}
            handleHit={handleClick}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <PlayerCard
            batsmanRef={batsmanRef2}
            player={teamB}
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
