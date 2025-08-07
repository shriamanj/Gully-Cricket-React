import { useEffect, useState } from "react";
import PlayMatch from "../components/PlayMatch";

const Match = ({ match, matches, openMatch, currMatch }) => {
  return (
    <button
      disabled={match.teamA.name === "TBQ" || match.teamB.name === "TBQ"}
      onClick={() => openMatch(match.matchNo)}
      className={`min-w-52 sm:w:-full border border-gray-300 rounded-lg sm:rounded-2xl px-3 py-2 sm:p-6 mb-0 sm:mb-3 cursor-pointer bg-white shadow-lg hover:bg-gray-100 transition-all duration-200 animate-fade-in disabled:opacity-50 disabled:cursor-not-allowed ${
        match.matchNo === currMatch?.matchNo ? "ring-2 ring-gray-400" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-1 sm:mb-4">
        <div className="text-base sm:text-lg font-bold text-gray-800">
          Match {match.matchTypeId === "qualifier1" && "(Qualifier 1)"}
          {match.matchTypeId === "semiFinal1" && "(Semi Final)"}
          {match.matchTypeId === "semiFinal2" && "(Semi Final)"}
          {match.matchTypeId === "qualifier2" && "(Qualifier 2)"}
          {match.matchTypeId === "eleminator" && "(Eleminator)"}
          {match.matchTypeId === "final" && "(Final)"}
          {match.matchTypeId === "league" &&
            `${match.matchNo} of ${matches.length}`}
        </div>
        {match.matchNo === currMatch?.matchNo && (
          <div className="font-bold text-green-600">Live</div>
        )}
      </div>
      <div className="flex justify-between mb-1 sm:mb-2">
        <div className="flex gap-2 items-center">
          {match.teamA.icon && (
            <img
              src={match.teamA.icon}
              className="w-4 sm:w-5 h-4 sm:h-5 rounded-sm"
            ></img>
          )}
          <div className="text-sm sm:text-base text-gray-800 font-semibold">
            {match.teamA.name}
          </div>
        </div>
        <div className="text-sm sm:text-base text-gray-700 font-medium">
          {match.teamA.score}/{match.teamA.wickets} ({match.teamA.balls})
        </div>
      </div>
      <div className="flex justify-between mt-1 sm:mb-2">
        <div className="flex gap-2 items-center">
          {match.teamB.icon && (
            <img
              src={match.teamB.icon}
              className="w-4 sm:w-5 h-4 sm:h-5 rounded-sm"
            ></img>
          )}
          <div className="text-sm sm:text-base text-gray-800 font-semibold">
            {match.teamB.name}
          </div>
        </div>
        <div className="text-sm sm:text-base text-gray-700 font-medium">
          {match.teamB.score}/{match.teamB.wickets} ({match.teamB.balls})
        </div>
      </div>
      <div className="text-sm sm:text-base font-semibold text-gray-800 mt-2 h-[38px]">
        {match?.result !== "" && match.result}
      </div>
    </button>
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
    const matches = JSON.parse(localStorage.getItem("matches")) || [];
    const index = matches.findIndex((item) => item.result === "");
    setMatches(matches.sort((a, b) => a.matchNo - b.matchNo));
    setCurrMatch({ ...matches[index] });
  }, []);

  return (
    <div className="flex flex-col sm:flex-row h-[calc(100vh_-_64px)] bg-white animate-fade-in">
      <div className="flex sm:flex-col gap-3 overflow-x-scroll sm:overflow-x-auto w-auto sm:w-[30%] h-[165px] sm:h-auto p-4 sm:p-5 border-r border-black overflow-auto bg-white">
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
      <div className="w-full sm:w-[70%] flex justify-center bg-white pt-2 sm:pt-10">
        {currMatch && (
          <PlayMatch
            matches={matches}
            setMatches={setMatches}
            matchInfo={currMatch}
            setCurrMatch={setCurrMatch}
          />
        )}
      </div>
    </div>
  );
};
export default Playground;
