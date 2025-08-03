import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useState } from "react";
import single from "../assets/cricket-logo.webp"
import tournament from "../assets/cricket-series-logo.png"

const Mode = () => {
  const navigate = useNavigate();
  const [series, SetSeries] = useState(false);

  const navigateToInfo = (teams, type) => {
    navigate("/info", { state: { teams: teams, matchType: type } });
  };
  const selectTeams = () => {
    SetSeries(true);
  };

  return (
    <div className="min-h-[calc(100vh_-_64px)] flex items-center justify-center bg-gray-100">
      <div className="w-full  max-w-xl animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigateToInfo(2, "single")}
           className="w-60 sm:w-80 h-60 sm:h-80  mx-auto  flex flex-col items-center justify-between gap-4 text-2xl font-bold px-6 sm:px-10 py-4 sm:py-8 bg-white cursor-pointer text-gray-800 border border-gray-400 rounded-2xl shadow-lg hover:bg-gray-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            
            <img src={single} className="w-40" style={
              {mixBlendMode: 'multiply'}
            }/>
            <span className="mb-2">Match</span>
          </button>
          <button
            onClick={selectTeams}
            className="w-60 sm:w-80 h-60 sm:h-80 mx-auto flex flex-col items-center justify-between gap-4 text-2xl font-bold px-6 sm:px-10 py-4 sm:py-8 sm:pt-[50x]  bg-white cursor-pointer text-gray-800 border border-gray-400 rounded-2xl shadow-lg hover:bg-gray-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            <img src={tournament} className="w-[75%] sm:w-[85%]"/>
            <span className="mb-2">Tournament</span>
          </button>
        </div>
        {series && (
          <div className="mt-6 sm:mt-10 animate-fade-in">
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
