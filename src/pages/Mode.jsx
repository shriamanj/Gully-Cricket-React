import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useState } from "react";
import single from "../assets/images/logo/match-logo.jpg";
import tournament from "../assets/images/logo/tournament-logo.png";
import worldCup from "../assets/images/logo/world-cup-logo.jpg";
import ipl from "../assets/images/logo/ipl-logo.jpg";

const GameType = ({ onClick, image, title }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-60 sm:h-80  mx-auto  flex flex-col items-center justify-between gap-4 text-2xl font-bold px-6 sm:px-10 py-4 sm:py-8 bg-white cursor-pointer text-gray-800 border border-gray-400 rounded-2xl shadow-lg hover:bg-gray-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
    >
      {image && (
        <img
          src={image}
          className="w-40"
          style={{ mixBlendMode: "multiply" }}
        />
      )}
      <span className="mb-2">{title}</span>
    </button>
  );
};

const Mode = () => {
  const navigate = useNavigate();
  const [series, SetSeries] = useState(false);

  const navigateToInfo = (teams, type) => {
    localStorage.setItem("matchType", type);
    navigate("/info", { state: { teams: teams, matchType: type } });
  };
  const selectTeams = () => {
    SetSeries(true);
  };

  return (
    <div className="min-h-[calc(100vh_-_64px)]  h-[calc(100%_-_64px)] overflow-auto flex md:items-center md:justify-center bg-gray-100">
      <div className="w-full animate-fade-in">
        <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GameType
            title="Match"
            image={single}
            onClick={() => navigateToInfo(2, "single")}
          />
          <GameType
            title="IPL"
            image={ipl}
            onClick={() => navigateToInfo(10, "ipl")}
          />
          <GameType
            title="World Cup"
            image={worldCup}
            onClick={() => navigateToInfo(12, "world-cup")}
          />
          <GameType
            title="Tournament"
            image={tournament}
            onClick={() => selectTeams()}
          />
        </div>
        {series && (
          <div className="mb-6 sm:mb-10 animate-fade-in">
            <p className="text-center text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
              Select number of teams to play in series
            </p>
            <div className="flex justify-center gap-2 sm:gap-4 px-4">
              {[2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  label={num.toString()}
                  onClick={() => navigateToInfo(num, "series")}
                  className="bg-gray-800 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Mode;
