import BallIcon from "../assets/icons/BallIcon";
import BatIcon from "../assets/icons/BatIcon";

const TeamCard = ({
  batsmanRef,
  team,
  bowler,
  result,
  handleHit,
  teamAName,
  teamBName,
}) => {
  let batsman = team.players.filter((team) => team.type === "batsman");

  return (
    <div className="relative w-[170px] sm:w-64 h-96 sm:p-8 flex flex-col items-center justify-center bg-transparent -mt-10">
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center gap-4 mb-1 sm:mb-4">
          <h1
            className={`flex flex-col items-center gap-2 font-semibold text-xl sm:text-[26px] text-gray-900`}
          >
            {team.icon && (
              <img
                src={team.icon}
                className="w-6 sm:w-8 h-6 sm:h-8 rounded-sm"
              ></img>
            )}
            {team.name}
          </h1>
        </div>
        <p className="text-xl sm:text-[30px] font-bold text-gray-900">
          {team.score}/{team.wickets}
          <span className=" ml-1 text-sm sm:text-base font-semibold">
            ({result !== "" ? team.balls : 6 - team.balls} balls)
          </span>
        </p>
        <div
          className={`flex gap-0.5 mt-2 justify-center items-center ${
            teamAName === team.name ? "mr-2" : "ml-2"
          }`}
        >
          {team.eachBallScore.map((ball, index) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center text-[10px] sm:text-sm px-1 py-0.5 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-gray-200"
              >
                {ball}
              </div>
            );
          })}
        </div>
      </div>
      {result === "" ? (
        <>
          <div className="flex flex-col items-center text-gray-900 mt-6">
            <p
              ref={batsmanRef}
              id={batsman[team.wickets]?.id}
              className={`flex justify-between text-[13px] sm:text-base w-[140px] sm:w-[192px] pl-1  font-semibold mt-1 ${
                teamAName === team.name ? "mr-2" : "ml-2"
              }`}
            >
              <span className="flex gap-1">
                <BatIcon /> {batsman[team.wickets]?.name}
              </span>
              <span>
                {batsman[team.wickets]?.runs} ({batsman[team.wickets]?.balls})
              </span>
            </p>
            <p
              id={"bowler"}
              className={`flex justify-between text-[13px] sm:text-base w-[140px] sm:w-[192px] pl-1  font-semibold mt-1 ${
                teamAName === team.name ? "mr-2" : "ml-2"
              }`}
            >
              <span className="flex gap-1 items-center ">
                <BallIcon /> {bowler[0]?.name}
              </span>
              <span>
                {bowler[0]?.wickets}-{bowler[0]?.runs} ({bowler[0]?.balls})
              </span>
            </p>
          </div>
          <div className="mt-6 sm:mt-10 flex justify-center">
            <p className="font-bold px-2 text-2xl sm:text-4xl text-center text-gray-900">
              {team.currScore == 0 && team.balls === 6 ? "--" : team.currScore}
            </p>
          </div>
          <div className="mt-6 sm:mt-10 h-10 flex justify-center">
            {team.balls > 0 && (
              <button
                disabled={!team.chance}
                className="bg-green-600 text-white font-bold rounded px-6 sm:px-10 py-1 sm:py-1.5 text-base sm:text-xl cursor-pointer disabled:opacity-50 disabled:bg-gray-400 shadow-lg"
                onClick={() => handleHit(team)}
              >
                HIT
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center text-gray-700 mt-6">
            <div className="flex flex-col">
              {batsman.map((bts, index) => (
                <p
                  key={index}
                  className={`flex justify-between text-[13px] sm:text-base w-[140px] sm:w-[192px] pl-1  font-semibold mt-1 ${
                    teamAName === team.name ? "mr-2" : "ml-2"
                  }`}
                >
                  <span className="flex gap-1">
                    <BatIcon /> {bts.name}
                  </span>
                  <span>
                    {bts.runs} ({bts.balls})
                  </span>
                </p>
              ))}
            </div>
            {bowler.map((bts, index) => (
              <p
                key={index}
                className={`flex justify-between text-[13px] sm:text-base w-[140px] sm:w-[192px] pl-1  font-semibold mt-1 ${
                  teamAName === team.name ? "mr-2" : "ml-2"
                }`}
              >
                <span className="flex gap-1 items-center ">
                  <BallIcon />
                  {bts.name}
                </span>
                <span>
                  {bowler[0]?.wickets}-{bowler[0]?.runs} ({bowler[0]?.balls})
                </span>
              </p>
            ))}
          </div>
          {result?.split(" ")[0] === team.name && (
            <div
              className={`absolute bottom-3 sm:bottom-0 text-xl font-bold mt-6 text-center  text-[#eeeeee] ${
                team.id === 1 ? "w-full left-[50%]" : "-left-1/2 sm:-left-[40%]"
              }`}
            >
              {result?.split(" ")[0] === team.name && result}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeamCard;
