import { useEffect, useState } from "react";
import PlayMatch from "../components/match";

const Match = ({ match, matches, openMatch, currMatch }) => {
  return (
    <div
      onClick={() => openMatch(match.matchNo)}
      className={`border border-gray-300 rounded-2xl p-6 mb-6 cursor-pointer bg-white shadow-lg hover:bg-gray-100 transition-all duration-200 animate-fade-in ${match.matchNo === currMatch?.matchNo ? 'ring-2 ring-gray-400' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-800">
          Match {match.matchNo} of {matches.length}
        </div>
        {match.matchNo === currMatch?.matchNo && <div className="font-bold text-green-600">Live</div>}
      </div>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-gray-800 rounded-md"></div>
          <div className="text-gray-800 font-semibold">{match.teamA.name}</div>
        </div>
        <div className="text-gray-700 font-medium">
          {match.teamA.score}/{match.teamA.wickets} ({match.teamA.balls})
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-gray-500 rounded-md"></div>
          <div className="text-gray-800 font-semibold">{match.teamB.name}</div>
        </div>
        <div className="text-gray-700 font-medium">
          {match.teamB.score}/{match.teamB.wickets} ({match.teamB.balls})
        </div>
      </div>
      {match?.result !== "" && (
        <div className="font-semibold text-gray-800 mt-2">{match.result}</div>
      )}
    </div>
  );
};
const Playground = () => {
  const [matches, setMatches] = useState([]);
  const [currMatch, setCurrMatch] = useState(null);

  const openMatch = (matchNo) => {
    const match = matches.find((item) => item.matchNo === matchNo);
    setCurrMatch({ ...match });
  };

  useEffect(() => {
    const matches = JSON.parse(localStorage.getItem("matches"));
    const index = matches.findIndex((item) => item.result === "");
    setMatches(matches.sort((a, b) => a.matchNo - b.matchNo));
    setCurrMatch(matches[index]);
  }, []);

  return (
    <div className="flex h-[calc(100vh_-_64px)] bg-black animate-fade-in">
      <div className="w-[30%] p-4 border-r border-black overflow-auto bg-white">
        {matches.map((match) => (
          <Match
            key={match.matchNo}
            match={match}
            matches={matches}
            openMatch={openMatch}
            currMatch={currMatch}
          />
        ))}
      </div>
      <div className="w-[70%] flex items-center justify-center bg-white">
        {currMatch && <PlayMatch matches={matches} setMatches={setMatches} matchInfo={currMatch} />}
      </div>
    </div>
  );
};
export default Playground;
