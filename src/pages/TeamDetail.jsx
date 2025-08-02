import { useLocation, useNavigate } from "react-router";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { calculateMatches } from "../utils/utils";
import { v4 } from "uuid";
import RadioButton from "../components/RadioButton";
import { teamDetail } from "../constants";

const Team = ({ index, teamInfo, teamsInfo, setTeamsInfo }) => {
  const handleTeamName = (event) => {
    const val = event.target.value;
    teamsInfo[index].teamName = val;
    setTeamsInfo([...teamsInfo]);
  };

  const handlePlayerName = (event, ind) => {
    const val = event.target.value;
    teamsInfo[index].players[ind].name = val;
    setTeamsInfo([...teamsInfo]);
  };

  const handlePlayerType = (event, ind) => {
    const val = event.target.value;
    teamsInfo[index].players[ind].type = val;
    setTeamsInfo([...teamsInfo]);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 shadow-md mb-8 px-4 py-6 border border-gray-300 bg-white rounded-xl animate-fade-in">
      <Input
        type="text"
        id="teamName"
        label="Team Name"
        value={teamInfo.teamName}
        onChange={handleTeamName}
        placeholder={"Enter team name"}
      />
      {teamInfo.players.map((player, ind) => (
        <div key={ind} className="space-y-2">
          <Input
            type="text"
            id={`${teamInfo.teamId}-${ind}`}
            label={`Player ${ind + 1}`}
            value={player.name}
            onChange={(e) => handlePlayerName(e, ind)}
            placeholder={"Enter player name"}
          />
          <RadioButton
            index={ind}
            teamInfo={teamInfo}
            onChange={(e) => handlePlayerType(e, ind)}
            className="mt-1"
          />
        </div>
      ))}
    </div>
  );
};

const TeamsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [matches, setMatches] = useState(1);
  const [isTeamCreated, setIsTeamCreated] = useState(false);
  const [teamsInfo, setTeamsInfo] = useState([]);

  const createMatches = () => {
    let matchlist = [];
    if (location?.state?.teams === 2) {
      for (let i = 1; i <= matches; i++) {
        matchlist.push({
          matchNo: i,
          teamA: {
            name: teamsInfo[0].teamName,
            balls: 0,
            wickets: 0,
            score: 0,
            players: teamsInfo[0].players,
          },
          teamB: {
            name: teamsInfo[1].teamName,
            balls: 0,
            wickets: 0,
            score: 0,
            players: teamsInfo[1].players,
          },
          result: "",
        });
      }
    } else {
      matchlist = calculateMatches(teamsInfo);
    }
    localStorage.setItem("matches", JSON.stringify(matchlist));
  };

  const createPointsTable = () => {
    const pointsTable = [];
    teamsInfo.forEach((team) => {
      pointsTable.push({
        teamName: team.teamName,
        matches: 0,
        wins: 0,
        loss: 0,
        points: 0,
      });
    });
    localStorage.setItem("pointsTable", JSON.stringify(pointsTable));
  };

  const createTeams = () => {
    localStorage.setItem("teamsInfo", JSON.stringify(teamsInfo));
    setIsTeamCreated(true);
  };

  useEffect(() => {
    if (isTeamCreated) {
      createMatches();
      createPointsTable();
      navigate("/playground");
    }
  }, [isTeamCreated]);

  useEffect(() => {
    const teams = [];
    if (location?.state?.teams) {
      for (let i = 0; i < location.state.teams; i++) {
        teams.push(structuredClone({ ...teamDetail, teamId: v4() }));
        setTeamsInfo([...teams]);
      }
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full p-8">
        <div className="flex justify-between items-center border-b-2 mb-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Team Details
          </h2>
          {location?.state?.teams === 2 && (
            <Input
              min={1}
              max={5}
              id="matches"
              type="number"
              value={matches}
              disabled={location?.state?.matchType === "single"}
              onChange={(event) => setMatches(parseInt(event.target.value))}
              placeholder="No. of Matches Eg. 5"
            />
          )}
        </div>
        {teamsInfo.map((team, index) => {
          return (
            <Team
              key={index}
              index={index}
              teamInfo={team}
              teamsInfo={teamsInfo}
              setTeamsInfo={setTeamsInfo}
            />
          );
        })}

        <div className="flex justify-center mt-10">
          <button
            onClick={() => createTeams()}
            className="bg-gray-800 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            Save Teams
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamsDetail;
