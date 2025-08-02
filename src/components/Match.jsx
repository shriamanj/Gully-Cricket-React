import { useEffect, useRef, useState } from "react";
import PlayerCard from "./PlayerCard";

function PlayMatch({ matchInfo, matches, setMatches }) {
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

    const team = player.name === teamA.name ? teamB : teamA
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
    } else if (player.currScore === 5) {
      player.currScore = "Wide";
      player.score += 1;
    } else {
      player.score += player.currScore;
      player.balls = Math.max(player.balls - 1, 0);
      player.chance = !player.chance;
      team.players[bowlerInx].balls += 1;
      player.players[batsmanInx].balls += 1;
      player.players[batsmanInx].runs += player.currScore;
    }

    if (player.name === teamA.name) {
      setTeamA({ ...player });
      setTeamB({
        ...teamB,
        chance: player.currScore === "Wide" ? false : true,
      });
    } else {
      setTeamB({ ...player });
      setTeamA({
        ...teamA,
        chance: player.currScore === "Wide" ? false : true,
      });
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

  const updatePointsTable = (winTeam, lossTeam, status) => {
    const pointsTable = JSON.parse(localStorage.getItem("pointsTable"));
    const winIdx = pointsTable.findIndex((item) => item.teamName === winTeam);
    const lossIdx = pointsTable.findIndex((item) => item.teamName === lossTeam);
    if (status === "draw") {
      pointsTable[winIdx].matches += 1;
      pointsTable[winIdx].points += 1;
      pointsTable[lossIdx].matches += 1;
      pointsTable[lossIdx].points += 1;
    } else {
      pointsTable[winIdx].matches += 1;
      pointsTable[winIdx].wins += 1;
      pointsTable[winIdx].points += 2;
      pointsTable[lossIdx].matches += 1;
      pointsTable[lossIdx].loss += 1;
    }
    localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
  };

  const updateMatches = (result) => {
    const matchInd = matches.findIndex(
      (item) => item.matchNo === matchInfo?.matchNo
    );
    matches[matchInd].result = result;
    setMatches([...matches]);
    localStorage.setItem("matches", JSON.stringify(matches));
  };

  const winTeamA = () => {
    const result = `${teamA.name} won by ${teamA.score - teamB.score} runs`;
    updateMatches(result);
    updatePointsTable(teamA.name, teamB.name, "win");
  };

  const winTeamB = () => {
    const result = `${teamB.name} won by ${teamB.score - teamA.score} runs`;
    updateMatches(result);
    updatePointsTable(teamB.name, teamA.name, "win");
  };

  const matchDraw = () => {
    const result = "Match Draw";
    updateMatches(result);
    updatePointsTable(teamA.name, teamB.name, "draw");
    alert("Match Draw");
  };

  useEffect(() => {
    if (teamA.balls === 0 && teamB.balls === 0) {
      if (teamA.score > teamB.score) {
        winTeamA();
      } else if (teamA.score < teamB.score) {
        winTeamB();
      } else {
        if (teamA.score > 0 && teamB.score > 0) matchDraw();
      }
    }
    if (teamA.wickets === 2 || teamB.wickets === 2) {
      if (teamB.wickets === 2 && teamA.score > teamB.score) {
        winTeamA();
      } else if (teamA.wickets === 2 && teamB.score > teamA.score) {
        winTeamB();
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
      });
    }
    if (matchInfo && matchInfo.teamB) {
      setTeamB({
        ...teamB,
        name: matchInfo.teamB.name,
        score: matchInfo.teamB.score,
        wickets: matchInfo.teamB.wickets,
        players: matchInfo.teamB.players,
      });
    }
  }, [matchInfo]);

  return (
    <div className="relative flex items-center justify-center w-[600px] h-[600px] bg-gradient-to-br from-green-500 via-green-300 to-green-600 rounded-full shadow-2xl animate-fade-in">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70px] h-[40%] bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-xl shadow-lg z-0"></div>
      <div className="relative z-10 flex w-full h-full items-center justify-between px-8">
        <div className="w-full flex justify-end">
          <PlayerCard
            batsmanRef={batsmanRef1}
            player={teamA}
            bowler={teamB.players.filter((player) => player.type === "bowler")}
            result={matchInfo?.result}
            handleHit={handleClick}
          />
        </div>
        <div className="w-full flex justify-start">
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
